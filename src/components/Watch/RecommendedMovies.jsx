import { Play } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

// Import ảnh từ avar-film
import img01 from "../../assets/avar-film/489955f87e659835e0620e46b86fe20f.webp";
import img02 from "../../assets/avar-film/c1670542b444808113121af72ebf2520.webp";
import img03 from "../../assets/avar-film/a8464a65aa3dca06b00862be682b737b.webp";
import img04 from "../../assets/avar-film/93bdf7e3dfd3a45031197779663334d9.webp";
import img05 from "../../assets/avar-film/086a7bc9b316bc3f9c2ff6d66ac65565.webp";

const recommendedMovies = [
  {
    id: 1,
    title: "ConMom",
    subtitle: "ConMom",
    rating: "T16",
    year: "2025",
    duration: "1h 52m",
    poster: img01,
  },
  {
    id: 2,
    title: "Học Viện Ác Nhân",
    subtitle: "Kontrabida Academy",
    rating: "T16",
    year: "2025",
    duration: "1h 48m",
    poster: img02,
  },
  {
    id: 3,
    title: "Bản Hit Cuộc Đời",
    subtitle: "One Hit Wonder",
    rating: "T13",
    year: "2025",
    duration: "1h 52m",
    poster: img03,
  },
  {
    id: 4,
    title: "Vượt Tầm Kiểm Soát",
    subtitle: "Out of Order",
    rating: "T16",
    year: "2025",
    duration: "1h 45m",
    poster: img04,
  },
  {
    id: 5,
    title: "Chỉ Đôi Ta Biết",
    subtitle: "Only We Know",
    rating: "T16",
    year: "2025",
    duration: "1h 41m",
    poster: img05,
  },
];

const RecommendedMovies = ({ currentMovieId }) => {
  return (
    <div className="recommended-section">
      <h2 className="recommended-title">Đề xuất cho bạn</h2>

      <div className="recommended-list">
        {recommendedMovies.map((movie) => (
          <Link
            key={movie.id}
            to={`/watch/${movie.id}`}
            className="recommended-item"
          >
            <div className="recommended-poster">
              <img src={movie.poster} alt={movie.title} />
              <div className="play-overlay">
                <Play size={24} fill="white" stroke="white" />
              </div>
            </div>

            <div className="recommended-info">
              <h3 className="recommended-movie-title">{movie.title}</h3>
              <p className="recommended-subtitle">{movie.subtitle}</p>
              <div className="recommended-meta">
                <span className="meta-badge">{movie.rating}</span>
                <span className="meta-badge">{movie.year}</span>
                <span className="meta-badge">{movie.duration}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <button className="load-more-btn">
        <Play size={16} />
        Gửi
      </button>
    </div>
  );
};

export default RecommendedMovies;
