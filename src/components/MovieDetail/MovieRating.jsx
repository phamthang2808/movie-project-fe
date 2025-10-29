import { Star } from "lucide-react";

const MovieRating = ({ ratingScore, ratingCount }) => {
  return (
    <div className="movie-rating-box">
      <div className="rating-score">
        <Star /> {ratingScore.toFixed(1)}
      </div>
      <div className="rating-count">({ratingCount} đánh giá)</div>
      <button className="btn-rate">Đánh giá</button>
    </div>
  );
};

export default MovieRating;
