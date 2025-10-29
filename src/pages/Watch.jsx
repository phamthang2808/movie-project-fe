import React from "react";
import { MovieComments } from "../components/MovieDetail";
import { RecommendedMovies, VideoPlayer, WatchInfo } from "../components/Watch";
import "./Watch.scss";

// Import ảnh
import moviePoster from "../assets/avar-film/a72b67c881f91562dd2d357568618297.webp";
import movieBackdrop from "../assets/avar-film/anime.webp";

// Hardcoded movie data
const movieData = {
  id: 1,
  title: "Tài Xế Giao Hàng",
  originalTitle: "The Delivery Rider",
  poster: moviePoster,
  backdrop: movieBackdrop,
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Demo URL
  description:
    "Khi dạng đi làm cùng cậu con trai nuôi tâm tuổi, tài xế giao hàng no vô tình chứng kiến một tội ác. Giờ đây, anh phải bảo vệ con mình khỏi những thế lực hung bạo.",
  imdb: 7.8,
  rating: "T16",
  quality: "HD",
  year: 2025,
  duration: "1h 30m",
  genres: ["Chính Kịch", "Hành Động", "Gia Đình", "Đời Thường", "Tâm Lý"],
  currentEpisode: 1,
  totalEpisodes: 1,
  subtitle: "Phụ đề",
};

const Watch = () => {
  return (
    <div className="watch-page">
      {/* Video Player Section */}
      <VideoPlayer
        videoUrl={movieData.videoUrl}
        backdrop={movieData.backdrop}
        title={movieData.title}
        movie={movieData}
      />

      {/* Content Below Video */}
      <div className="watch-content">
        <div className="watch-main">
          {/* Watch Info */}
          <WatchInfo movie={movieData} />

          {/* Comments Section */}
          <MovieComments commentCount={52} />
        </div>

        {/* Sidebar - Recommended Movies */}
        <aside className="watch-sidebar">
          <RecommendedMovies currentMovieId={movieData.id} />
        </aside>
      </div>
    </div>
  );
};

export default Watch;
