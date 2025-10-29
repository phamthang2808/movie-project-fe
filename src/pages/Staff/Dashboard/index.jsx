import { Users, Film, MessageSquare, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import "./Dashboard.scss";

const StaffDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const stats = [
    {
      title: "Phim đang quản lý",
      value: "45",
      icon: Film,
      color: "#3b82f6",
      change: "+12%",
    },
    {
      title: "Bình luận chờ duyệt",
      value: "23",
      icon: MessageSquare,
      color: "#f59e0b",
      change: "+5",
    },
    {
      title: "Báo cáo từ người dùng",
      value: "8",
      icon: Users,
      color: "#ef4444",
      change: "+3",
    },
    {
      title: "Lượt xem hôm nay",
      value: "1.2K",
      icon: TrendingUp,
      color: "#10b981",
      change: "+18%",
    },
  ];

  const recentActivities = [
    { id: 1, action: "Duyệt bình luận", movie: "One Piece", time: "5 phút trước" },
    { id: 2, action: "Xóa bình luận spam", movie: "Naruto", time: "15 phút trước" },
    { id: 3, action: "Cập nhật thông tin phim", movie: "Attack on Titan", time: "1 giờ trước" },
    { id: 4, action: "Xử lý báo cáo", movie: "Demon Slayer", time: "2 giờ trước" },
  ];

  return (
    <div className="staff-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Chào mừng, {user?.fullName || "Nhân viên"}!</h1>
          <p>Đây là bảng điều khiển dành cho nhân viên</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20` }}>
              <stat.icon size={24} style={{ color: stat.color }} />
            </div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <div className="stat-value-row">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-change positive">{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="recent-activity">
        <h2>Hoạt động gần đây</h2>
        <div className="activity-list">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                <MessageSquare size={16} />
              </div>
              <div className="activity-info">
                <p className="activity-action">{activity.action}</p>
                <p className="activity-movie">Phim: {activity.movie}</p>
              </div>
              <span className="activity-time">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;

