import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import "./TopMoviesWeek.scss";

import poster5 from "../assets/avar-film/086a7bc9b316bc3f9c2ff6d66ac65565.webp";
import poster8 from "../assets/avar-film/2e581b6555172571c49ef08119f5631a.webp";
import poster7 from "../assets/avar-film/3fe1d3c8c7322bdc5c6fba7ecacc8c9f.webp";
import poster1 from "../assets/avar-film/489955f87e659835e0620e46b86fe20f.webp";
import poster9 from "../assets/avar-film/5f146da72268d7ce5449dcf2f8765454.webp";
import poster6 from "../assets/avar-film/6c9779087671f044479dec8f8e06ce28.webp";
import poster10 from "../assets/avar-film/85a2399375b56672c27f8c4ea0438ac7.webp";
import poster4 from "../assets/avar-film/93bdf7e3dfd3a45031197779663334d9.webp";
import poster3 from "../assets/avar-film/a8464a65aa3dca06b00862be682b737b.webp";
import poster2 from "../assets/avar-film/c1670542b444808113121af72ebf2520.webp";

const topMovies = [
  {
    rank: 1,
    title: "Nhất Tiếu Tùy Ca",
    originalTitle: "Sword and Beloved",
    poster: poster1,
    rating: 8.5,
    episodes: "Tập 36",
    year: 2025,
  },
  {
    rank: 2,
    title: "Hành Bộ Chồng Chéo",
    originalTitle: "Persona",
    poster: poster2,
    rating: 7.8,
    episodes: "Tập 4",
    year: 2024,
  },
  {
    rank: 3,
    title: "Thiên Địa Kiếm Tâm",
    originalTitle: "Sword and Beloved",
    poster: poster3,
    rating: 8.2,
    episodes: "Tập 19",
    year: 2024,
  },
  {
    rank: 4,
    title: "Thủy Long Ngâm",
    originalTitle: "Whispers of Fate",
    poster: poster4,
    rating: 7.9,
    episodes: "Tập 11",
    year: 2024,
  },
  {
    rank: 5,
    title: "Thí Khanh Ý",
    originalTitle: "In The Name of Loyalty",
    poster: poster5,
    rating: 8.0,
    episodes: "Tập 6",
    year: 2024,
  },
  {
    rank: 6,
    title: "Ám Hà Truyền",
    originalTitle: "Blood River",
    poster: poster6,
    rating: 7.5,
    episodes: "Tập 9",
    year: 2024,
  },
  {
    rank: 7,
    title: "Hãy Lấy Em Đi",
    originalTitle: "Would You Marry Me?",
    poster: poster7,
    rating: 8.3,
    episodes: "Tập 11",
    year: 2024,
  },
  {
    rank: 8,
    title: "Nhật Tiêu Túy Ca",
    originalTitle: "Ms. Incognito",
    poster: poster8,
    rating: 7.7,
    episodes: "Tập 32",
    year: 2024,
  },
  {
    rank: 9,
    title: "Thần Đền Ơi, Ước Đi",
    originalTitle: "Genie, Make a Wish",
    poster: poster9,
    rating: 8.1,
    episodes: "Tập 13",
    year: 2024,
  },
  {
    rank: 10,
    title: "Ngự Tiên Quý Sư Lục",
    originalTitle: "Tales of Five Immortals",
    poster: poster10,
    rating: 7.6,
    episodes: "Tập 24",
    year: 2024,
  },
];

const uiText = {
  "tieu-de": "Top phim tuần này",
};

const TopMoviesWeek = () => {
  return (
    <div className="top-movies-week">
      <div className="top-movies-header">
        <TrendingUp size={20} />
        <h2>{uiText["tieu-de"]}</h2>
      </div>

      <div className="top-movies-list">
        {topMovies.map((movie) => (
          <Link
            to={`/movie/${movie.rank}`}
            key={movie.rank}
            className="top-movie-item"
          >
            <div className="movie-rank">{movie.rank}</div>
            <div className="movie-poster">
              <img src={movie.poster} alt={movie.title} />
            </div>
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-original-title">{movie.originalTitle}</p>
              <div className="movie-meta">
                <span className="movie-rating">⭐ {movie.rating}</span>
                <span>{movie.episodes}</span>
                <span>{movie.year}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopMoviesWeek;
