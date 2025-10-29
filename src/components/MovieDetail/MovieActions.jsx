import { Bell, Heart, Play, Plus, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MovieActions = () => {
  const navigate = useNavigate();

  return (
    <div className="movie-actions">
      <button className="btn-play" onClick={() => navigate("/watch")}>
        <Play /> Xem Ngay
      </button>
      <button className="btn-icon">
        <Heart /> <span>Yêu thích</span>
      </button>
      <button className="btn-icon">
        <Plus /> <span>Thêm vào</span>
      </button>
      <button className="btn-icon">
        <Share2 /> <span>Chia sẻ</span>
      </button>
      <button className="btn-icon">
        <Bell /> <span>Báo lỗi</span>
      </button>
    </div>
  );
};

export default MovieActions;
