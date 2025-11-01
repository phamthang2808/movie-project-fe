/**
 * Google OAuth Utility
 * Xử lý Google OAuth flow
 */

// Google OAuth Configuration
// NOTE: Trong production, nên lấy từ environment variables
const GOOGLE_OAUTH_CONFIG = {
    // Client ID từ Google Cloud Console
    // Bạn cần tạo OAuth credentials tại: https://console.cloud.google.com/apis/credentials
    // Điền Client ID vào file .env: VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || "",

    // Redirect URI - phải match với URI đã đăng ký trong Google Console
    redirectUri: `${window.location.origin}/auth/google/callback`,

    // Scopes để yêu cầu quyền truy cập
    scopes: ["email", "profile"],
};

/**
 * Tạo Google OAuth URL và redirect user
 * @param {string} mode - 'login' hoặc 'register'
 */
export const initiateGoogleOAuth = (mode = "login") => {
    const redirectUri = GOOGLE_OAUTH_CONFIG.redirectUri;

    const params = new URLSearchParams({
        client_id: GOOGLE_OAUTH_CONFIG.clientId,
        redirect_uri: redirectUri,
        response_type: "code",
        scope: GOOGLE_OAUTH_CONFIG.scopes.join(" "),
        access_type: "offline",
        prompt: "select_account",
        state: mode, // Lưu mode để biết là login hay register
    });

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

    // Debug: Log rõ ràng để kiểm tra
    console.log("========== GOOGLE OAUTH DEBUG ==========");
    console.log("🔍 Redirect URI (encoded):", redirectUri);
    console.log("🔍 Redirect URI (decoded):", decodeURIComponent(redirectUri));
    console.log("🔍 Full OAuth URL:", googleAuthUrl);
    console.log("🔍 Client ID:", GOOGLE_OAUTH_CONFIG.clientId);
    console.log("=========================================");

   

    // Redirect đến Google OAuth
    window.location.href = googleAuthUrl;
};

/**
 * Lấy authorization code từ URL callback
 * @returns {Object} { code: string, state: string, error: string }
 */
export const getGoogleOAuthCode = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    const error = urlParams.get("error");
    const errorDescription = urlParams.get("error_description");

    return {
        code,
        state,
        error,
        errorDescription,
    };
};

/**
 * Kiểm tra xem Google Client ID đã được config chưa
 */
export const isGoogleOAuthConfigured = () => {
    return (
        GOOGLE_OAUTH_CONFIG.clientId &&
        GOOGLE_OAUTH_CONFIG.clientId.trim() !== "" &&
        GOOGLE_OAUTH_CONFIG.clientId.includes(".apps.googleusercontent.com")
    );
};

export default {
    initiateGoogleOAuth,
    getGoogleOAuthCode,
    isGoogleOAuthConfigured,
    GOOGLE_OAUTH_CONFIG,
};