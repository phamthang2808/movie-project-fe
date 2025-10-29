import { Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../../components/MovieCard";
import { searchMoviesAPI } from "../../services/movieService";
import { handleApiError } from "../../utils/notification";
import "./Search.scss";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setMovies([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await searchMoviesAPI(query);
        setMovies(response.data.result || response.data.movies || []);
      } catch (err) {
        setError("Không thể tìm kiếm phim");
        handleApiError(err, "Không thể tìm kiếm phim");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  return (
    <div className="search-page">
      <div className="container">
        <h1 className="search-title">
          Kết quả tìm kiếm cho: <span className="search-query">{query}</span>
        </h1>

        {loading && (
          <div className="search-loading">
            <Loader2 />
          </div>
        )}

        {error && <div className="search-error">{error}</div>}

        {!loading && !error && movies.length === 0 && query && (
          <div className="search-empty">
            <Search className="empty-icon" />
            <p className="empty-text">Không tìm thấy phim nào</p>
          </div>
        )}

        {!loading && !error && movies.length > 0 && (
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {!query && (
          <div className="search-empty">
            <Search className="empty-icon" />
            <p className="empty-text">Nhập từ khóa để tìm kiếm phim</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
