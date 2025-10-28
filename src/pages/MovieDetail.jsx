import {
  Bell,
  ChevronDown,
  Heart,
  Play,
  Plus,
  Share2,
  Star,
  ThumbsUp,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./MovieDetail.scss";
// THÊM CÁC DÒNG NÀY
import movieBackdrop from "../assets/avar-film/anime.webp";
// Bạn cần import ảnh poster đúng
import moviePoster from "../assets/avar-film/a72b67c881f91562dd2d357568618297.webp"; // Ví dụ ảnh poster

// Dữ liệu gán cứng, dựa trên ảnh chụp "Tài Xế Giao Hàng"
const hardcodedMovie = {
  title: "Tài Xế Giao Hàng",
  originalTitle: "The Delivery Rider",
  posterUrl: moviePoster, // Sử dụng biến đã import
  backdropUrl: movieBackdrop, // Sử dụng biến đã import
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
  ratingCount: 12, // Giả định
};

const MovieDetail = () => {
  // Bỏ 'comments' khỏi tab mặc định nếu muốn
  const [activeTab, setActiveTab] = useState("episodes");

  return (
    <div className="movie-detail-page">
      {/* 1. BACKDROP / BANNER PHIM */}
      <div
        className="movie-backdrop"
        style={{
          backgroundImage: `url(${hardcodedMovie.backdropUrl})`,
        }}
      >
        <div className="backdrop-overlay"></div>
      </div>

      {/* 2. NỘI DUNG CHÍNH (Sidebar Trái + Main Phải) */}
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
            {/* ... (Code còn lại của sidebar) ... */}
            <h1 className="movie-title">{hardcodedMovie.title}</h1>           {" "}
            <p className="movie-original-title">
                            {hardcodedMovie.originalTitle}           {" "}
            </p>
            {/* Meta (IMDb, Rating,...) */}           {" "}
            <div className="movie-meta">
                           {" "}
              <span className="meta-badge imdb">
                                IMDb {hardcodedMovie.imdb}             {" "}
              </span>
                           {" "}
              <span className="meta-badge rating">{hardcodedMovie.rating}</span>
                           {" "}
              <span className="meta-badge quality">
                                {hardcodedMovie.quality}             {" "}
              </span>
                           {" "}
              <span className="meta-badge duration">
                                {hardcodedMovie.duration}             {" "}
              </span>
                         {" "}
            </div>
            {/* Thể loại */}           {" "}
            <div className="movie-genres">
                           {" "}
              {hardcodedMovie.genres.map((genre) => (
                <Link to={`/genre/${genre}`} key={genre} className="genre-tag">
                                    {genre}               {" "}
                </Link>
              ))}
                         {" "}
            </div>
            {/* Thông tin chi tiết */}           {" "}
            <div className="info-section">
                           {" "}
              <div className="info-block">
                                <strong>Giới thiệu:</strong>               {" "}
                <p>{hardcodedMovie.overview}</p>             {" "}
              </div>
                           {" "}
              <div className="info-block">
                                <strong>Thời lượng:</strong>               {" "}
                <p>{hardcodedMovie.fullDuration}</p>             {" "}
              </div>
                           {" "}
              <div className="info-block">
                                <strong>Quốc gia:</strong>               {" "}
                <p>{hardcodedMovie.country}</p>             {" "}
              </div>
                           {" "}
              <div className="info-block">
                                <strong>Sản xuất:</strong>               {" "}
                <p>{hardcodedMovie.production}</p>             {" "}
              </div>
                           {" "}
              <div className="info-block">
                                <strong>Đạo diễn:</strong>               {" "}
                <p>{hardcodedMovie.director}</p>             {" "}
              </div>
                         {" "}
            </div>
          </aside>

          {/* ============================================= */}
          {/* CỘT BÊN PHẢI (NỘI DUNG CHÍNH) */}
          {/* ============================================= */}
          <main className="movie-main-content">
            {/* Nút actions */}
            <div className="movie-actions">
              {/* ... (Các nút Xem ngay, Yêu thích...) ... */}
              <button className="btn-play">
                                <Play /> Xem Ngay              {" "}
              </button>
                           {" "}
              <button className="btn-icon">
                                <Heart /> <span>Yêu thích</span>             {" "}
              </button>
                           {" "}
              <button className="btn-icon">
                                <Plus /> <span>Thêm vào</span>             {" "}
              </button>
                           {" "}
              <button className="btn-icon">
                                <Share2 /> <span>Chia sẻ</span>             {" "}
              </button>
                           {" "}
              <button className="btn-icon">
                                <Bell /> <span>Báo lỗi</span>             {" "}
              </button>
            </div>

            {/* Đánh giá */}
            <div className="movie-rating-box">
              {/* ... (Code đánh giá) ... */}
              <div className="rating-score">
                                <Star /> {hardcodedMovie.ratingScore.toFixed(1)}
                             {" "}
              </div>
                           {" "}
              <div className="rating-count">
                                ({hardcodedMovie.ratingCount} đánh giá)        
                     {" "}
              </div>
                            <button className="btn-rate">Đánh giá</button>
            </div>

            {/* Tabs (Bỏ tab Bình luận) */}
            <div className="movie-tabs">
              <button
                className={`tab-btn ${
                  activeTab === "episodes" ? "active" : ""
                }`}
                onClick={() => setActiveTab("episodes")}
              >
                Tập phim
              </button>
              <button
                className={`tab-btn ${activeTab === "gallery" ? "active" : ""}`}
                onClick={() => setActiveTab("gallery")}
              >
                Gallery
              </button>
              <button
                className={`tab-btn ${activeTab === "actors" ? "active" : ""}`}
                onClick={() => setActiveTab("actors")}
              >
                Diễn viên
              </button>
              <button
                className={`tab-btn ${activeTab === "suggest" ? "active" : ""}`}
                onClick={() => setActiveTab("suggest")}
              >
                Đề xuất
              </button>
              {/* === XÓA NÚT BÌNH LUẬN Ở ĐÂY === */}
              {/* <button
                className={`tab-btn ${
                  activeTab === "comments" ? "active" : ""
                }`}
                onClick={() => setActiveTab("comments")}
              >
                Bình luận (12)
              </button> */}
            </div>

            {/* Nội dung Tabs */}
            <div className="movie-tab-content">
              {/* Tab TẬP PHIM */}
              {activeTab === "episodes" && (
                <div className="episodes-tab">
                  {/* ... (Code của tab Tập phim) ... */}
                  <div className="episode-selector">
                                       {" "}
                    <button className="btn-episode-part">Phần 1</button>       
                               {" "}
                    <div className="episode-options">
                                           {" "}
                      <button className="btn-option">
                                                <ChevronDown size={16} /> Phụ đề
                                             {" "}
                      </button>
                                           {" "}
                      <button className="btn-option">
                                                <ChevronDown size={16} /> Lồng
                        tiếng                      {" "}
                      </button>
                                         {" "}
                    </div>
                                     {" "}
                  </div>
                                   {" "}
                  <div className="episode-list-wrapper">
                                       {" "}
                    <h3 className="list-title">Các bản chiếu</h3>               
                       {" "}
                    <ul className="episode-list">
                                           {" "}
                      <li className="episode-item active">
                                               {" "}
                        <div className="episode-badge">Phụ đề</div>             
                                 {" "}
                        <span className="episode-name">Tài Xế Giao Hàng</span> 
                                             {" "}
                        <button className="btn-watch-now">Xem bản này</button> 
                                           {" "}
                      </li>
                                         {" "}
                    </ul>
                                     {" "}
                  </div>
                </div>
              )}

              {/* === XÓA ĐIỀU KIỆN 'activeTab === "comments"' Ở ĐÂY === */}
              {/* {activeTab === "comments" && ( ... )} */}

              {/* (Thêm nội dung cho các tab khác nếu có) */}
            </div>
            {/* Đóng thẻ .movie-tab-content */}

            {/* Comment Section */}
            <div className="comments-section">
              <div className="section-header">
                <h2 className="section-title">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  Bình luận <span className="comment-count">(12)</span>
                </h2>
              </div>
              <div className="comments-tab">
                <div className="comment-input-area">
                  <div className="input-header">
                    <p>
                      Vui lòng <Link to="/login">đăng nhập</Link> để tham gia thảo luận
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
                          <span>Tiêu lệ?</span>
                        </label>
                      </div>
                      <button className="btn-submit-comment">
                        <span>Gửi bình luận</span>
                        <Play size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="comment-list">
                  <div className="comment-item">
                    <div className="comment-avatar">
                      <img
                        src="/images/avatar-placeholder.png"
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
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 6v6l4 2"></path>
                          </svg>
                          17 giờ trước
                        </span>
                      </div>
                      <div className="comment-content">
                        <p className="comment-text">
                          nhìn mấy con quảng cáo nháy nháy trông bẩn thật sự...
                        </p>
                      </div>
                      <div className="comment-actions">
                        <button className="action-btn like-btn">
                          <ThumbsUp size={16} />
                          <span>Thích</span>
                        </button>
                        <button className="action-btn reply-btn">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 10h10a5 5 0 0 1 5 5v4"></path>
                            <path d="m13 10-4-4 4-4"></path>
                          </svg>
                          <span>Trả lời</span>
                        </button>
                        <button className="action-btn more-btn">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Comment 2 */}
                  <div className="comment-item">
                    <img
                      src="/images/avatar-placeholder.png"
                      alt="avatar"
                      className="comment-avatar"
                    />
                    <div className="comment-body">
                      <div className="comment-header">
                        <span className="comment-author">Hưng Do</span>
                        <span className="comment-time">20 giờ trước</span>
                      </div>
                      <p className="comment-text">
                        {" "}
                        Phim hay nhé mn. Lúc đầu xem khá cảm xúc...{" "}
                      </p>
                      <div className="comment-actions">
                        <button>
                          {" "}
                          <ThumbsUp size={14} />{" "}
                        </button>
                        <button>
                          {" "}
                          <ChevronDown size={14} />{" "}
                        </button>
                        <button>Trả lời</button>
                        <span>--- Thêm</span>
                      </div>
                    </div>
                  </div>
                  {/* ... (Các comment khác) ... */}
                </div>
              </div>
            </div>
            {/* ========================================================== */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
