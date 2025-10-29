import { Heart, Info, Play, Star } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.scss";

import featured1 from "../assets/images/1.jpg";
import featured2 from "../assets/images/2.webp";
import featured3 from "../assets/images/3.webp";
import featured4 from "../assets/images/4.webp";
import featured5 from "../assets/images/5.webp";
import featured6 from "../assets/images/6.webp";

import img05 from "../assets/avar-film/086a7bc9b316bc3f9c2ff6d66ac65565.webp";
import img08 from "../assets/avar-film/2e581b6555172571c49ef08119f5631a.webp";
import img11 from "../assets/avar-film/2e96ceca88e057ff1969a128dfc5313d.webp";
import img12 from "../assets/avar-film/3b94b724a4e3e771ef0050439e60189f.webp";
import img07 from "../assets/avar-film/3fe1d3c8c7322bdc5c6fba7ecacc8c9f.webp";
import img01 from "../assets/avar-film/489955f87e659835e0620e46b86fe20f.webp";
import img13 from "../assets/avar-film/4b45a098954da4bf2722e9d57795e105.webp";
import img09 from "../assets/avar-film/5f146da72268d7ce5449dcf2f8765454.webp";
import img06 from "../assets/avar-film/6c9779087671f044479dec8f8e06ce28.webp";
import img10 from "../assets/avar-film/85a2399375b56672c27f8c4ea0438ac7.webp";
import img14 from "../assets/avar-film/87eb5583d2bdf6802e28e072f3fbd3eb.webp";
import img04 from "../assets/avar-film/93bdf7e3dfd3a45031197779663334d9.webp";
import img03 from "../assets/avar-film/a8464a65aa3dca06b00862be682b737b.webp";
import imgAnime from "../assets/avar-film/anime.webp";
import img15 from "../assets/avar-film/b65793fc7a09710f0fa621587e2c9e86.webp";
import img16 from "../assets/avar-film/b8d9e202ee4bfcb982931f907977a6f6.webp";
import img02 from "../assets/avar-film/c1670542b444808113121af72ebf2520.webp";
import img17 from "../assets/avar-film/de20f19c9485ac49476ac3ece58ca529.webp";
import img18 from "../assets/avar-film/e0e7a3ee03d063b012e807f07472aef1.webp";
import img19 from "../assets/avar-film/e7757c08b2aaae549da473fb89ce0ce0.webp";
import img20 from "../assets/avar-film/ea27169c2c1648e3847b98e344024b72.webp";

