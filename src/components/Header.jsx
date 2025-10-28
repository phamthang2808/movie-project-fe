import { ChevronDown, Search, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../assets/images/logo.png";
import "./Header.scss";

// ==========================================================
// BƯỚC 1: Đưa dữ liệu ra ngoài component cho tối ưu
// ==========================================================

// Dữ liệu cho menu "Thể loại"
const genresData = [
  "Anime",
  "Bí Ẩn",
  "Chiến Tranh",
  "Chiếu Rạp",
  "Chuyển Thể",
  "Chính Kịch",
  "Chính Luận",
  "Chính Trị",
  "Chương Trình Truyền Hình",
  "Concert Film",
  "Cung Đấu",
  "Cuối Tuần",
  "Cách Mạng",
  "Cổ Trang",
  "Cổ Tích",
  "Cổ Điển",
  "DC",
  "Disney",
  "Gay Cấn",
  "Gia Đình",
  "Giáng Sinh",
  "Giả Tưởng",
  "Hoang Cung",
  "Hoạt Hình",
  "Hài",
  "Hành Động",
  "Hình Sự",
  "Học Đường",
  "Khoa Học",
  "Kinh Dị",
  "Kinh Điển",
  "Kịch Nói",
  "Ký Ảo",
  "LGBT+",
  "Lãng Mạn",
  "Lịch Sử",
  "Live Action",
  "Marvel",
  "Miền Viễn Tây",
  "Nghề Nghiệp",
  "Người Mẫu",
  "Nhạc Kịch",
  "Phiêu Lư",
  "Phép Thuật",
  "Siêu Anh Hùng",
  "Thần Thoại",
  "Thể Thao",
  "Thiếu Nhi",
  "Truyền Hình Thực Tế",
  "Tuổi Trẻ",
  "Tài Liệu",
  "Tâm Lý",
  "Tình Cảm",
  "Tập Luyện",
  "Viễn Tưởng",
  "Võ Thuật",
  "Xuyên Không",
  "Đau Thương",
  "Đời Thường",
  "Ẩm Thực",
];

// Dữ liệu cho menu "Thêm"
const moreLinksData = [
  { title: "Lịch chiếu", path: "/lich-chieu" },
  { title: "Chủ đề", path: "/chu-de" },
  { title: "Diễn viên", path: "/dien-vien" },
];

// ==========================================================
// BẮT ĐẦU COMPONENT HEADER
// ==========================================================

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        {/* Left Section: Logo + Search */}
        <div className="header-left">
          <Link to="/" className="header-brand">
            <img
              src={logoImg}
              alt="ChillPhim Logo"
              className="logo-image"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div className="logo-icon">
              <div className="play-circle">
                <div className="play-triangle"></div>
              </div>
            </div>
          </Link>

          <form onSubmit={handleSearch} className="header-search">
            <div className="search-input-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm phim, diễn viên"
                className="search-input"
              />
            </div>
          </form>
        </div>

        {/* Middle Section: Navigation Links */}
        <div className="header-center">
          <div className="header-nav">
            <Link to="/movies/single" className="nav-link">
              Phim Lẻ
            </Link>
            <Link to="/phim-bo" className="nav-link">
              Phim Bộ
            </Link>

            {/* ================================================== */}
            {/* BƯỚC 2: SỬA LẠI DROPDOWN THỂ LOẠI */}
            {/* ================================================== */}
            <div className="nav-link-dropdown">
              <span className="nav-link">
                Thể loại <ChevronDown className="dropdown-icon" />
              </span>
              {/* Menu dropdown cho Thể loại */}
              <div className="dropdown-menu genres-dropdown">
                {genresData.map((genre) => (
                  <Link
                    key={genre}
                    to={`/genre/${encodeURIComponent(genre)}`}
                    className="dropdown-item"
                  >
                    {genre}
                  </Link>
                ))}
              </div>
            </div>
            {/* ================================================== */}

            <div className="nav-link-dropdown">
              <span className="nav-link">
                Quốc gia <ChevronDown className="dropdown-icon" />
              </span>
              {/* (Bạn có thể thêm menu cho Quốc gia ở đây) */}
            </div>

            <Link to="/trending" className="nav-link">
              Xem Chung
            </Link>

            {/* ================================================== */}
            {/* BƯỚC 3: SỬA LẠI DROPDOWN THÊM */}
            {/* ================================================== */}
            <div className="nav-link-dropdown">
              <span className="nav-link">
                Thêm <ChevronDown className="dropdown-icon" />
              </span>
              {/* Menu dropdown cho Thêm */}
              <div className="dropdown-menu more-dropdown">
                {moreLinksData.map((link) => (
                  <Link
                    key={link.title}
                    to={link.path}
                    className="dropdown-item"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
            {/* ================================================== */}
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="header-actions">
          {/* <div className="nav-link-special">NEW Rổ Bóng</div> */}
          {/* <div className="download-app"> ... </div> */}
          <Link to="/login" className="member-btn">
            <User className="user-icon" />
            Thành viên
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
