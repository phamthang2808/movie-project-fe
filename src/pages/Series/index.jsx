import { Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import "./Series.scss";

import img05 from "../../assets/avar-film/086a7bc9b316bc3f9c2ff6d66ac65565.webp";
import img08 from "../../assets/avar-film/2e581b6555172571c49ef08119f5631a.webp";
import img11 from "../../assets/avar-film/2e96ceca88e057ff1969a128dfc5313d.webp";
import img12 from "../../assets/avar-film/3b94b724a4e3e771ef0050439e60189f.webp";
import img07 from "../../assets/avar-film/3fe1d3c8c7322bdc5c6fba7ecacc8c9f.webp";
import img01 from "../../assets/avar-film/489955f87e659835e0620e46b86fe20f.webp";
import img13 from "../../assets/avar-film/4b45a098954da4bf2722e9d57795e105.webp";
import img09 from "../../assets/avar-film/5f146da72268d7ce5449dcf2f8765454.webp";
import img06 from "../../assets/avar-film/6c9779087671f044479dec8f8e06ce28.webp";
import img10 from "../../assets/avar-film/85a2399375b56672c27f8c4ea0438ac7.webp";
import img14 from "../../assets/avar-film/87eb5583d2bdf6802e28e072f3fbd3eb.webp";
import img04 from "../../assets/avar-film/93bdf7e3dfd3a45031197779663334d9.webp";
import img03 from "../../assets/avar-film/a8464a65aa3dca06b00862be682b737b.webp";
import img15 from "../../assets/avar-film/b65793fc7a09710f0fa621587e2c9e86.webp";
import img16 from "../../assets/avar-film/b8d9e202ee4bfcb982931f907977a6f6.webp";
import img02 from "../../assets/avar-film/c1670542b444808113121af72ebf2520.webp";

const seriesData = [
  {
    id: 1,
    title: "Nhất Tiếu Tùy Ca",
    en: "Sword and Beloved",
    img: img01,
    rating: 8.5,
    year: 2025,
    season: 1,
    episodes: "Tập 36",
    currentEp: "Tập 36",
    status: "Hoàn tất",
  },
  {
    id: 2,
    title: "Hành Bộ Chồng Chéo",
    en: "Persona",
    img: img02,
    rating: 7.8,
    year: 2024,
    season: 1,
    episodes: "Tập 4",
    currentEp: "Tập 4",
    status: "Hoàn tất",
  },
  {
    id: 3,
    title: "Thiên Địa Kiếm Tâm",
    en: "Sword and Beloved",
    img: img03,
    rating: 8.2,
    year: 2024,
    season: 1,
    episodes: "Tập 19",
    currentEp: "Tập 19",
    status: "Đang cập nhật",
  },
  {
    id: 4,
    title: "Thủy Long Ngâm",
    en: "Whispers of Fate",
    img: img04,
    rating: 7.9,
    year: 2024,
    season: 1,
    episodes: "Tập 11",
    currentEp: "Tập 11",
    status: "Đang cập nhật",
  },
  {
    id: 5,
    title: "Thí Khanh Ý",
    en: "In The Name of Loyalty",
    img: img05,
    rating: 8.0,
    year: 2024,
    season: 1,
    episodes: "Tập 6",
    currentEp: "Tập 6",
    status: "Đang cập nhật",
  },
  {
    id: 6,
    title: "Ám Hà Truyền",
    en: "Blood River",
    img: img06,
    rating: 7.5,
    year: 2024,
    season: 1,
    episodes: "Tập 9",
    currentEp: "Tập 9",
    status: "Đang cập nhật",
  },
  {
    id: 7,
    title: "Hãy Lấy Em Đi",
    en: "Would You Marry Me?",
    img: img07,
    rating: 8.3,
    year: 2024,
    season: 1,
    episodes: "Tập 11",
    currentEp: "Tập 11",
    status: "Đang cập nhật",
  },
  {
    id: 8,
    title: "Nhật Tiêu Túy Ca",
    en: "Ms. Incognito",
    img: img08,
    rating: 7.7,
    year: 2024,
    season: 1,
    episodes: "Tập 32",
    currentEp: "Tập 32",
    status: "Hoàn tất",
  },
  {
    id: 9,
    title: "Thần Đền Ơi, Ước Đi",
    en: "Genie, Make a Wish",
    img: img09,
    rating: 8.1,
    year: 2024,
    season: 1,
    episodes: "Tập 13",
    currentEp: "Tập 13",
    status: "Hoàn tất",
  },
  {
    id: 10,
    title: "Ngự Tiên Quý Sư Lục",
    en: "Tales of Five Immortals",
    img: img10,
    rating: 7.6,
    year: 2024,
    season: 1,
    episodes: "Tập 24",
    currentEp: "Tập 24",
    status: "Hoàn tất",
  },
  {
    id: 11,
    title: "Hồng Lâu Mộng",
    en: "Dream of the Red Chamber",
    img: img11,
    rating: 9.0,
    year: 2024,
    season: 1,
    episodes: "Tập 40",
    currentEp: "Tập 40",
    status: "Hoàn tất",
  },
  {
    id: 12,
    title: "Tam Sinh Tam Thế",
    en: "Eternal Love",
    img: img12,
    rating: 8.4,
    year: 2024,
    season: 1,
    episodes: "Tập 58",
    currentEp: "Tập 58",
    status: "Hoàn tất",
  },
  {
    id: 13,
    title: "Diên Hy Công Lược",
    en: "Story of Yanxi Palace",
    img: img13,
    rating: 8.7,
    year: 2024,
    season: 1,
    episodes: "Tập 70",
    currentEp: "Tập 70",
    status: "Hoàn tất",
  },
  {
    id: 14,
    title: "Như Ý Truyện",
    en: "Ruyi's Royal Love",
    img: img14,
    rating: 8.2,
    year: 2024,
    season: 1,
    episodes: "Tập 87",
    currentEp: "Tập 87",
    status: "Hoàn tất",
  },
  {
    id: 15,
    title: "Phù Dao",
    en: "Legend of Fuyao",
    img: img15,
    rating: 7.9,
    year: 2024,
    season: 1,
    episodes: "Tập 66",
    currentEp: "Tập 66",
    status: "Hoàn tất",
  },
  {
    id: 16,
    title: "Minh Lan Truyện",
    en: "The Story of Minglan",
    img: img16,
    rating: 8.6,
    year: 2024,
    season: 1,
    episodes: "Tập 78",
    currentEp: "Tập 78",
    status: "Hoàn tất",
  },
];

const uiText = {
  "tieu-de-trang": "Phim Bộ",
  "mo-ta": "Danh sách phim bộ hot nhất hiện nay",
  phan: "Phần",
  "trang-thai": "Trạng thái:",
  nam: "Năm:",
};

const Series = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // 12 phim mỗi trang

  // Tính toán pagination
  const totalPages = Math.ceil(seriesData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSeries = seriesData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="series-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">{uiText["tieu-de-trang"]}</h1>
          <p className="page-description">{uiText["mo-ta"]}</p>
        </div>

        <div className="series-grid">
          {currentSeries.map((series) => (
            <Link
              to={`/movie/${series.id}`}
              key={series.id}
              className="series-card"
            >
              <div className="series-poster">
                <img src={series.img} alt={series.title} loading="lazy" />
                <div className="series-overlay">
                  <div className="series-info-hover">
                    <div className="rating">
                      <Star size={16} />
                      {series.rating}
                    </div>
                    <div className="episodes-badge">{series.currentEp}</div>
                  </div>
                </div>
                {series.status === "Hoàn tất" && (
                  <div className="status-badge complete">Hoàn tất</div>
                )}
                {series.status === "Đang cập nhật" && (
                  <div className="status-badge updating">Đang cập nhật</div>
                )}
              </div>
              <div className="series-details">
                <h3 className="series-title">{series.title}</h3>
                <p className="series-original">{series.en}</p>
                <div className="series-meta">
                  <span className="meta-item">
                    {uiText.phan} {series.season}
                  </span>
                  <span className="meta-separator">•</span>
                  <span className="meta-item">{series.episodes}</span>
                  <span className="meta-separator">•</span>
                  <span className="meta-item">{series.year}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          maxVisible={5}
          showFirstLast={true}
        />
      </div>
    </div>
  );
};

export default Series;
