import { Check, CreditCard, X } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import ConfirmPurchaseModal from "./ConfirmPurchaseModal";
import "./PricingModal.scss";
import SafeAvatar from "./SafeAvatar";

const pricingPlans = [
  {
    id: 1,
    duration: "1 tháng",
    price: 39000,
    originalPrice: null,
    discount: null,
    features: [
      "Tắt quảng cáo",
      "Xem phim chất lượng 4K",
      "Chat không cần chờ",
      "Chat sử dụng stickers và Gifs",
      "Tải lên ảnh đại diện của bạn",
      "Tên được gán nhãn ROX",
    ],
  },
  {
    id: 2,
    duration: "6 tháng",
    price: 189000,
    originalPrice: 234000,
    discount: "19%",
    popular: true,
    features: [
      "Tắt quảng cáo",
      "Xem phim chất lượng 4K",
      "Chat không cần chờ",
      "Chat sử dụng stickers và Gifs",
      "Tải lên ảnh đại diện của bạn",
      "Tên được gán nhãn ROX",
    ],
  },
  {
    id: 3,
    duration: "12 tháng",
    price: 339000,
    originalPrice: 468000,
    discount: "28%",
    features: [
      "Tắt quảng cáo",
      "Xem phim chất lượng 4K",
      "Chat không cần chờ",
      "Chat sử dụng stickers và Gifs",
      "Tải lên ảnh đại diện của bạn",
      "Tên được gán nhãn ROX",
    ],
  },
];

const PricingModal = ({ isOpen, onClose, user }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  if (!isOpen) return null;

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmPurchase = () => {
    // TODO: Xử lý thanh toán thực tế
    console.log("Confirmed purchase:", selectedPlan);
    setIsConfirmModalOpen(false);
    onClose();
    // TODO: Call API thanh toán
  };

  const handleCloseConfirm = () => {
    setIsConfirmModalOpen(false);
    setSelectedPlan(null);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="pricing-modal-backdrop" onClick={onClose} />

      {/* Modal */}
      <div className="pricing-modal">
        {/* Close Button */}
        <button className="pricing-modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        {/* Header với thông tin user */}
        <div className="pricing-modal-header">
          <div className="user-info-section">
            <div className="user-avatar-large">
              <SafeAvatar src={user?.avatar} alt={user?.username} />
              {user?.isPremium && (
                <span className="premium-badge-large">∞</span>
              )}
            </div>
            <div className="user-details">
              <div className="username-row">
                <span className="username-large">{user?.username}</span>
                {user?.isPremium && <span className="infinity-icon">∞</span>}
              </div>
              <p className="user-status">
                {user?.isPremium
                  ? "Bạn đang là thành viên miễn phí."
                  : "Bạn đang là thành viên miễn phí."}
              </p>
            </div>
          </div>

          <div className="balance-info-large">
            <CreditCard size={20} />
            <span className="balance-label">Số dư</span>
            <span className="balance-value">
              {(user?.balance || 0).toLocaleString("vi-VN")} VND
            </span>
            <button className="recharge-btn-small">+ Nạp</button>
          </div>
        </div>

        {/* Title */}
        <h1 className="pricing-title">Nâng cấp tài khoản RoX ngay bây giờ</h1>

        {/* Pricing Cards */}
        <div className="pricing-cards">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`pricing-card ${plan.popular ? "popular" : ""}`}
            >
              {/* Duration */}
              <h3 className="plan-duration">{plan.duration}</h3>

              {/* Price */}
              <div className="plan-price">
                {plan.originalPrice && (
                  <span className="price-original">
                    {plan.originalPrice.toLocaleString("vi-VN")}₫
                  </span>
                )}
                <span className="price-current">
                  {plan.price.toLocaleString("vi-VN")}₫
                </span>
                {plan.discount && (
                  <span className="discount-badge">Giảm {plan.discount}</span>
                )}
              </div>

              {/* Features */}
              <ul className="plan-features">
                {plan.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <Check size={18} className="check-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Select Button */}
              <button
                className="plan-select-btn"
                onClick={() => handleSelectPlan(plan)}
              >
                Chọn ⚡
              </button>
            </div>
          ))}
        </div>

        {/* Confirmation Modal */}
        <ConfirmPurchaseModal
          isOpen={isConfirmModalOpen}
          onClose={handleCloseConfirm}
          onConfirm={handleConfirmPurchase}
          plan={selectedPlan}
        />
      </div>
    </>
  );
};

PricingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default PricingModal;