const featuredMoviesData = [
  {
    id: 1,
    title: "Nhất Tiếu Tùy Ca",
    original_title: "Nhất Tiếu Tùy Ca",
    backdrop_path: featured1,
    poster_path: featured1,
    overview:
      "Nữ tướng quân Phó Nhất Tiếu (Lý Thấm) và hoàng tử Túc Sa Phượng Tùy Ca (Trần Triết Viễn) vốn là kẻ thù không đội trời chung. Sau một biến cố, cả hai bất đắc dĩ phải hợp tác, từ đó dần nảy sinh tình cảm, cùng nhau vượt qua thù hận và âm mưu.",
    release_date: "2025-10-02",
    runtime: 45,
    vote_average: 8.5,
    genres: [
      { id: 1, name: "Cổ Trang" },
      { id: 2, name: "Tình Cảm" },
      { id: 3, name: "Hành Động" },
      { id: 4, name: "Chuyển Thể" },
      { id: 5, name: "Chính Kịch" },
    ],
  },
  {
    id: 2,
    title: "Trăm Dăm Tử Thần",
    original_title: "The Long Walk",
    backdrop_path: featured2,
    poster_path: featured2,
    overview:
      'Dựa trên cuốn tiểu thuyết cùng tên của tác giả tiểu thuyết Stephen King. "Trăm Dăm Tử Thần" xoay quanh một nhóm thiếu niên tham gia một cuộc thi... Nếu không, họ sẽ bị loại khỏi cuộc chơi, vĩnh viễn.',
    release_date: "2025",
    runtime: 108,
    vote_average: 7.0,
    genres: [
      { id: 1, name: "Chiếu Rạp" },
      { id: 2, name: "Gay Cấn" },
      { id: 3, name: "Kinh Dị" },
      { id: 4, name: "Khoa Học" },
      { id: 5, name: "Chuyển Thể" },
      { id: 6, name: "Phiêu Lưu" },
    ],
  },
  {
    id: 3,
    title: "TRON: Trò Chơi Ảo Giác ARES",
    original_title: "TRON: Ares",
    backdrop_path: featured3,
    poster_path: featured3,
    overview:
      "Trò Chơi Ảo Giác (TRON: Ares) theo chân Ares... một thực thể ảo di chuyển từ thế giới số đến thế giới thực trong một nhiệm vụ nguy hiểm, báo hiệu cuộc xâm lấn của trí tuệ nhân tạo...",
    release_date: "2025",
    runtime: 89,
    vote_average: 6.6,
    genres: [
      { id: 1, name: "Hành Động" },
      { id: 2, name: "Chiếu Rạp" },
      { id: 3, name: "Khoa Học" },
      { id: 4, name: "Phiêu Lưu" },
      { id: 5, name: "Giả Tưởng" },
    ],
  },
  {
    id: 4,
    title: "Hoa Hồng Có Gai",
    original_title: "The Roses",
    backdrop_path: featured4,
    poster_path: featured4,
    overview:
      "Cuộc sống của Ivy và Theo (Những bông hồng) hoàn hảo... Nhưng đằng sau vẻ ngoài hào nhoáng là những mâu thuẫn rạn nứt,... sự nghiệp của Theo tuột dốc trong khi Ivy thăng hoa...",
    release_date: "2025",
    runtime: 101,
    vote_average: 6.8,
    genres: [
      { id: 1, name: "Chính Kịch" },
      { id: 2, name: "Chiếu Rạp" },
      { id: 3, name: "Tâm Lý" },
      { id: 4, name: "Gia Đình" },
      { id: 5, name: "Hài" },
      { id: 6, name: "Lãng Mạn" },
    ],
  },
  {
    id: 5,
    title: "Tin Tốt Lành",
    original_title: "Good News",
    backdrop_path: featured5,
    poster_path: featured5,
    overview:
      "Khi bọn không tặc không chế một chuyến bay của Nhật Bản và yêu cầu bay tới Triều Tiên, một cựu điệp viên trên máy bay phải hành động. Anh ta phải tìm ra cách vô hiệu hóa máy bay và cứu các hành khách.",
    release_date: "2025",
    runtime: 131,
    vote_average: 6.5,
    genres: [
      { id: 1, name: "Hành Động" },
      { id: 2, name: "Gay Cấn" },
      { id: 3, name: "Gia Đình" },
      { id: 4, name: "Hồi Hộp" },
      { id: 5, name: "Phiêu Lưu" },
    ],
  },
  {
    id: 6,
    title: "Hành Trình Rực Rỡ Ta Đã Yêu",
    original_title: "A Big Bold Beautiful Journey",
    backdrop_path: featured6,
    poster_path: featured6,
    overview:
      "Điều gì sẽ xảy ra nếu bạn có thể mở một cánh cửa và bước qua để sống sót một khoảnh khắc khác trong quá khứ? Sarah (Margot Robbie) và David (Colin Farrell) là hai người độc thân xa lạ tình cờ gặp nhau qua một người bạn chung. Không lâu sau, qua một bước ngoặt bất ngờ...",
    release_date: "2025",
    runtime: 109,
    vote_average: 6.0,
    genres: [
      { id: 1, name: "Chính Kịch" },
      { id: 2, name: "Chiếu Rạp" },
      { id: 3, name: "Tâm Lý" },
      { id: 4, name: "Thần Thoại" },
      { id: 5, name: "Lãng Mạn" },
      { id: 6, name: "Viễn Tưởng" },
    ],
  },
];

const uiText = {
  sections: {
    topicsTitle: "Bạn đang quan tâm gì?",
    topicLink: "Xem chủ đề →",
    chineseMovies: "Phim Trung Quốc mới",
    westernMovies: "Phim Âu Mỹ mới",
    cartoons: "Hoạt hình mới",
    top10Singles: "Top 10 Phim lẻ hôm nay",
    animeVault: "Kho Tàng Anime Mới Nhất",
    seeAll: "Xem toàn bộ →",
  },
  buttons: {
    play: "Phát",
    watchNow: "Xem ngay",
    addList: "Thêm vào danh sách",
    moreInfo: "Thông tin",
  },
};

