package com.example.thangcachep.movie_project_be.filters;

import com.example.thangcachep.movie_project_be.services.impl.CustomUserDetailsService;
import com.example.thangcachep.movie_project_be.services.impl.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Value("${api.prefix}")
    private String apiPrefix;

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;
    
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        final String uri = request.getRequestURI();       // robust hơn servletPath
        final String method = request.getMethod();

        try {
            // 1) Bỏ qua các path public / preflight / error
            if (isBypass(uri, method)) {
                filterChain.doFilter(request, response);
                return;
            }
        
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        
        jwt = authHeader.substring(7);
        userEmail = jwtService.extractUsername(jwt);
        
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
            
            if (jwtService.validateToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
                );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        
        filterChain.doFilter(request, response);
        } catch (Exception ex) {
            // Đừng gửi 401 cho mọi lỗi bắt được; dọn context và cho chain xử lý /error
            SecurityContextHolder.clearContext();
            filterChain.doFilter(request, response);
        }

    }

    private boolean isBypass(String uri, String method) {
        String base = ensureLeadingSlash(apiPrefix); // đảm bảo bắt đầu bằng '/'

        // Public endpoints
        if ("POST".equals(method) && uri.startsWith(base + "/users/register")) return true;
        if ("POST".equals(method) && uri.startsWith(base + "/users/login"))    return true;
//        if ("GET".equals(method)  && uri.startsWith(base + "/rooms") )         return true;
//        if ("POST".equals(method)  && uri.startsWith(base + "/rooms") )         return true;  // role staff, admin phai k dc pass de lay token xac thuc dc role
        if ("GET".equals(method)  && uri.startsWith("/uploads"))               return true; // ảnh public
        // Health, docs… (tuỳ bạn bật)
        if ("GET".equals(method) && uri.startsWith(base + "/healthcheck")) return true;
        if ("GET".equals(method) && uri.startsWith(base + "/test")) return true;
        //vo danh la qua dc anonymous
        // CORS preflight & error forward
        if ("OPTIONS".equals(method)) return true;
        if ("/error".equals(uri))     return true;

        return false;
    }

    private String ensureLeadingSlash(String p) {
        if (p == null || p.isEmpty()) return "";
        return p.startsWith("/") ? p : ("/" + p);
    }
}


