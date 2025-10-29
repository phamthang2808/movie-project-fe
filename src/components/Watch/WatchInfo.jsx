import {
  ChevronDown,
  Flag,
  Heart,
  MessageSquare,
  Plus,
  Share2,
  Star,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const WatchInfo = ({ movie }) => {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="watch-info-section">
      {/* Action Buttons Row */}
      <div className="watch-actions">
        <button className="watch-action-btn">
          <Heart size={18} />
          <span>Yêu thích</span>
        </button>
        <button className="watch-action-btn">
          <Plus size={18} />
          <span>Thêm vào</span>
        </button>
        <button className="watch-action-btn skip-btn">
          <span>Bỏ qua giới thiệu</span>
          <span className="badge-off">OFF</span>
        </button>
        <button className="watch-action-btn">
          <span>Rap phim</span>
          <span className="badge-off">OFF</span>
        </button>
        <button className="watch-action-btn">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span>Xem chung</span>
        </button>
        <button className="watch-action-btn">
          <Share2 size={18} />
          <span>Chia sẻ</span>
        </button>
        <button className="watch-action-btn error-btn">
          <Flag size={18} />
          <span>Báo lỗi</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="watch-tabs">
        <button
          className={`watch-tab ${activeTab === "info" ? "active" : ""}`}
          onClick={() => setActiveTab("info")}
        >
          Tập phim
        </button>
        <button
          className={`watch-tab ${activeTab === "gallery" ? "active" : ""}`}
          onClick={() => setActiveTab("gallery")}
        >
          Gallery
        </button>
        <button
          className={`watch-tab ${activeTab === "cast" ? "active" : ""}`}
          onClick={() => setActiveTab("cast")}
        >
          Diễn viên
        </button>
      </div>

      {/* Movie Info Content */}
      <div className="watch-movie-info">
        {/* Poster and Details */}
        <div className="movie-info-layout">
          <div className="movie-poster-small">
            <img src={movie.poster} alt={movie.title} className="poster-img" />
          </div>

          <div className="movie-details">
            <h1 className="movie-title-watch">{movie.title}</h1>
            <p className="movie-subtitle">{movie.originalTitle}</p>

            {/* Meta Info */}
            <div className="movie-meta-info">
              <span className="meta-item imdb">
                <Star size={14} fill="#f5c518" stroke="#f5c518" />
                IMDb {movie.imdb}
              </span>
              <span className="meta-item">{movie.rating}</span>
              <span className="meta-item">{movie.year}</span>
              <span className="meta-item">{movie.duration}</span>
            </div>

            {/* Genres */}
            <div className="movie-genres-watch">
              {movie.genres.map((genre, index) => (
                <Link key={index} to={`/genre/${genre}`} className="genre-link">
                  {genre}
                </Link>
              ))}
            </div>

            {/* Description */}
            <div className="movie-description-watch">
              <h3>Giới thiệu phim:</h3>
              <p>{movie.description}</p>
              <button className="show-more-btn">
                Thông tin phim <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Rating and Comments Link */}
        <div className="rating-comment-row">
          <div className="rating-info">
            <div className="rating-stars">
              <Star size={20} fill="#ff8c00" stroke="#ff8c00" />
              <span className="rating-score">6.0</span>
            </div>
            <button className="rate-btn-watch">Đánh giá</button>
          </div>
          <button className="comment-link-btn">
            <MessageSquare size={18} />
            <span>Bình luận</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchInfo;
