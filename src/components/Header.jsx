import { ChevronDown, Menu, Search, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../assets/images/logo.png";
import "./Header.scss";
import UserMenu from "./UserMenu";

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

// Dữ liệu cho menu "Quốc gia"
const countriesData = [
  "Anh",
  "Canada",
  "Hàn Quốc",
  "Hồng Kông",
  "Mỹ",
  "Nhật Bản",
  "Pháp",
  "Thái Lan",
  "Trung Quốc",
  "Úc",
  "Đài Loan",
  "Đức",
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check localStorage for token
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

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
        {/* Hamburger Menu Button (Mobile) */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

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
              {/* Menu dropdown cho Quốc gia */}
              <div className="dropdown-menu countries-dropdown">
                {countriesData.map((country) => (
                  <Link
                    key={country}
                    to={`/country/${encodeURIComponent(country)}`}
                    className="dropdown-item"
                  >
                    {country}
                  </Link>
                ))}
              </div>
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

          {/* Show UserMenu if logged in, otherwise show login button */}
          {isLoggedIn ? (
            <UserMenu />
          ) : (
            <Link to="/login" className="member-btn">
              <User className="user-icon" />
              Thành viên
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-header">
          <h2>Menu</h2>
          <button
            className="mobile-menu-close"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mobile-nav">
          <Link
            to="/movies/single"
            className="mobile-nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Phim Lẻ
          </Link>
          <Link
            to="/phim-bo"
            className="mobile-nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Phim Bộ
          </Link>

          <div className="mobile-nav-section">
            <h3 className="mobile-nav-section-title">Thể loại</h3>
            <div className="mobile-nav-grid">
              {genresData.slice(0, 12).map((genre) => (
                <Link
                  key={genre}
                  to={`/genre/${encodeURIComponent(genre)}`}
                  className="mobile-nav-item"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {genre}
                </Link>
              ))}
            </div>
          </div>

          <div className="mobile-nav-section">
            <h3 className="mobile-nav-section-title">Quốc gia</h3>
            <div className="mobile-nav-grid">
              {countriesData.map((country) => (
                <Link
                  key={country}
                  to={`/country/${encodeURIComponent(country)}`}
                  className="mobile-nav-item"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {country}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/trending"
            className="mobile-nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Xem Chung
          </Link>

          <div className="mobile-nav-section">
            <h3 className="mobile-nav-section-title">Thêm</h3>
            {moreLinksData.map((link) => (
              <Link
                key={link.title}
                to={link.path}
                className="mobile-nav-item"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
