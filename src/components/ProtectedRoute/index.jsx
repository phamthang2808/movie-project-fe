import { Navigate } from "react-router-dom";
import { showError } from "../../utils/notification";

/**
 * Protected Route Component
 * Bảo vệ routes theo role
 * 
 * @param {object} props
 * @param {React.Component} props.children - Component cần bảo vệ
 * @param {string[]} props.allowedRoles - Các role được phép truy cập
 * @param {string} props.redirectTo - Đường dẫn redirect nếu không có quyền (default: "/")
 */
const ProtectedRoute = ({ children, allowedRoles = [], redirectTo = "/" }) => {
  // Lấy user từ localStorage
  const userStr = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  // Kiểm tra đăng nhập
  if (!token || !userStr) {
    showError("Vui lòng đăng nhập để tiếp tục");
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userStr);

    // Kiểm tra role
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      showError("Bạn không có quyền truy cập trang này");
      return <Navigate to={redirectTo} replace />;
    }

    // Cho phép truy cập
    return children;
  } catch (error) {
    console.error("Error parsing user data:", error);
    showError("Phiên đăng nhập không hợp lệ");
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;

