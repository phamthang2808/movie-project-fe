import { Link } from "react-router-dom";
import "./Auth.scss";

const Register = () => {
  return (
    <div className="auth-page">
      <div className="auth-left" aria-hidden="true"></div>
      <div className="auth-right">
        <div className="auth-card">
          <h1 className="auth-title">Tạo tài khoản mới</h1>
          <p className="auth-sub">
            Nếu bạn đã có tài khoản, <Link to="/login">đăng nhập</Link>
          </p>

          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <label className="auth-label" htmlFor="displayName">
              Tên hiển thị
            </label>
            <input
              id="displayName"
              type="text"
              className="auth-input"
              placeholder="Nguyễn Văn A"
              required
            />

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

            <label className="auth-label" htmlFor="confirm">
              Nhập lại mật khẩu
            </label>
            <input
              id="confirm"
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
              Đăng ký
            </button>
          </form>

          <button className="auth-google" onClick={(e) => e.preventDefault()}>
            <span className="g-icon">
              <img src="/icons/google.png" alt="Google" />
            </span>
            Đăng ký bằng Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
