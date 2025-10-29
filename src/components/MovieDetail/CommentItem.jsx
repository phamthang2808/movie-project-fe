import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import CommentInput from "./CommentInput";

const CommentItem = ({ comment }) => {
  const [showReply, setShowReply] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showReplies, setShowReplies] = useState(true); // Mặc định hiển thị replies

  const handleReplyClick = () => {
    setShowReply(!showReply);
  };

  const handleHideClick = () => {
    setIsHidden(!isHidden);
    setShowMenu(false);
  };

  return (
    <div className={`comment-item ${isHidden ? "comment-hidden" : ""}`}>
      <div className="comment-avatar">
        <img
          src={comment.avatar}
          alt={comment.author}
          className="avatar-image"
        />
      </div>
      <div className="comment-body">
        <div className="comment-header">
          <div className="user-info">
            <span className="comment-author">{comment.author}</span>
            {comment.badge && (
              <span className={`comment-badge ${comment.badgeType || ""}`}>
                {comment.badge}
              </span>
            )}
          </div>
          <span className="comment-time">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6l4 2"></path>
            </svg>
            {comment.time}
          </span>
        </div>
        <div className="comment-content">
          <p className="comment-text">{comment.text}</p>
          {isHidden && (
            <div className="hidden-overlay">
              <span>Bình luận đã bị ẩn</span>
            </div>
          )}
        </div>
        <div className="comment-actions">
          <button className="action-btn like-btn">
            <ThumbsUp size={16} /> <span>Thích</span>
          </button>
          <button className="action-btn">
            <ThumbsDown size={16} />
          </button>
          <button className="action-btn reply-btn" onClick={handleReplyClick}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 10h10a5 5 0 0 1 5 5v4"></path>
              <path d="m13 10-4-4 4-4"></path>
            </svg>
            <span>Trả lời</span>
          </button>
          <div className="more-menu-wrapper">
            <button
              className="action-btn more-btn"
              onClick={() => setShowMenu(!showMenu)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </button>
            {showMenu && (
              <div className="more-menu">
                <button className="menu-item" onClick={handleHideClick}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                    <line x1="2" x2="22" y1="2" y2="22"></line>
                  </svg>
                  {isHidden ? "Hiện" : "Ẩn"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Toggle Replies Button */}
        {comment.replies && comment.replies.length > 0 && (
          <button
            className="toggle-replies-btn"
            onClick={() => setShowReplies(!showReplies)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: showReplies ? "rotate(0deg)" : "rotate(-90deg)",
                transition: "transform 0.2s ease",
              }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            {showReplies ? "Ẩn" : "Hiện"} {comment.replies.length} bình luận
          </button>
        )}

        {/* Reply Form */}
        {showReply && (
          <div className="reply-form">
            <CommentInput isReply={true} />
          </div>
        )}

        {/* Replies List - Gán cứng hiển thị replies */}
        {comment.replies && comment.replies.length > 0 && showReplies && (
          <div className="replies-list">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
