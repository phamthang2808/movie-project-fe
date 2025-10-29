import { Check, X } from "lucide-react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./ConfirmPurchaseModal.scss";

const ConfirmPurchaseModal = ({ isOpen, onClose, onConfirm, plan }) => {
  const navigate = useNavigate();

  if (!isOpen || !plan) return null;

  const handleConfirm = () => {
    onConfirm();
    // Navigate to recharge page
    navigate("/recharge");
  };

  // Tính ngày bắt đầu và kết thúc
  const getDateInfo = () => {
    const today = new Date();
    const startDate = new Date(today);
    const endDate = new Date(today);

    // Lấy số tháng từ duration (ví dụ: "6 tháng" -> 6)
    const months = parseInt(plan.duration);
    endDate.setMonth(endDate.getMonth() + months);

    // Format ngày: DD/MM/YYYY
    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    return {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    };
  };

  const { startDate, endDate } = getDateInfo();

  return (
    <>
      {/* Backdrop */}
      <div className="confirm-purchase-backdrop" onClick={onClose} />

      {/* Modal */}
      <div className="confirm-purchase-modal">
        {/* Close Button */}
        <button className="confirm-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="confirm-title">Xác nhận</h2>

        {/* Content */}
        <div className="confirm-content">
          <p className="confirm-text">
            Bạn đang chọn gói{" "}
            <span className="highlight-package">RoX {plan.duration}</span>{" "}
            <span className="highlight-price">
              ({plan.price.toLocaleString("vi-VN")} VND)
            </span>
          </p>

          <div className="date-info">
            <p className="date-row">
              <span className="date-label">Bắt đầu</span>
              <span className="date-value">{startDate}</span>
            </p>
            <p className="date-row">
              <span className="date-label">Hết hạn</span>
              <span className="date-value">{endDate}</span>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="confirm-actions">
          <button className="confirm-btn agree-btn" onClick={handleConfirm}>
            <Check size={18} />
            Đồng ý
          </button>
          <button className="confirm-btn cancel-btn" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </>
  );
};

ConfirmPurchaseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  plan: PropTypes.object,
};

export default ConfirmPurchaseModal;
