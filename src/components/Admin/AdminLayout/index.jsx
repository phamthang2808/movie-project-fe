import {
  BarChart3,
  Film,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  Tags,
  Users,
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { showSuccess } from "../../../utils/notification";
import "./AdminLayout.scss";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/admin", icon: Home, label: "Tổng quan", exact: true },
    { path: "/admin/movies", icon: Film, label: "Quản lý Phim" },
    { path: "/admin/users", icon: Users, label: "Quản lý Users" },
    { path: "/admin/categories", icon: Tags, label: "Thể loại" },
    { path: "/admin/comments", icon: MessageSquare, label: "Bình luận" },
    { path: "/admin/stats", icon: BarChart3, label: "Thống kê" },
    { path: "/admin/settings", icon: Settings, label: "Cài đặt" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    showSuccess("Đăng xuất thành công!");
    navigate("/");
  };

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <p>Quản lý hệ thống</p>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive(item.path, item.exact) ? "active" : ""}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

