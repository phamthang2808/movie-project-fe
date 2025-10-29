import { DollarSign, Film, MessageSquare, TrendingUp, Users } from "lucide-react";
import "./Dashboard.scss";

const AdminDashboard = () => {
  // Mock data - Sẽ fetch từ API sau
  const stats = [
    {
      id: 1,
      title: "Tổng phim",
      value: "1,234",
      change: "+12%",
      trend: "up",
      icon: Film,
      color: "#ff8c00",
    },
    {
      id: 2,
      title: "Người dùng",
      value: "45,678",
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "#3b82f6",
    },
    {
      id: 3,
      title: "Doanh thu tháng",
      value: "123M VND",
      change: "+23%",
      trend: "up",
      icon: DollarSign,
      color: "#10b981",
    },
    {
      id: 4,
      title: "Bình luận",
      value: "8,923",
      change: "+15%",
      trend: "up",
      icon: MessageSquare,
      color: "#8b5cf6",
    },
  ];

  const recentMovies = [
    { id: 1, title: "Bộ phim mới 1", status: "Đang chiếu", views: "12.5K" },
    { id: 2, title: "Bộ phim mới 2", status: "Sắp chiếu", views: "8.2K" },
    { id: 3, title: "Bộ phim mới 3", status: "Đang chiếu", views: "15.3K" },
  ];

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Tổng quan</h1>
        <p>Chào mừng bạn quay trở lại!</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="stat-card">
              <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
                <Icon size={24} />
              </div>
              <div className="stat-info">
                <p className="stat-title">{stat.title}</p>
                <h3 className="stat-value">{stat.value}</h3>
                <div className="stat-change">
                  <TrendingUp size={16} />
                  <span>{stat.change} so với tháng trước</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Movies */}
      <div className="dashboard-section">
        <h2>Phim mới nhất</h2>
        <div className="movies-table">
          <table>
            <thead>
              <tr>
                <th>Tên phim</th>
                <th>Trạng thái</th>
                <th>Lượt xem</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {recentMovies.map((movie) => (
                <tr key={movie.id}>
                  <td>{movie.title}</td>
                  <td>
                    <span className={`status ${movie.status === "Đang chiếu" ? "active" : "upcoming"}`}>
                      {movie.status}
                    </span>
                  </td>
                  <td>{movie.views}</td>
                  <td>
                    <button className="btn-edit">Sửa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

