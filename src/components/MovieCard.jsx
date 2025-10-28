import { Calendar, Star } from "lucide-react";
import { Link } from "react-router-dom";
import "./MovieCard.scss";

const MovieCard = ({ movie }) => {
  const formatDate = (date) => {
    return new Date(date).getFullYear();
  };

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card-link">
      <div className="movie-card card-hover">
        <div className="movie-poster-wrapper">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={movie.title}
            className="movie-poster"
            loading="lazy"
          />
          <div className="movie-rating">
            <Star className="rating-icon" />
            <span className="rating-value">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <div className="movie-date">
            <Calendar className="date-icon" />
            <span>{formatDate(movie.release_date)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;




