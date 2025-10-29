import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.scss";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            <div className="auth-input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="auth-input"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="auth-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <label className="auth-label" htmlFor="confirm">
              Nhập lại mật khẩu
            </label>
            <div className="auth-input-wrapper">
              <input
                id="confirm"
                type={showConfirmPassword ? "text" : "password"}
                className="auth-input"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="auth-toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={
                  showConfirmPassword ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"
                }
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

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
