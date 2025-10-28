import {
  Bell,
  ChevronDown,
  // CornerUpLeft, // Không cần nếu dùng SVG
  Heart,
  MessageSquare, // Thêm icon này

  // MoreHorizontal, // Không cần nếu dùng SVG
  Play,
  Plus,
  Send, // Thêm icon này
  Share2,
  Star,
  ThumbsDown, // Thêm icon này
  ThumbsUp,
} from "lucide-react";
import React, { useState } from "react"; // Thêm React nếu chưa có
import { Link } from "react-router-dom";
import TopMoviesWeek from "../components/TopMoviesWeek"; // Import sidebar phải
import "./MovieDetail.scss";
// THÊM CÁC DÒNG NÀY (Đảm bảo đường dẫn đúng)
import moviePoster from "../assets/avar-film/a72b67c881f91562dd2d357568618297.webp"; // Ảnh poster
import movieBackdrop from "../assets/avar-film/anime.webp"; // Ảnh backdrop

// Dữ liệu gán cứng
const hardcodedMovie = {
  title: "Tài Xế Giao Hàng",
  originalTitle: "The Delivery Rider",
  posterUrl: moviePoster,
  backdropUrl: movieBackdrop,
  imdb: 7.0,
  rating: "T18",
  quality: "70%",
  duration: "1h 16m",
  genres: ["Chính Kịch", "Hành Động", "Gia Đình", "Bạo Lực", "Tâm Lý"],
  overview:
    "Khi đang đi làm cùng con trai nuôi tám tuổi, tài xế giao hàng rẽ vào một con hẻm bị chặn... Giờ đây, anh phải bảo vệ con mình khỏi những thế lực hung bạo.",
  fullDuration: "1h 16m",
  country: "Philippin",
  production: "Studio8, 1how Sally",
  director:
    "Jomar del Rosario, Wong Ton Bin, Maiki de Vera, Lance Pimentel, Leober Pimentel",
  ratingScore: 6.0,
  ratingCount: 12,
};

