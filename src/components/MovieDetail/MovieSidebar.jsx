import { Link } from "react-router-dom";

const MovieSidebar = ({ movie }) => {
  return (
    <aside className="movie-sidebar">
      <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
      <h1 className="movie-title">{movie.title}</h1>
      <p className="movie-original-title">{movie.originalTitle}</p>

      {/* Meta */}
      <div className="movie-meta">
        <span className="meta-badge imdb">IMDb {movie.imdb.toFixed(1)}</span>
        <span className="meta-badge rating">{movie.rating}</span>
        <span className="meta-badge quality">{movie.quality}</span>
        <span className="meta-badge duration">{movie.duration}</span>
      </div>

      {/* Thể loại */}
      <div className="movie-genres">
        {movie.genres.map((genre) => (
          <Link to={`/genre/${genre}`} key={genre} className="genre-tag">
            {genre}
          </Link>
        ))}
      </div>

      {/* Thông tin chi tiết */}
      <div className="info-section">
        <div className="info-block">
          <strong>Giới thiệu:</strong> <p>{movie.overview}</p>
        </div>
        <div className="info-block">
          <strong>Thời lượng:</strong> <p>{movie.fullDuration}</p>
        </div>
        <div className="info-block">
          <strong>Quốc gia:</strong> <p>{movie.country}</p>
        </div>
        <div className="info-block">
          <strong>Sản xuất:</strong> <p>{movie.production}</p>
        </div>
        <div className="info-block">
          <strong>Đạo diễn:</strong> <p>{movie.director}</p>
        </div>
      </div>
    </aside>
  );
};

export default MovieSidebar;
