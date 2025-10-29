import {
  BarChart3,
  Film,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { showSuccess } from "../../../utils/notification";
import "./StaffLayout.scss";

const StaffLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    {
      title: "Tổng quan",
      icon: BarChart3,
      path: "/staff",
      badge: null,
    },
    {
      title: "Quản lý phim",
      icon: Film,
      path: "/staff/movies",
      badge: null,
    },
    {
      title: "Quản lý bình luận",
      icon: MessageSquare,
      path: "/staff/comments",
      badge: "23",
    },
    {
      title: "Báo cáo",
      icon: Users,
      path: "/staff/reports",
      badge: "8",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    showSuccess("Đăng xuất thành công!");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="staff-layout">
      <aside className={`staff-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <div className="logo">
            <Settings size={24} />
            <span>Staff Panel</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
            >
              <item.icon size={20} />
              <span>{item.title}</span>
              {item.badge && <span className="badge">{item.badge}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleBackToHome} className="footer-btn">
            <Home size={20} />
            <span>Về trang chủ</span>
          </button>
          <button onClick={handleLogout} className="footer-btn logout">
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      <main className="staff-main">
        <Outlet />
      </main>
    </div>
  );
};

export default StaffLayout;

