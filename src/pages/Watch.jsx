import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Star } from "lucide-react";
import {
  fetchMovieDetails,
  fetchMovieVideos,
  fetchMovieCast,
} from "../services/movieService";
import "./Watch.scss";

const uiText = {
  "khong-co-video": "Không có trailer",
  "quay-lai": "Quay lại",
  phut: "phút",
  "khong-co-mo-ta": "Không có mô tả",
  "dien-vien": "Diễn viên",
  "de-xuat": "Đề xuất cho bạn",
};

const Watch = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [m, v, c] = await Promise.all([
          fetchMovieDetails(Number(id)),
          fetchMovieVideos(Number(id)),
          fetchMovieCast(Number(id)),
        ]);
        setMovie(m);
        setVideos(v);
        setCast(c.cast || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const trailer = videos.find(
    (x) => x.type === "Trailer" && x.site === "YouTube"
  );

  if (loading || !movie) return null;

  return (
    <div className="watch-page">
      <div className="watch-player">
        {trailer ? (
          <iframe
            width="100%"
            height="560"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={trailer.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="no-video">{uiText["khong-co-video"]}</div>
        )}
      </div>

      <div className="watch-layout">
        <div className="watch-left">
          <Link to="/" className="back-link">
            <ArrowLeft /> {uiText["quay-lai"]}
          </Link>
          <h1 className="title">{movie.title}</h1>
          <div className="meta">
            <span className="chip">
              <Star size={16} /> {movie.vote_average.toFixed(1)}
            </span>
            <span className="chip">
              <Calendar size={16} />{" "}
              {new Date(movie.release_date).getFullYear()}
            </span>
            <span className="chip">
              <Clock size={16} /> {movie.runtime} {uiText.phut}
            </span>
          </div>
          <p className="overview">
            {movie.overview || uiText["khong-co-mo-ta"]}
          </p>

          {cast.length > 0 && (
            <section className="cast">
              <h3>{uiText["dien-vien"]}</h3>
              <div className="cast-grid">
                {cast.slice(0, 12).map((a) => (
                  <div key={a.id} className="cast-item">
                    <img
                      src={
                        a.profile_path
                          ? `https://image.tmdb.org/t/p/w300${a.profile_path}`
                          : "https://via.placeholder.com/300x450?text=No+Photo"
                      }
                      alt={a.name}
                    />
                    <div className="name">{a.name}</div>
                    <div className="role">{a.character}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="watch-right">
          <h3>{uiText["de-xuat"]}</h3>
          <div className="suggest-list">
            {cast.slice(0, 6).map((a) => (
              <div key={a.id} className="s-item">
                <img
                  src={
                    a.profile_path
                      ? `https://image.tmdb.org/t/p/w300${a.profile_path}`
                      : "https://via.placeholder.com/300x450?text=No+Photo"
                  }
                  alt={a.name}
                />
                <div>
                  <div className="s-title">{a.name}</div>
                  <div className="s-sub">{a.character}</div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Watch;