const MovieDetail = () => {
  const [activeTab, setActiveTab] = useState("episodes");

  return (
    <div className="movie-detail-page">
      {/* 1. BACKDROP / BANNER PHIM */}
      <div
        className="movie-backdrop"
        style={{
          // Sử dụng biến CSS để truyền URL ảnh nền
          "--backdrop-url": `url(${hardcodedMovie.backdropUrl})`,
        }}
      ></div>

      {/* 2. NỘI DUNG CHÍNH */}
      <div className="movie-content-container">
        <div className="movie-grid-layout">
          {/* ============================================= */}
          {/* CỘT BÊN TRÁI (SIDEBAR) */}
          {/* ============================================= */}
          <aside className="movie-sidebar">
            <img
              src={hardcodedMovie.posterUrl}
              alt={hardcodedMovie.title}
              className="movie-poster"
            />
            <h1 className="movie-title">{hardcodedMovie.title}</h1>
            <p className="movie-original-title">
              {hardcodedMovie.originalTitle}
            </p>
            {/* Meta */}
            <div className="movie-meta">
              <span className="meta-badge imdb">
                IMDb {hardcodedMovie.imdb.toFixed(1)}
              </span>
              <span className="meta-badge rating">{hardcodedMovie.rating}</span>
              <span className="meta-badge quality">
                {hardcodedMovie.quality}
              </span>
              <span className="meta-badge duration">
                {hardcodedMovie.duration}
              </span>
            </div>
            {/* Thể loại */}
            <div className="movie-genres">
              {hardcodedMovie.genres.map((genre) => (
                <Link to={`/genre/${genre}`} key={genre} className="genre-tag">
                  {genre}
                </Link>
              ))}
            </div>
            {/* Thông tin chi tiết */}
            <div className="info-section">
              <div className="info-block">
                <strong>Giới thiệu:</strong> <p>{hardcodedMovie.overview}</p>
              </div>
              <div className="info-block">
                <strong>Thời lượng:</strong>{" "}
                <p>{hardcodedMovie.fullDuration}</p>
              </div>
              <div className="info-block">
                <strong>Quốc gia:</strong> <p>{hardcodedMovie.country}</p>
              </div>
              <div className="info-block">
                <strong>Sản xuất:</strong> <p>{hardcodedMovie.production}</p>
              </div>
              <div className="info-block">
                <strong>Đạo diễn:</strong> <p>{hardcodedMovie.director}</p>
              </div>
            </div>
          </aside>

          {/* ============================================= */}
          {/* NỘI DUNG CHÍNH (GIỮA) */}
          {/* ============================================= */}
          <main className="movie-main-content">
            {/* Nút actions */}
            <div className="movie-actions">
              <button className="btn-play">
                {" "}
                <Play /> Xem Ngay{" "}
              </button>
              <button className="btn-icon">
                {" "}
                <Heart /> <span>Yêu thích</span>{" "}
              </button>
              <button className="btn-icon">
                {" "}
                <Plus /> <span>Thêm vào</span>{" "}
              </button>
              <button className="btn-icon">
                {" "}
                <Share2 /> <span>Chia sẻ</span>{" "}
              </button>
              <button className="btn-icon">
                {" "}
                <Bell /> <span>Báo lỗi</span>{" "}
              </button>
            </div>

            {/* Đánh giá */}
            <div className="movie-rating-box">
              <div className="rating-score">
                {" "}
                <Star /> {hardcodedMovie.ratingScore.toFixed(1)}{" "}
              </div>
              <div className="rating-count">
                {" "}
                ({hardcodedMovie.ratingCount} đánh giá){" "}
              </div>
              <button className="btn-rate">Đánh giá</button>
            </div>

            {/* Tabs */}
            <div className="movie-tabs">
              <button
                className={`tab-btn ${
                  activeTab === "episodes" ? "active" : ""
                }`}
                onClick={() => setActiveTab("episodes")}
              >
                {" "}
                Tập phim{" "}
              </button>
              <button
                className={`tab-btn ${activeTab === "gallery" ? "active" : ""}`}
                onClick={() => setActiveTab("gallery")}
              >
                {" "}
                Gallery{" "}
              </button>
              <button
                className={`tab-btn ${activeTab === "actors" ? "active" : ""}`}
                onClick={() => setActiveTab("actors")}
              >
                {" "}
                Diễn viên{" "}
              </button>
              <button
                className={`tab-btn ${activeTab === "suggest" ? "active" : ""}`}
                onClick={() => setActiveTab("suggest")}
              >
                {" "}
                Đề xuất{" "}
              </button>
            </div>

            {/* Nội dung Tabs */}
            <div className="movie-tab-content">
              {activeTab === "episodes" && (
                <div className="episodes-tab">
                  <div className="episode-selector">
                    <button className="btn-episode-part">Phần 1</button>
                    <div className="episode-options">
                      <button className="btn-option">
                        {" "}
                        <ChevronDown size={16} /> Phụ đề{" "}
                      </button>
                      <button className="btn-option">
                        {" "}
                        <ChevronDown size={16} /> Lồng tiếng{" "}
                      </button>
                    </div>
                  </div>
                  <div className="episode-list-wrapper">
                    <h3 className="list-title">Các bản chiếu</h3>
                    <ul className="episode-list">
                      <li className="episode-item active">
                        <div className="episode-badge">Phụ đề</div>
                        <span className="episode-name">
                          {hardcodedMovie.title}
                        </span>
                        <button className="btn-watch-now">Xem bản này</button>
                      </li>
                      {/* Thêm các tập khác nếu có */}
                    </ul>
                  </div>
                </div>
              )}
              {/* Thêm nội dung cho tab Gallery, Diễn viên, Đề xuất nếu cần */}
              {activeTab === "gallery" && <div>Nội dung Gallery...</div>}
              {activeTab === "actors" && <div>Nội dung Diễn viên...</div>}
              {activeTab === "suggest" && <div>Nội dung Đề xuất...</div>}
            </div>
            {/* Đóng thẻ .movie-tab-content */}

            {/* ========================================================== */}
            {/* PHẦN BÌNH LUẬN (ĐÃ VIẾT LẠI JSX CHO KHỚP SCSS) */}
            {/* ========================================================== */}
            <div className="comments-section">
              <div className="section-header">
                <h2 className="section-title">
                  <MessageSquare size={22} strokeWidth={2.5} />
                  Bình luận{" "}
                  <span className="comment-count">
                    ({hardcodedMovie.ratingCount})
                  </span>
                </h2>
              </div>

              {/* Vẫn giữ comments-tab làm container chung */}
              <div className="comments-tab">
                {/* --- Phần Input --- */}
                <div className="comment-input-area">
                  <div className="input-header">
                    <p>
                      {" "}
                      Vui lòng <Link to="/login">đăng nhập</Link> để tham gia
                      thảo luận{" "}
                    </p>
                  </div>
                  <div className="input-content">
                    <textarea
                      className="comment-textarea"
                      placeholder="Chia sẻ suy nghĩ của bạn về bộ phim..."
                      rows={4}
                    ></textarea>
                    <div className="comment-submit-row">
                      <div className="comment-options">
                        <label className="spoiler-checkbox">
                          <input type="checkbox" />
                          <span>Tiết lộ?</span>
                        </label>
                      </div>
                      <button className="btn-submit-comment">
                        <span>Gửi bình luận</span>
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* --- Danh sách Comment --- */}
                <div className="comment-list">
                  {/* Comment 1 */}
                  <div className="comment-item">
                    <div className="comment-avatar">
                      <img
                        src="https://i.pravatar.cc/150?img=1" // Link avatar mẫu
                        alt="Avatar của mr simple"
                        className="avatar-image"
                      />
                    </div>
                    <div className="comment-body">
                      <div className="comment-header">
                        <div className="user-info">
                          <span className="comment-author">mr simple</span>
                          <span className="comment-badge">Thành viên</span>
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
                            {" "}
                            <circle cx="12" cy="12" r="10"></circle>{" "}
                            <path d="M12 6v6l4 2"></path>{" "}
                          </svg>
                          17 giờ trước
                        </span>
                      </div>
                      <div className="comment-content">
                        <p className="comment-text">
                          nhìn mấy con quảng cáo nháy nháy trông bẩn thật
                          sự...*** tớ sư mãy bọn casino campuchia lol
                        </p>
                      </div>
                      <div className="comment-actions">
                        <button className="action-btn like-btn">
                          {" "}
                          <ThumbsUp size={16} /> <span>Thích</span>{" "}
                        </button>
                        <button className="action-btn">
                          {" "}
                          <ThumbsDown size={16} />{" "}
                        </button>
                        <button className="action-btn reply-btn">
                          {" "}
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
                          </svg>{" "}
                          <span>Trả lời</span>{" "}
                        </button>
                        <button className="action-btn more-btn">
                          {" "}
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
                          </svg>{" "}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Comment 2 */}
                  <div className="comment-item">
                    <div className="comment-avatar">
                      <img
                        src="https://i.pravatar.cc/150?img=2" // Link avatar khác
                        alt="Avatar của Hưng Do"
                        className="avatar-image"
                      />
                    </div>
                    <div className="comment-body">
                      <div className="comment-header">
                        <div className="user-info">
                          <span className="comment-author">Hưng Do</span>
                          <span className="comment-badge infinity">∞</span>{" "}
                          {/* Huy hiệu vô cực */}
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
                            {" "}
                            <circle cx="12" cy="12" r="10"></circle>{" "}
                            <path d="M12 6v6l4 2"></path>{" "}
                          </svg>
                          20 giờ trước
                        </span>
                      </div>
                      <div className="comment-content">
                        <p className="comment-text">
                          Phim khá hay nhé mn. Lúc đầu xem khá cảm xúc nhất đoạn
                          2 bố con sấp chia tay nhau
                        </p>
                      </div>
                      <div className="comment-actions">
                        <button className="action-btn like-btn">
                          {" "}
                          <ThumbsUp size={16} /> <span>Thích</span>{" "}
                        </button>
                        <button className="action-btn">
                          {" "}
                          <ThumbsDown size={16} />{" "}
                        </button>
                        <button className="action-btn reply-btn">
                          {" "}
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
                          </svg>{" "}
                          <span>Trả lời</span>{" "}
                        </button>
                        <button className="action-btn more-btn">
                          {" "}
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
                          </svg>{" "}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ... (Thêm các comment khác nếu cần) ... */}
                </div>
              </div>
            </div>
            {/* ========================================================== */}
          </main>

          {/* ============================================= */}
          {/* SIDEBAR PHẢI */}
          {/* ============================================= */}
          <aside className="movie-sidebar-right">
            <TopMoviesWeek />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
