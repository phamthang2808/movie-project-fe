import { Button, Checkbox, Input } from "antd";
import { Send } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const { TextArea } = Input;

const CommentInput = ({ isReply = false }) => {
  const [comment, setComment] = useState("");
  const [isSpoiler, setIsSpoiler] = useState(false);

  const handleSubmit = () => {
    if (comment.trim()) {
      console.log("Comment:", comment, "Spoiler:", isSpoiler, "IsReply:", isReply);
      // Xử lý submit comment ở đây
      setComment("");
      setIsSpoiler(false);
    }
  };

  return (
    <div className={`comment-input-area ${isReply ? 'reply-input' : ''}`}>
      {!isReply && (
        <div className="input-header">
          <p>
            Vui lòng <Link to="/login">đăng nhập</Link> để tham gia bình luận.
          </p>
        </div>
      )}
      <div className="input-content">
        <TextArea
          className="comment-textarea"
          placeholder={isReply ? "Viết trả lời..." : "Viết bình luận"}
          rows={isReply ? 3 : 5}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={1000}
          showCount
        />
        <div className="comment-submit-row">
          <div className="comment-options">
            <Checkbox
              checked={isSpoiler}
              onChange={(e) => setIsSpoiler(e.target.checked)}
            >
              Ẩn danh
            </Checkbox>
          </div>
          <Button
            type="primary"
            icon={<Send size={14} />}
            onClick={handleSubmit}
            className="btn-submit-comment"
          >
            Gửi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
