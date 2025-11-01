import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../services/api";
import {
  getGoogleOAuthCode,
  isGoogleOAuthConfigured,
} from "../../utils/googleOAuth";
import { handleApiError, showSuccess } from "../../utils/notification";
import "./Auth.scss";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("processing"); // processing, success, error
  const [message, setMessage] = useState("Đang xử lý...");
  const [isProcessing, setIsProcessing] = useState(false); // Tránh duplicate request

  useEffect(() => {
    handleGoogleCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoogleCallback = async () => {
    // Tránh duplicate request
    if (isProcessing) {
      console.log("⚠️ Request đang được xử lý, bỏ qua...");
      return;
    }

    // Kiểm tra xem đã có token chưa (đã login rồi)
    const existingToken = localStorage.getItem("token");
    if (existingToken) {
      console.log("✅ Đã có token, redirect về home");
      window.location.href = "/";
      return;
    }

    setIsProcessing(true);

    try {
      // Kiểm tra Google OAuth đã được config chưa
      if (!isGoogleOAuthConfigured()) {
        setStatus("error");
        setMessage("Google OAuth chưa được cấu hình. Vui lòng liên hệ admin.");
        return;
      }

      // Lấy code và state từ URL
      const { code, error, errorDescription, state } = getGoogleOAuthCode();

      // Kiểm tra có lỗi từ Google không
      if (error) {
        setStatus("error");
        setMessage(
          errorDescription || error || "Đăng nhập bằng Google thất bại."
        );
        setTimeout(() => {
          navigate(state === "register" ? "/register" : "/login");
        }, 3000);
        return;
      }

      // Kiểm tra có code không
      if (!code) {
        setStatus("error");
        setMessage("Không nhận được authorization code từ Google.");
        setTimeout(() => {
          navigate(state === "register" ? "/register" : "/login");
        }, 3000);
        return;
      }

      // Gửi code lên backend để exchange lấy token (CHỈ 1 LẦN)
      setMessage("Đang xác thực với Google...");
      const response = await authApi.googleLogin(code);

      // Lưu token và user info
      if (response && response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));

        setStatus("success");
        setMessage(
          state === "register"
            ? "Đăng ký bằng Google thành công!"
            : "Đăng nhập bằng Google thành công!"
        );

        showSuccess(
          state === "register" ? "Đăng ký thành công" : "Đăng nhập thành công",
          "Chào mừng bạn đến với Movie Project!"
        );

        // Redirect về home sau 1.5 giây
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        throw new Error("Không nhận được token từ server");
      }
    } catch (error) {
      console.error("❌ Google OAuth error:", error);

      // Kiểm tra xem đã có token chưa (trường hợp lỗi nhưng vẫn login được)
      const existingToken = localStorage.getItem("token");
      if (existingToken) {
        // Đã có token → login thành công, chỉ log error thôi, không show notification
        console.warn(
          "⚠️ Có lỗi trong quá trình xử lý nhưng đã login thành công"
        );
        window.location.href = "/";
        return;
      }

      setStatus("error");
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Đăng nhập bằng Google thất bại. Vui lòng thử lại.";
      setMessage(errorMessage);

      // Chỉ show error nếu chưa có token
      handleApiError(error, "Google OAuth thất bại");

      // Redirect về login/register sau 3 giây
      setTimeout(() => {
        const { state } = getGoogleOAuthCode();
        navigate(state === "register" ? "/register" : "/login");
      }, 3000);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left" aria-hidden="true"></div>
      <div className="auth-right">
        <div className="auth-card">
          {status === "processing" && (
            <>
              <h1 className="auth-title">Đang xử lý...</h1>
              <p className="auth-sub">{message}</p>
              <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <div className="loading-spinner"></div>
              </div>
            </>
          )}

          {status === "success" && (
            <>
              <h1 className="auth-title">✅ Thành công!</h1>
              <p className="auth-sub">{message}</p>
              <p className="auth-sub" style={{ marginTop: "1rem" }}>
                Đang chuyển hướng...
              </p>
            </>
          )}

          {status === "error" && (
            <>
              <h1 className="auth-title">❌ Có lỗi xảy ra</h1>
              <p className="auth-sub">{message}</p>
              <div style={{ marginTop: "2rem" }}>
                <button
                  className="auth-submit"
                  onClick={() => {
                    const { state } = getGoogleOAuthCode();
                    navigate(state === "register" ? "/register" : "/login");
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    marginTop: "1rem",
                  }}
                >
                  Quay lại
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoogleCallback;
