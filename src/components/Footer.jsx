import { ArrowUp, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import logoImg from "../assets/images/logo.png";
import flagIcon from "../assets/images/vn.jpg";
import "./Footer.scss";

const uiText = {
  "mo-ta":
    "ChillPhim - Xem phim ngon chill - Trang xem phim online chất lượng cao miễn phí Vietsub, thuyết minh, lồng tiếng full HD. Kho phim mới khổng lồ, phim chiếu rạp, phim bộ, phim lẻ từ nhiều quốc gia như Việt Nam, Hàn Quốc, Trung Quốc, Thái Lan, Nhật Bản, Âu Mỹ... đa dạng thể loại. Khám phá nền tảng phim trực tuyến hay nhất 2024 chất lượng 4K!",
  "ban-quyen": "© 2024 ChillPhim",
};

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      {/* THÊM 1 THẺ DIV BỌC BÊN NGOÀI */}
      <div className="footer-container">
        {/* Banner */}
        <div className="footer-banner">
          <img src={flagIcon} alt="Vietnam" className="flag-icon" />
          <span className="flag-text">
            Hoàng Sa & Trường Sa là của Việt Nam!
          </span>
        </div>

        {/* Logo and Brand */}
        <div className="footer-logo">
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
        </div>

        {/* Social Media */}
        <div className="footer-social">
          <a href="#" className="social-link" aria-label="Facebook">
            <Facebook />
          </a>
          <a href="#" className="social-link" aria-label="Twitter">
            <Twitter />
          </a>
          <a href="#" className="social-link" aria-label="Instagram">
            <Instagram />
          </a>
          <a href="#" className="social-link" aria-label="Youtube">
            <Youtube />
          </a>
        </div>

        {/* Description */}
        <div className="footer-description">
          <p>{uiText["mo-ta"]}</p>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p>{uiText["ban-quyen"]}</p>
          <p className="copyright-owner">Bản quyền thuộc về Thắng cá chép</p>
        </div>
      </div>
      {/* ĐÓNG THẺ DIV BỌC LẠI Ở ĐÂY */}

      {/* Back to Top Button (Nằm ngoài container) */}
      <button
        className="back-to-top"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ArrowUp className="arrow-icon" />
      </button>
    </footer>
  );
};

export default Footer;
