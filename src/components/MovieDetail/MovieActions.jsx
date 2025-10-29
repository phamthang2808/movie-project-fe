import { Bell, Heart, Play, Plus, Share2 } from "lucide-react";

const MovieActions = () => {
  return (
    <div className="movie-actions">
      <button className="btn-play">
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
