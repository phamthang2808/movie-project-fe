import { MessageSquare } from "lucide-react";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";
import "./MovieComments.scss";

// Dữ liệu mẫu
const sampleComments = [
  {
    id: 1,
    author: "nhiều chuyện",
    badge: "∞",
    badgeType: "infinity",
    avatar: "https://i.pravatar.cc/150?img=1",
    time: "12 giờ trước",
    text: "phim hay phết",
  },
  {
    id: 2,
    author: "Ivy Le",
    badge: "👑",
    badgeType: "vip",
    avatar: "https://i.pravatar.cc/150?img=2",
    time: "19 giờ trước",
    text: "phim hay hồng tập mới",
  },
  {
    id: 3,
    author: "VitaDelaRocha",
    badge: "∞",
    badgeType: "infinity",
    avatar: "https://i.pravatar.cc/150?img=3",
    time: "2 ngày trước",
    text: "phim hay xuất sắc xem thích ghê, tập 2 còi lại 2 lần mới đã 😂😂😂",
  },
  {
    id: 4,
    author: "Ngo ha",
    badge: "∞",
    badgeType: "infinity",
    avatar: "https://i.pravatar.cc/150?img=4",
    time: "2 ngày trước",
    text: "xem ok phết kkk",
  },
  {
    id: 5,
    author: "phuonghm.it",
    badge: "∞",
    badgeType: "infinity",
    avatar: "https://i.pravatar.cc/150?img=5",
    time: "2 ngày trước",
    text: "Hóng tập mới 🤩",
  },
];

const MovieComments = ({ commentCount = 52 }) => {
  return (
    <div className="comments-section">
      <div className="section-header">
        <h2 className="section-title">
          <MessageSquare size={22} strokeWidth={2.5} />
          Bình luận
          <span className="comment-count">({commentCount})</span>
        </h2>
      </div>

      <div className="comments-tab">
        <CommentInput />

        <div className="comment-list">
          {sampleComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieComments;
