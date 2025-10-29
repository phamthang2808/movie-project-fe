import { MessageSquare } from "lucide-react";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";
import "./MovieComments.scss";

// Dữ liệu mẫu
const sampleComments = [
  {
    id: 1,
    author: "tzone",
    badge: "♂",
    badgeType: "male",
    avatar: "https://i.pravatar.cc/150?img=11",
    time: "5 ngày trước",
    text: "xin cảm nhận",
    replies: [
      {
        id: 101,
        author: "thangcutehuhu2808",
        badge: "∞",
        badgeType: "infinity",
        avatar: "https://i.pravatar.cc/150?img=12",
        time: "vài giây trước",
        text: "@tzone  hi",
      },
      {
        id: 102,
        author: "Nakamoto",
        badge: "∞",
        badgeType: "infinity",
        avatar: "https://i.pravatar.cc/150?img=13",
        time: "5 ngày trước",
        text: "Phim hay",
      },
    ],
  },
  {
    id: 2,
    author: "Hung Do",
    badge: "∞",
    badgeType: "infinity",
    avatar: "https://i.pravatar.cc/150?img=1",
    time: "2 ngày trước",
    text: "Phim khá hay nhé mn. Lúc đầu xem khá cảm xúc nhất đoạn 2 bố con sắp chia tay nhau",
  },
  {
    id: 3,
    author: "Phạm Quang Huy",
    badge: "∞",
    badgeType: "infinity",
    avatar: "https://i.pravatar.cc/150?img=2",
    time: "2 ngày trước",
    text: "phim như phim việt chỉ khác là phải đọc sub , đô kị xảo và đô thực tế ko cao , nhưng mấy cảnh đám nhau chất lượng , nhất khúc đám anh đầu bạc .",
  },
  {
    id: 4,
    author: "Quan",
    badge: "∞",
    badgeType: "infinity",
    avatar: "https://i.pravatar.cc/150?img=3",
    time: "4 ngày trước",
    text: "phim mà mood như khúc đầu mãi thêm nội dung như phim Hàn thì sẽ đánh giá là phim hay, nhưng mà mắc kẹt trong cái nhà mãi xong truy lùng nhau mãi cũng thấy nhạm, giảm chất lượng hay đi nhiều, dùng kiểu đầu voi thân chuột. Main buff nhiều thứ quá khúc sau không rõ răng lắm. Chỉ đánh giá là oke thôi.",
    isHiddenByDefault: true, // Gán cứng comment này bị ẩn
  },
  {
    id: 5,
    author: "Ngo ha",
    badge: "∞",
    badgeType: "infinity",
    avatar: "https://i.pravatar.cc/150?img=4",
    time: "2 ngày trước",
    text: "xem ok phết kkk",
  },
  {
    id: 6,
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
