import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { authApi } from "../../services/api";
import { showError, showSuccess } from "../../utils/notification";
import "./Auth.scss";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setIsError(true);
      setErrorMessage("Token xác thực không hợp lệ");
      return;
    }

    verifyEmail(token);
  }, []);

  const verifyEmail = async (token) => {
    setIsVerifying(true);
    console.log("🔍 Verifying email with token:", token);

    try {
      const result = await authApi.verifyEmail(token);
      console.log("✅ Verify email success:", result);

      setIsSuccess(true);
      showSuccess("Xác thực email thành công!");

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("❌ Verify email error:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response,
        responseData: error.response?.data,
      });
      setIsError(true);
      // Lấy message từ error.response.data hoặc error
      const errorMsg =
        error.response?.data?.message || error.message || "Network Error";
      setErrorMessage(errorMsg);
      showError(errorMsg);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left" aria-hidden="true"></div>
      <div className="auth-right">
        <div className="auth-card">
          {isVerifying && (
            <>
              <h1 className="auth-title">Đang xác thực...</h1>
              <p className="auth-sub">Vui lòng đợi trong giây lát</p>
              <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <div className="loading-spinner"></div>
              </div>
            </>
          )}

          {isSuccess && (
            <>
              <h1 className="auth-title">✅ Xác thực thành công!</h1>
              <p className="auth-sub">
                Email của bạn đã được xác thực thành công. Bạn có thể đăng nhập
                ngay bây giờ.
              </p>
              <p className="auth-sub" style={{ marginTop: "1rem" }}>
                Đang chuyển hướng đến trang đăng nhập...
              </p>
              <Link
                to="/login"
                className="auth-submit"
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: "1.5rem",
                }}
              >
                Đăng nhập ngay
              </Link>
            </>
          )}

          {isError && (
            <>
              <h1 className="auth-title">❌ Xác thực thất bại</h1>
              <p className="auth-sub">{errorMessage}</p>
              <div style={{ marginTop: "2rem" }}>
                <Link
                  to="/register"
                  className="auth-submit"
                  style={{
                    display: "block",
                    textAlign: "center",
                    marginTop: "1rem",
                  }}
                >
                  Đăng ký lại
                </Link>
                <Link
                  to="/login"
                  className="auth-google"
                  style={{
                    display: "block",
                    textAlign: "center",
                    marginTop: "1rem",
                  }}
                >
                  Về trang đăng nhập
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
