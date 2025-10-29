import { ChevronDown } from "lucide-react";
import { useState } from "react";

const MovieTabs = ({ movie }) => {
  const [activeTab, setActiveTab] = useState("episodes");

  return (
    <>
      {/* Tabs */}
      <div className="movie-tabs">
        <button
          className={`tab-btn ${activeTab === "episodes" ? "active" : ""}`}
          onClick={() => setActiveTab("episodes")}
        >
          Tập phim
        </button>
        <button
          className={`tab-btn ${activeTab === "gallery" ? "active" : ""}`}
          onClick={() => setActiveTab("gallery")}
        >
          Gallery
        </button>
        <button
          className={`tab-btn ${activeTab === "actors" ? "active" : ""}`}
          onClick={() => setActiveTab("actors")}
        >
          Diễn viên
        </button>
        <button
          className={`tab-btn ${activeTab === "suggest" ? "active" : ""}`}
          onClick={() => setActiveTab("suggest")}
        >
          Đề xuất
        </button>
      </div>

      {/* Nội dung Tabs */}
      <div className="movie-tab-content">
        {activeTab === "episodes" && (
          <div className="episodes-tab">
            <div className="episode-selector">
              <button className="btn-episode-part">Phần 1</button>
              <div className="episode-options">
                <button className="btn-option">
                  <ChevronDown size={16} /> Phụ đề
                </button>
                <button className="btn-option">
                  <ChevronDown size={16} /> Lồng tiếng
                </button>
              </div>
            </div>
            <div className="episode-list-wrapper">
              <h3 className="list-title">Các bản chiếu</h3>
              <ul className="episode-list">
                <li className="episode-item active">
                  <div className="episode-badge">Phụ đề</div>
                  <span className="episode-name">{movie.title}</span>
                  <button className="btn-watch-now">Xem bản này</button>
                </li>
                {/* Thêm các tập khác nếu có */}
              </ul>
            </div>
          </div>
        )}
        {activeTab === "gallery" && <div>Nội dung Gallery...</div>}
        {activeTab === "actors" && <div>Nội dung Diễn viên...</div>}
        {activeTab === "suggest" && <div>Nội dung Đề xuất...</div>}
      </div>
    </>
  );
};

export default MovieTabs;
