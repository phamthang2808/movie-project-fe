import { ThumbsDown, ThumbsUp } from "lucide-react";

const CommentItem = ({ comment }) => {
  return (
    <div className="comment-item">
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
        </div>
        <div className="comment-actions">
          <button className="action-btn like-btn">
            <ThumbsUp size={16} /> <span>Thích</span>
          </button>
          <button className="action-btn">
            <ThumbsDown size={16} />
          </button>
          <button className="action-btn reply-btn">
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
          <button className="action-btn more-btn">
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
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
