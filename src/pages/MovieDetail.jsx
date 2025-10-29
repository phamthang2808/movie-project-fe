import React from "react";
import {
  MovieActions,
  MovieRating,
  MovieSidebar,
  MovieTabs,
} from "../components/MovieDetail";
import TopMoviesWeek from "../components/TopMoviesWeek";
import "./MovieDetail.scss";
// Import ảnh
import moviePoster from "../assets/avar-film/a72b67c881f91562dd2d357568618297.webp";
import movieBackdrop from "../assets/avar-film/anime.webp";

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
  return (
    <div className="movie-detail-page">
      {/* 1. BACKDROP / BANNER PHIM */}
      <div
        className="movie-backdrop"
        style={{
          "--backdrop-url": `url(${hardcodedMovie.backdropUrl})`,
        }}
      ></div>

      {/* 2. NỘI DUNG CHÍNH */}
      <div className="movie-content-container">
        <div className="movie-grid-layout">
          {/* CỘT BÊN TRÁI (SIDEBAR) */}
          <MovieSidebar movie={hardcodedMovie} />

          {/* NỘI DUNG CHÍNH (GIỮA) */}
          <main className="movie-main-content">
            <MovieActions />
            <MovieRating
              ratingScore={hardcodedMovie.ratingScore}
              ratingCount={hardcodedMovie.ratingCount}
            />
            <MovieTabs movie={hardcodedMovie} />
          </main>

          {/* SIDEBAR PHẢI */}
          <aside className="movie-sidebar-right">
            <TopMoviesWeek />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
