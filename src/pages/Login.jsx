import { Link } from "react-router-dom";
import "./Auth.scss";

const Login = () => {
  return (
    <div className="auth-page">
      <div className="auth-left" aria-hidden="true"></div>
      <div className="auth-right">
        <div className="auth-card">
          <h1 className="auth-title">Đăng nhập</h1>
          <p className="auth-sub">
            Nếu bạn chưa có tài khoản, <Link to="/register">đăng ký ngay</Link>
          </p>

          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <label className="auth-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="auth-input"
              placeholder="you@example.com"
              required
            />

            <label className="auth-label" htmlFor="password">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              className="auth-input"
              placeholder="••••••••"
              required
            />

            <div className="auth-captcha">
              <span className="captcha-badge">Thành công!</span>
              <span className="captcha-brand">Cloudflare Turnstile</span>
            </div>

            <button className="auth-submit" type="submit">
              Đăng nhập
            </button>
          </form>

          <button className="auth-google" onClick={(e) => e.preventDefault()}>
            <span className="g-icon">
              {" "}
              <img src="/icons/google.png" alt="Google" />
            </span>
            Đăng nhập bằng Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
