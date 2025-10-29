import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "../../components/LoadingButton";
import { authApi } from "../../services/api";
import { showError, showSuccess } from "../../utils/notification";
import "./Auth.scss";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    displayName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "displayName":
        if (!value.trim()) {
          error = "Vui lòng nhập tên hiển thị";
        } else if (value.trim().length < 2) {
          error = "Tên hiển thị phải có ít nhất 2 ký tự";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Vui lòng nhập email";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Email không hợp lệ";
        }
        break;

      case "password":
        if (!value) {
          error = "Vui lòng nhập mật khẩu";
        } else if (value.length < 6) {
          error = "Mật khẩu phải có ít nhất 6 ký tự";
        }
        break;

      case "confirmPassword":
        if (!value) {
          error = "Vui lòng nhập lại mật khẩu";
        } else if (value !== formData.password) {
          error = "Mật khẩu nhập lại không khớp";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate field nếu đã touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({
        ...errors,
        [name]: error,
      });
    }

    // Nếu đang nhập confirmPassword, cũng check với password
    if (name === "password" && touched.confirmPassword) {
      const confirmError = validateField(
        "confirmPassword",
        formData.confirmPassword
      );
      setErrors({
        ...errors,
        password: validateField(name, value),
        confirmPassword: confirmError,
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched({
      ...touched,
      [name]: true,
    });

    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      displayName: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    // Validate all fields
    const newErrors = {
      displayName: validateField("displayName", formData.displayName),
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
      confirmPassword: validateField(
        "confirmPassword",
        formData.confirmPassword
      ),
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await authApi.register({
        name: formData.displayName,
        email: formData.email,
        password: formData.password,
      });

      showSuccess("Đăng ký thành công!");

      // Lưu token và user info
      if (response.token) {
        localStorage.setItem("token", response.token);
      }
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }

      // Redirect về trang chủ sau 1 giây
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Register error:", error);
      showError(error.message || "Đăng ký thất bại. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left" aria-hidden="true"></div>
      <div className="auth-right">
        <div className="auth-card">
          <h1 className="auth-title">Tạo tài khoản mới</h1>
          <p className="auth-sub">
            Nếu bạn đã có tài khoản, <Link to="/login">đăng nhập</Link>
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-label" htmlFor="displayName">
              Tên hiển thị
            </label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              className={`auth-input ${
                errors.displayName && touched.displayName ? "error" : ""
              }`}
              placeholder="Nguyễn Văn A"
              value={formData.displayName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.displayName && touched.displayName && (
              <span className="auth-error">{errors.displayName}</span>
            )}

            <label className="auth-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`auth-input ${
                errors.email && touched.email ? "error" : ""
              }`}
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <span className="auth-error">{errors.email}</span>
            )}

            <label className="auth-label" htmlFor="password">
              Mật khẩu
            </label>
            <div className="auth-input-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className={`auth-input ${
                  errors.password && touched.password ? "error" : ""
                }`}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
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
            {errors.password && touched.password && (
              <span className="auth-error">{errors.password}</span>
            )}

            <label className="auth-label" htmlFor="confirm">
              Nhập lại mật khẩu
            </label>
            <div className="auth-input-wrapper">
              <input
                id="confirm"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className={`auth-input ${
                  errors.confirmPassword && touched.confirmPassword
                    ? "error"
                    : ""
                }`}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
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
            {errors.confirmPassword && touched.confirmPassword && (
              <span className="auth-error">{errors.confirmPassword}</span>
            )}

            <div className="auth-captcha">
              <span className="captcha-badge">Thành công!</span>
              <span className="captcha-brand">Cloudflare Turnstile</span>
            </div>

            <LoadingButton
              type="submit"
              className="auth-submit"
              isLoading={isLoading}
              loadingText="Đang đăng ký..."
            >
              Đăng ký
            </LoadingButton>
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
