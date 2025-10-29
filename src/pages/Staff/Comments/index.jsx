import { Check, MessageSquare, Search, Trash2, X } from "lucide-react";
import { useState } from "react";
import "./Comments.scss";

const StaffComments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("pending");

  // Mock data
  const comments = [
    {
      id: 1,
      user: "Nguyễn Văn A",
      movie: "One Piece Film: Red",
      content: "Phim hay lắm, đồ họa đẹp, cốt truyện hấp dẫn!",
      status: "pending",
      time: "5 phút trước",
      rating: 5,
    },
    {
      id: 2,
      user: "Trần Thị B",
      movie: "Naruto Shippuden",
      content: "Tập này cảm động quá, tôi đã khóc 😭",
      status: "pending",
      time: "10 phút trước",
      rating: 5,
    },
    {
      id: 3,
      user: "Lê Văn C",
      movie: "Attack on Titan",
      content: "Kết thúc hơi thất vọng, nhưng nhìn chung vẫn ổn",
      status: "pending",
      time: "15 phút trước",
      rating: 4,
    },
    {
      id: 4,
      user: "Phạm Thị D",
      movie: "Demon Slayer",
      content: "Phim quá đỉnh! Đợi mãi mới có tập mới",
      status: "approved",
      time: "1 giờ trước",
      rating: 5,
    },
    {
      id: 5,
      user: "Hoàng Văn E",
      movie: "Jujutsu Kaisen",
      content: "Link phim bị lỗi, không xem được",
      status: "pending",
      time: "2 giờ trước",
      rating: 2,
    },
  ];

  const filteredComments = comments.filter((comment) => {
    const matchSearch =
      comment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.movie.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === "all" || comment.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const pendingCount = comments.filter((c) => c.status === "pending").length;

  return (
    <div className="staff-comments">
      <div className="page-header">
        <div>
          <h1>Quản lý Bình luận</h1>
          <p>
            {pendingCount} bình luận chờ duyệt • {comments.length} tổng cộng
          </p>
        </div>
      </div>

      <div className="filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm bình luận..."
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
          <option value="pending">Chờ duyệt ({pendingCount})</option>
          <option value="approved">Đã duyệt</option>
          <option value="rejected">Đã từ chối</option>
        </select>
      </div>

      <div className="comments-list">
        {filteredComments.map((comment) => (
          <div key={comment.id} className={`comment-card ${comment.status}`}>
            <div className="comment-header">
              <div className="user-info">
                <div className="avatar">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4>{comment.user}</h4>
                  <p className="movie-name">{comment.movie}</p>
                </div>
              </div>
              <div className="comment-meta">
                <span className="time">{comment.time}</span>
                <span className="rating">{"⭐".repeat(comment.rating)}</span>
              </div>
            </div>

            <div className="comment-content">
              <p>{comment.content}</p>
            </div>

            <div className="comment-actions">
              {comment.status === "pending" && (
                <>
                  <button className="btn-approve">
                    <Check size={16} />
                    Duyệt
                  </button>
                  <button className="btn-reject">
                    <X size={16} />
                    Từ chối
                  </button>
                </>
              )}
              <button className="btn-delete">
                <Trash2 size={16} />
                Xóa
              </button>
            </div>

            {comment.status !== "pending" && (
              <div className={`status-label status-${comment.status}`}>
                {comment.status === "approved" ? "✓ Đã duyệt" : "✗ Đã từ chối"}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffComments;