const Home = () => {
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState(featuredMoviesData[0]);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const quickTopics = [
    { title: "Marvel", color: "#1E2F97", path: "/chu-de/marvel" },
    { title: "4K", color: "#4B4A6A", path: "/chu-de/4k" },
    { title: "Sitcom", color: "#1E5E50", path: "/chu-de/sitcom" },
    {
      title: "Lồng Tiếng Cực Mạnh",
      color: "#3C2C5D",
      path: "/chu-de/long-tieng",
    },
    { title: "Xuyên Không", color: "#6A3B28", path: "/chu-de/xuyen-khong" },
    { title: "Cổ Trang", color: "#6B2525", path: "/chu-de/co-trang" },
  ];

  const newCn = [
    {
      id: 1,
      title: "Ám Hạ Truyền",
      en: "Blood River",
      ep: "PĐ. 3",
      img: img01,
    },
    {
      id: 2,
      title: "Nhất Dạ Nhiệt Huyết",
      en: "Age of Passion",
      ep: "PĐ. 4",
      img: img02,
    },
    { id: 3, title: "Nhật Thực", en: "Eclipse", ep: "PĐ. 5", img: img03 },
    { id: 4, title: "Vết Chân", en: "Footprints", ep: "PĐ. 6", img: img04 },
    {
      id: 5,
      title: "Thái Hậu Cổ Hý",
      en: "Second Spring",
      ep: "PĐ. 7",
      img: img05,
    },
  ];

  const newUsUk = [
    {
      id: 11,
      title: "Ông Trùm Giang Hồ",
      en: "Tulsa King",
      ep: "PĐ. 1",
      img: img06,
    },
    {
      id: 12,
      title: "Sở Cảnh Sát Boston",
      en: "Boston Blue",
      ep: "PĐ. 2",
      img: img07,
    },
    {
      id: 13,
      title: "IT: Chào Mừng Tới Derry",
      en: "Welcome to Derry",
      ep: "PĐ. 3",
      img: img08,
    },
    {
      id: 14,
      title: "Sát Nhân Trong Tòa Nhà",
      en: "Only Murders in the Building",
      ep: "PĐ. 4",
      img: img09,
    },
    {
      id: 15,
      title: "Vương Quyền David",
      en: "House of David",
      ep: "PĐ. 5",
      img: img10,
    },
  ];

  const cartoonNew = [
    {
      id: 200,
      title: "Chú Bé Gió",
      en: "Boy of the Wind",
      img: img11,
      ep: "PĐ. 1",
    },
    {
      id: 201,
      title: "Vũ Khúc Rừng Sâu",
      en: "Forest Rhapsody",
      img: img12,
      ep: "PĐ. 2",
    },
    {
      id: 202,
      title: "Thái Hậu Cổ Hý",
      en: "Empress Returns",
      img: img13,
      ep: "PĐ. 3",
    },
    {
      id: 203,
      title: "Hải Trình",
      en: "Grand Voyage",
      img: img14,
      ep: "PĐ. 4",
    },
    {
      id: 204,
      title: "Thám Hiểm Bầu Trời",
      en: "Sky Adventurer",
      img: img15,
      ep: "PĐ. 5",
    },
    {
      id: 205,
      title: "Thế Giới Lá",
      en: "Leafy World",
      img: img16,
      ep: "PĐ. 6",
    },
    {
      id: 206,
      title: "Dòng Chảy Ký Ức",
      en: "Stream of Memories",
      img: img17,
      ep: "PĐ. 7",
    },
    {
      id: 207,
      title: "Nhà Phù Thủy Nhỏ",
      en: "Little Witch",
      img: img18,
      ep: "PĐ. 8",
    },
    {
      id: 208,
      title: "Thành Phố Màu Sắc",
      en: "City of Colors",
      img: img19,
      ep: "PĐ. 9",
    },
    {
      id: 209,
      title: "Học Viện Anh Hùng",
      en: "Hero Academy",
      img: img20,
      ep: "PĐ. 10",
    },
  ];

  const top10Singles = [
    { id: 300, title: "Cậu Bé Gió", en: "Wind Boy", img: img01, rating: "8.0" },
    {
      id: 301,
      title: "Vũ Khúc Lá Thu",
      en: "Autumn Waltz",
      img: img02,
      rating: "7.9",
    },
    {
      id: 302,
      title: "Cẩm Y Chi Sắc",
      en: "Silk & Blade",
      img: img03,
      rating: "7.8",
    },
    {
      id: 303,
      title: "Nhật Thực Đỏ",
      en: "Crimson Eclipse",
      img: img04,
      rating: "7.7",
    },
    {
      id: 304,
      title: "Thợ Săn Bóng Đêm",
      en: "Night Stalker",
      img: img05,
      rating: "7.6",
    },
    {
      id: 305,
      title: "Những Kẻ Lánh Đời",
      en: "The Outliers",
      img: img06,
      rating: "7.5",
    },
    {
      id: 306,
      title: "Lữ Khách Mặt Trời",
      en: "Sun Wanderer",
      img: img07,
      rating: "7.4",
    },
    { id: 307, title: "Vệt Chân", en: "Footprints", img: img08, rating: "7.3" },
    { id: 308, title: "Hải Vân", en: "Ocean Crest", img: img09, rating: "7.2" },
    {
      id: 309,
      title: "Nhà Thờ Bóng Tối",
      en: "Shadow Cathedral",
      img: img10,
      rating: "7.1",
    },
  ];

  const [vaultIndex, setVaultIndex] = useState(0);
  const vaultItems = [
    { id: 400, title: "One Piece", img: img01 },
    { id: 401, title: "Naruto", img: img02 },
    { id: 402, title: "Bleach", img: img03 },
    { id: 403, title: "Dragon Ball", img: img04 },
    { id: 404, title: "Attack on Titan", img: img05 },
    { id: 405, title: "My Hero Academia", img: img06 },
    { id: 406, title: "Demon Slayer", img: img07 },
    { id: 407, title: "Jujutsu Kaisen", img: img08 },
    { id: 408, title: "Tokyo Ghoul", img: img09 },
    { id: 409, title: "Fullmetal Alchemist", img: img10 },
    { id: 410, title: "Death Note", img: img11 },
    { id: 411, title: "Sword Art Online", img: img12 },
    { id: 412, title: "Hunter x Hunter", img: img13 },
    { id: 413, title: "Black Clover", img: img14 },
    { id: 414, title: "Fairy Tail", img: img15 },
    { id: 415, title: "One Punch Man", img: img16 },
  ];
  const animeVault = {
    title: "Đảo Hải Tặc",
    nameEn: "One Piece",
    overview:
      "Tổng hợp anime mới nhất. Dữ liệu hiển thị minh hoạ từ bộ sưu tập ảnh local.",
    backdrop: imgAnime,
    chips: ["Hành Động", "Gay Cấn", "Anime", "Hài", "Hoạt Hình"],
    list: vaultItems,
  };

  // Add a small key that changes when selectedMovie changes to trigger CSS animation
  const animatedKey = selectedMovie?.id || 0;

  return (
    <div className="home">
      <div className="container">
        {/* Featured Movie Hero Section */}
        {selectedMovie && (
          <section className="featured-section">
            {/* Large Background Image */}
            <div
              className="featured-backdrop animate"
              style={{
                "--featured-bg": selectedMovie.backdrop_path
                  ? `url(${selectedMovie.backdrop_path})`
                  : "none",
              }}
              key={`backdrop-${animatedKey}`}
            >
              <div className="backdrop-overlay"></div>
            </div>

            {/* Movie Info */}
            <div
              className="featured-content animate"
              key={`text-${animatedKey}`}
            >
              <h1 className="featured-title">{selectedMovie.title}</h1>
              {selectedMovie.original_title !== selectedMovie.title && (
                <p className="featured-original-title">
                  {selectedMovie.original_title}
                </p>
              )}

              {/* Meta Info */}
              <div className="featured-meta">
                <div className="meta-badge">
                  <Star className="meta-icon" />
                  <span>IMDb {selectedMovie.vote_average?.toFixed(1)}</span>
                </div>
                <div className="meta-badge">T18</div>
                <div className="meta-badge">
                  {new Date(selectedMovie.release_date).getFullYear()}
                </div>
                <div className="meta-badge">{selectedMovie.runtime}m</div>
              </div>

              {/* Genres */}
              <div className="featured-genres">
                {selectedMovie.genres?.map((genre) => (
                  <span key={genre.id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="featured-description">{selectedMovie.overview}</p>

              {/* Action Buttons */}
              <div className="featured-actions">
                <button
                  type="button"
                  className="action-btn play-btn"
                  onClick={() => navigate("/movie")}
                >
                  <Play className="action-icon" />
                  <span>{uiText.buttons.play}</span>
                </button>
                <button className="action-btn icon-btn">
                  <Heart className="action-icon" />
                </button>
                <Link
                  to={`/movie/${selectedMovie.id}`}
                  className="action-btn icon-btn"
                >
                  <Info className="action-icon" />
                </Link>
              </div>

              {/* Thumbnail Strip */}
              <div className="thumbnail-strip">
                {featuredMoviesData.map((movie) => (
                  <div
                    key={movie.id}
                    className={`thumbnail-item ${
                      selectedMovie?.id === movie.id ? "active" : ""
                    }`}
                    onClick={() => handleMovieSelect(movie)}
                  >
                    <img
                      src={movie.poster_path}
                      alt={movie.title}
                      className="thumbnail-image"
                    />
                    <div className="thumbnail-overlay">
                      <Play className="thumbnail-play-icon" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Quick Topics Section */}
        <section className="topics-section">
          <h2 className="topics-title">{uiText.sections.topicsTitle}</h2>
          <div className="topic-grid">
            {quickTopics.map((t) => (
              <a
                key={t.title}
                className="topic-card"
                href={t.path}
                style={{ "--topic-color": t.color }}
              >
                <div className="topic-content">
                  <h3 className="topic-name">{t.title}</h3>
                  <span className="topic-link">
                    {uiText.sections.topicLink}
                  </span>
                </div>
              </a>
            ))}
            <a
              href="/topics"
              className="topic-card topic-more"
              style={{ "--topic-color": "#2a2a3e" }}
            >
              <div className="topic-content">
                <h3 className="topic-name">+4 chủ đề</h3>
              </div>
            </a>
          </div>
        </section>

        <section className="row-catalog">
          <div className="row-head">
            <div className="row-title">{uiText.sections.cartoons}</div>
            <a className="row-link" href="#">
              {uiText.sections.seeAll}
            </a>
          </div>
          <div className="poster-grid">
            {cartoonNew.map((m) => (
              <a key={m.id} className="poster-card" href="#">
                <div className="poster-thumb">
                  <img src={m.img} alt={m.title} />
                  <span className="poster-ep">{m.ep}</span>
                </div>
                <div className="poster-meta">
                  <div className="poster-title">{m.title}</div>
                  <div className="poster-sub">{m.en}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Top 10 Phim lẻ hôm nay */}
        <section className="row-catalog">
          <div className="row-head">
            <div className="row-title">{uiText.sections.top10Singles}</div>
            <a className="row-link" href="#">
              {uiText.sections.seeAll}
            </a>
          </div>
          <div className="poster-grid">
            {top10Singles.map((m, idx) => (
              <a key={m.id} className="poster-card" href="#">
                <div className="poster-thumb">
                  <img src={m.img} alt={m.title} />
                  <span className="poster-ep">#{idx + 1}</span>
                </div>
                <div className="poster-meta">
                  <div className="poster-title">{m.title}</div>
                  <div className="poster-sub">
                    {m.en} · IMDb {m.rating}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Kho tàng Anime mới nhất */}
        <section className="anime-vault">
          <div
            className="anime-vault-backdrop"
            style={{ "--anime-bg": `url(${animeVault.backdrop})` }}
          >
            <div className="anime-vault-overlay"></div>
            <div className="anime-vault-content">
              <h2 className="vault-title">{uiText.sections.animeVault}</h2>
              <h3 className="vault-hero">{animeVault.title}</h3>
              <p className="vault-overview">{animeVault.overview}</p>
              <div className="vault-chips">
                {animeVault.chips.map((c) => (
                  <span key={c} className="vault-chip">
                    {c}
                  </span>
                ))}
              </div>

              <div className="vault-strip">
                {animeVault.list.map((a, i) => (
                  <button
                    type="button"
                    className="vault-item"
                    key={a.id}
                    onClick={() => setVaultIndex(i)}
                    title={a.title}
                  >
                    <img src={a.img} alt={a.title} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Hardcoded New CN Dramas */}
        <section className="row-catalog">
          <div className="row-head">
            <div className="row-title">{uiText.sections.chineseMovies}</div>
            <a className="row-link" href="#">
              {uiText.sections.seeAll}
            </a>
          </div>
          <div className="poster-grid">
            {newCn.map((m) => (
              <a key={m.id} className="poster-card" href="#">
                <div className="poster-thumb">
                  <img src={m.img} alt={m.title} />
                  <span className="poster-ep">{m.ep}</span>
                </div>
                <div className="poster-meta">
                  <div className="poster-title">{m.title}</div>
                  <div className="poster-sub">{m.en}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Hardcoded New US-UK */}
        <section className="row-catalog">
          <div className="row-head">
            <div className="row-title">{uiText.sections.westernMovies}</div>
            <a className="row-link" href="#">
              {uiText.sections.seeAll}
            </a>
          </div>
          <div className="poster-grid">
            {newUsUk.map((m) => (
              <a key={m.id} className="poster-card" href="#">
                <div className="poster-thumb">
                  <img src={m.img} alt={m.title} />
                  <span className="poster-ep">{m.ep}</span>
                </div>
                <div className="poster-meta">
                  <div className="poster-title">{m.title}</div>
                  <div className="poster-sub">2025</div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
