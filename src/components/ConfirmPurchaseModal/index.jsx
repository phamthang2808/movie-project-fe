import { Check, X } from "lucide-react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../../utils/notification";
import "./ConfirmPurchaseModal.scss";

const ConfirmPurchaseModal = ({ isOpen, onClose, onConfirm, plan, user }) => {
  const navigate = useNavigate();

  if (!isOpen || !plan) return null;

  const handleConfirm = () => {
    // Kiểm tra số dư
    const currentBalance = user?.balance || 0;
    const planPrice = plan.price;

    if (currentBalance < planPrice) {
      // Không đủ tiền - thông báo và chuyển đến trang nạp tiền
      showError(
        "Số dư không đủ",
        `Vui lòng nạp thêm ${(planPrice - currentBalance).toLocaleString(
          "vi-VN"
        )} VND vào tài khoản`
      );
      onClose();
      setTimeout(() => {
        navigate("/recharge");
      }, 1500);
      return;
    }

    // Đủ tiền - trừ tiền và nâng cấp VIP
    const newBalance = currentBalance - planPrice;

    // Tính ngày hết hạn VIP
    const today = new Date();
    const vipEndDate = new Date(today);
    const months = parseInt(plan.duration);
    vipEndDate.setMonth(vipEndDate.getMonth() + months);

    // Cập nhật thông tin user
    const updatedUser = {
      ...user,
      balance: newBalance,
      isPremium: true,
      vipEndDate: vipEndDate.toISOString(),
      vipPlan: plan.duration,
    };

    // Lưu vào localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // Trigger custom event để các component khác cập nhật ngay lập tức
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("userUpdated"));

    // Thông báo thành công
    showSuccess(
      "Nâng cấp thành công!",
      `Bạn đã nâng cấp lên gói VIP ${
        plan.duration
      }. Số dư còn lại: ${newBalance.toLocaleString("vi-VN")} VND`
    );

    // Gọi callback và đóng modal
    onConfirm();
    onClose();

    // Reload trang để cập nhật UI
    setTimeout(() => {
      window.location.reload();
    }, 1000);
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

          {/* Current Balance */}
          <div className="balance-section">
            <div className="balance-row">
              <span className="balance-label">Số dư hiện tại</span>
              <span className="balance-value">
                {(user?.balance || 0).toLocaleString("vi-VN")} VND
              </span>
            </div>
            {user?.balance < plan.price && (
              <p className="insufficient-balance">
                ⚠️ Số dư không đủ. Vui lòng nạp thêm{" "}
                {(plan.price - (user?.balance || 0)).toLocaleString("vi-VN")}{" "}
                VND
              </p>
            )}
          </div>

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
  user: PropTypes.object,
};

export default ConfirmPurchaseModal;
