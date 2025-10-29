import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import PropTypes from "prop-types";
import "./Pagination.scss";

/**
 * Pagination Component
 * Component phân trang có thể tái sử dụng
 */
const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  maxVisible = 5, // Số trang hiển thị tối đa
  showFirstLast = true, // Hiển thị nút đầu/cuối
}) => {
  // Không hiển thị pagination nếu chỉ có 1 trang
  if (totalPages <= 1) return null;

  // Tính toán các trang cần hiển thị
  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    // Điều chỉnh startPage nếu endPage đã chạm giới hạn
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePageClick = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="pagination-container">
      <div className="pagination">
        {/* First Page Button */}
        {showFirstLast && currentPage > 1 && (
          <button
            className="pagination-btn first-btn"
            onClick={() => handlePageClick(1)}
            aria-label="Trang đầu"
          >
            <ChevronsLeft size={18} />
          </button>
        )}

        {/* Previous Button */}
        <button
          className={`pagination-btn prev-btn ${
            currentPage === 1 ? "disabled" : ""
          }`}
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Trang trước"
        >
          <ChevronLeft size={18} />
          <span className="btn-text">Trước</span>
        </button>

        {/* Page Numbers */}
        <div className="pagination-numbers">
          {/* Show "..." if not starting from page 1 */}
          {pageNumbers[0] > 1 && (
            <>
              <button
                className="pagination-number"
                onClick={() => handlePageClick(1)}
              >
                1
              </button>
              {pageNumbers[0] > 2 && (
                <span className="pagination-ellipsis">...</span>
              )}
            </>
          )}

          {/* Main page numbers */}
          {pageNumbers.map((page) => (
            <button
              key={page}
              className={`pagination-number ${
                page === currentPage ? "active" : ""
              }`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          ))}

          {/* Show "..." if not ending at last page */}
          {pageNumbers[pageNumbers.length - 1] < totalPages && (
            <>
              {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                <span className="pagination-ellipsis">...</span>
              )}
              <button
                className="pagination-number"
                onClick={() => handlePageClick(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* Next Button */}
        <button
          className={`pagination-btn next-btn ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Trang sau"
        >
          <span className="btn-text">Sau</span>
          <ChevronRight size={18} />
        </button>

        {/* Last Page Button */}
        {showFirstLast && currentPage < totalPages && (
          <button
            className="pagination-btn last-btn"
            onClick={() => handlePageClick(totalPages)}
            aria-label="Trang cuối"
          >
            <ChevronsRight size={18} />
          </button>
        )}
      </div>

      {/* Page Info */}
      <div className="pagination-info">
        Trang <span className="current">{currentPage}</span> / {totalPages}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  maxVisible: PropTypes.number,
  showFirstLast: PropTypes.bool,
};

export default Pagination;
