import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "../../components/LoadingButton";
import { loginUserAPI } from "../../services/movieService";
import { handleApiError, showSuccess } from "../../utils/notification";
import "./Auth.scss";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
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
      email: true,
      password: true,
    });

    // Validate all fields
    const newErrors = {
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    try {
      setLoading(true);
      const response = await loginUserAPI(formData.email, formData.password);

      // Lưu token và user info
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      // Show success notification - Ưu tiên message từ backend
      const successMessage = response.data.message || "Đăng nhập thành công";
      showSuccess("Đăng nhập thành công", successMessage);

      // Redirect to home - dùng window.location để reload và update header
      window.location.href = "/";
    } catch (error) {
      // Show error notification - Ưu tiên message từ backend
      handleApiError(error, "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left" aria-hidden="true"></div>
      <div className="auth-right">
        <div className="auth-card">
          <h1 className="auth-title">Đăng nhập</h1>
          <p className="auth-sub">
            Nếu bạn chưa có tài khoản, <Link to="/register">đăng ký ngay</Link>
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
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
              disabled={loading}
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
                disabled={loading}
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

            <div className="auth-captcha">
              <span className="captcha-badge">Thành công!</span>
              <span className="captcha-brand">Cloudflare Turnstile</span>
            </div>

            <LoadingButton
              type="submit"
              loading={loading}
              variant="primary"
              fullWidth
              className="auth-submit"
            >
              Đăng nhập
            </LoadingButton>

            {/* TEST BUTTON - XÓA KHI DEPLOY */}
            <button
              type="button"
              className="auth-test-btn"
              onClick={() => {
                localStorage.setItem("token", "fake-token-123");
                localStorage.setItem(
                  "user",
                  JSON.stringify({
                    fullName: "Thắng Cá Chép",
                    email: "thangcutehuhu2808@gmail.com",
                    isPremium: true,
                    balance: 500000,
                    avatar: "", // Để rỗng → hiển thị vn.jpg mặc định
                  })
                );
                window.location.href = "/";
              }}
              style={{
                width: "100%",
                padding: "0.75rem",
                marginTop: "0.5rem",
                background: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: "600",
              }}
            >
              🚀 Test Login (Demo)
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
