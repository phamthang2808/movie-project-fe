import { Edit2, Eye, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import "./Movies.scss";

const StaffMovies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data
  const movies = [
    {
      id: 1,
      title: "One Piece Film: Red",
      category: "Anime",
      status: "active",
      episodes: 1,
      views: 125500,
      rating: 8.5,
      releaseDate: "2025-01-15",
    },
    {
      id: 2,
      title: "Naruto Shippuden",
      category: "Anime",
      status: "active",
      episodes: 500,
      views: 2500000,
      rating: 9.2,
      releaseDate: "2024-12-10",
    },
    {
      id: 3,
      title: "Attack on Titan",
      category: "Anime",
      status: "completed",
      episodes: 87,
      views: 1800000,
      rating: 9.0,
      releaseDate: "2025-01-20",
    },
    {
      id: 4,
      title: "Demon Slayer: Kimetsu no Yaiba",
      category: "Anime",
      status: "active",
      episodes: 55,
      views: 1500000,
      rating: 8.8,
      releaseDate: "2025-01-05",
    },
    {
      id: 5,
      title: "Jujutsu Kaisen",
      category: "Anime",
      status: "active",
      episodes: 47,
      views: 980000,
      rating: 8.7,
      releaseDate: "2024-12-28",
    },
  ];

  const filteredMovies = movies.filter((movie) => {
    const matchSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === "all" || movie.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const getStatusBadge = (status) => {
    const badges = {
      active: { text: "Đang chiếu", class: "status-active" },
      completed: { text: "Hoàn thành", class: "status-completed" },
      upcoming: { text: "Sắp chiếu", class: "status-upcoming" },
    };
    return badges[status] || badges.active;
  };

  return (
    <div className="staff-movies">
      <div className="page-header">
        <div>
          <h1>Quản lý Phim</h1>
          <p>{movies.length} phim đang được quản lý</p>
        </div>
      </div>

      <div className="filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm phim..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="active">Đang chiếu</option>
          <option value="completed">Hoàn thành</option>
          <option value="upcoming">Sắp chiếu</option>
        </select>
      </div>

      <div className="movies-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Tên phim</th>
              <th>Thể loại</th>
              <th>Trạng thái</th>
              <th>Số tập</th>
              <th>Lượt xem</th>
              <th>Đánh giá</th>
              <th>Ngày phát hành</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map((movie, index) => {
              const badge = getStatusBadge(movie.status);
              return (
                <tr key={movie.id}>
                  <td>#{index + 1}</td>
                  <td className="movie-title">{movie.title}</td>
                  <td>{movie.category}</td>
                  <td>
                    <span className={`status-badge ${badge.class}`}>{badge.text}</span>
                  </td>
                  <td>Tập {movie.episodes}</td>
                  <td>{movie.views.toLocaleString()}</td>
                  <td>
                    <span className="rating">⭐ {movie.rating}</span>
                  </td>
                  <td>{movie.releaseDate}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-view" title="Xem">
                        <Eye size={16} />
                      </button>
                      <button className="btn-edit" title="Sửa">
                        <Edit2 size={16} />
                      </button>
                      <button className="btn-delete" title="Xóa">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffMovies;

