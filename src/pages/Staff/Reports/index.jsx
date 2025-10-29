import { AlertTriangle, Check, Eye, Search, X } from "lucide-react";
import { useState } from "react";
import "./Reports.scss";

const StaffReports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("pending");

  // Mock data
  const reports = [
    {
      id: 1,
      reporter: "Nguyễn Văn A",
      movie: "One Piece Film: Red",
      reason: "Link phim bị lỗi",
      description: "Video không load được, báo lỗi 404",
      status: "pending",
      priority: "high",
      time: "10 phút trước",
    },
    {
      id: 2,
      reporter: "Trần Thị B",
      movie: "Naruto Shippuden",
      reason: "Phụ đề không khớp",
      description: "Phụ đề chạy nhanh hơn video khoảng 2 giây",
      status: "pending",
      priority: "medium",
      time: "25 phút trước",
    },
    {
      id: 3,
      reporter: "Lê Văn C",
      movie: "Attack on Titan",
      reason: "Chất lượng video kém",
      description: "Video bị mờ, độ phân giải thấp",
      status: "pending",
      priority: "low",
      time: "1 giờ trước",
    },
    {
      id: 4,
      reporter: "Phạm Thị D",
      movie: "Demon Slayer",
      reason: "Thiếu tập phim",
      description: "Tập 5 bị mất, không thể xem",
      status: "resolved",
      priority: "high",
      time: "2 giờ trước",
    },
    {
      id: 5,
      reporter: "Hoàng Văn E",
      movie: "Jujutsu Kaisen",
      reason: "Spam trong bình luận",
      description: "Có người spam link lạ trong bình luận",
      status: "pending",
      priority: "high",
      time: "3 giờ trước",
    },
  ];

  const filteredReports = reports.filter((report) => {
    const matchSearch =
      report.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.movie.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === "all" || report.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const pendingCount = reports.filter((r) => r.status === "pending").length;

  const getPriorityColor = (priority) => {
    const colors = {
      high: "priority-high",
      medium: "priority-medium",
      low: "priority-low",
    };
    return colors[priority] || "priority-medium";
  };

  const getPriorityText = (priority) => {
    const texts = {
      high: "Cao",
      medium: "Trung bình",
      low: "Thấp",
    };
    return texts[priority] || "Trung bình";
  };

  return (
    <div className="staff-reports">
      <div className="page-header">
        <div>
          <h1>Báo cáo từ người dùng</h1>
          <p>
            {pendingCount} báo cáo chưa xử lý • {reports.length} tổng cộng
          </p>
        </div>
      </div>

      <div className="filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm báo cáo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="all">Tất cả</option>
          <option value="pending">Chưa xử lý ({pendingCount})</option>
          <option value="resolved">Đã xử lý</option>
          <option value="rejected">Đã từ chối</option>
        </select>
      </div>

      <div className="reports-list">
        {filteredReports.map((report) => (
          <div key={report.id} className={`report-card ${report.status}`}>
            <div className="report-priority">
              <span className={`priority-badge ${getPriorityColor(report.priority)}`}>
                <AlertTriangle size={14} />
                {getPriorityText(report.priority)}
              </span>
            </div>

            <div className="report-header">
              <div className="report-info">
                <h3>{report.reason}</h3>
                <p className="movie-name">Phim: {report.movie}</p>
              </div>
              <span className="time">{report.time}</span>
            </div>

            <div className="report-content">
              <p>
                <strong>Người báo cáo:</strong> {report.reporter}
              </p>
              <p>
                <strong>Mô tả chi tiết:</strong> {report.description}
              </p>
            </div>

            <div className="report-actions">
              {report.status === "pending" && (
                <>
                  <button className="btn-view">
                    <Eye size={16} />
                    Xem chi tiết
                  </button>
                  <button className="btn-resolve">
                    <Check size={16} />
                    Đã xử lý
                  </button>
                  <button className="btn-reject">
                    <X size={16} />
                    Từ chối
                  </button>
                </>
              )}
              {report.status === "resolved" && (
                <div className="status-label status-resolved">✓ Đã xử lý</div>
              )}
              {report.status === "rejected" && (
                <div className="status-label status-rejected">✗ Đã từ chối</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffReports;

