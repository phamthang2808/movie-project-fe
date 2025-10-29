import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import "./Movies.scss";

const AdminMovies = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - Sẽ fetch từ API sau
  const movies = [
    {
      id: 1,
      title: "Nhất Tiếu Tùy Ca",
      category: "Cổ Trang",
      status: "Đang chiếu",
      episodes: "Tập 36",
      views: "125.5K",
      rating: 8.5,
      createdAt: "2025-01-15",
    },
    {
      id: 2,
      title: "Thanh Xuân Của Chúng Ta",
      category: "Tình Cảm",
      status: "Hoàn thành",
      episodes: "Tập 24",
      views: "98.3K",
      rating: 9.2,
      createdAt: "2025-01-10",
    },
    {
      id: 3,
      title: "Chiến Binh Vô Danh",
      category: "Hành Động",
      status: "Sắp chiếu",
      episodes: "Tập 12",
      views: "0",
      rating: 0,
      createdAt: "2025-01-20",
    },
  ];

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-movies">
      <div className="movies-header">
        <div className="header-left">
          <h1>Quản lý Phim</h1>
          <p>{movies.length} phim trong hệ thống</p>
        </div>
        <button className="btn-add">
          <Plus size={20} />
          <span>Thêm phim mới</span>
        </button>
      </div>

      <div className="movies-toolbar">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm phim..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters">
          <select className="filter-select">
            <option value="">Tất cả thể loại</option>
            <option value="action">Hành Động</option>
            <option value="romance">Tình Cảm</option>
            <option value="comedy">Hài Hước</option>
          </select>

          <select className="filter-select">
            <option value="">Tất cả trạng thái</option>
            <option value="active">Đang chiếu</option>
            <option value="completed">Hoàn thành</option>
            <option value="upcoming">Sắp chiếu</option>
          </select>
        </div>
      </div>

      <div className="movies-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên phim</th>
              <th>Thể loại</th>
              <th>Trạng thái</th>
              <th>Số tập</th>
              <th>Lượt xem</th>
              <th>Đánh giá</th>
              <th>Ngày tạo</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map((movie) => (
              <tr key={movie.id}>
                <td>#{movie.id}</td>
                <td className="movie-title">{movie.title}</td>
                <td>{movie.category}</td>
                <td>
                  <span
                    className={`status ${
                      movie.status === "Đang chiếu"
                        ? "active"
                        : movie.status === "Hoàn thành"
                          ? "completed"
                          : "upcoming"
                    }`}
                  >
                    {movie.status}
                  </span>
                </td>
                <td>{movie.episodes}</td>
                <td>{movie.views}</td>
                <td>
                  <span className="rating">{movie.rating > 0 ? `⭐ ${movie.rating}` : "N/A"}</span>
                </td>
                <td>{movie.createdAt}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-action btn-view" title="Xem">
                      <Eye size={18} />
                    </button>
                    <button className="btn-action btn-edit" title="Sửa">
                      <Edit size={18} />
                    </button>
                    <button className="btn-action btn-delete" title="Xóa">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredMovies.length === 0 && (
          <div className="no-results">
            <p>Không tìm thấy phim nào</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMovies;

