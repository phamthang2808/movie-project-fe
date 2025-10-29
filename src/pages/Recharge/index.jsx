import { ArrowLeft, CreditCard } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BankTransferDetail from "../../components/Recharge/BankTransferDetail";
import PaymentMethods from "../../components/Recharge/PaymentMethods";
import RechargePackages from "../../components/Recharge/RechargePackages";
import SafeAvatar from "../../components/SafeAvatar";
import "./Recharge.scss";

const Recharge = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showBankDetail, setShowBankDetail] = useState(false);

  // Lấy thông tin user từ localStorage
  const getUserFromStorage = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  };

  const user = getUserFromStorage();

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setShowBankDetail(false);
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);

    // Nếu chọn chuyển khoản ngân hàng và đã chọn gói
    if (method.id === "bank" && selectedPackage) {
      setShowBankDetail(true);
    } else {
      setShowBankDetail(false);
    }
  };

  const handleTransactionComplete = () => {
    // TODO: Call API để verify transaction
    console.log("Transaction completed");
    // Navigate back hoặc show success message
  };

  return (
    <div className="recharge-page">
      <div className="recharge-container">
        {/* Header */}
        <div className="recharge-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <h1 className="recharge-title">Nạp tiền vào tài khoản</h1>
        </div>

        {/* User Info */}
        <div className="user-info-section">
          <div className="user-avatar-large">
            <SafeAvatar src={user?.avatar} alt={user?.fullName || "User"} />
            {user?.isPremium && <span className="premium-badge">∞</span>}
          </div>
          <div className="user-details">
            <h2 className="username">{user?.fullName || "Người dùng"}</h2>
            <div className="balance-display">
              <CreditCard size={18} />
              <span className="label">Số dư</span>
              <span className="amount">
                {(user?.balance || 0).toLocaleString("vi-VN")} ◉
              </span>
            </div>
            <Link to="/transaction-history" className="history-link">
              Xem lịch sử nạp →
            </Link>
          </div>
        </div>

        {/* Step 1: Chọn gói tiền */}
        <RechargePackages
          selectedPackage={selectedPackage}
          onSelectPackage={handlePackageSelect}
        />

        {/* Step 2: Chọn phương thức thanh toán */}
        {selectedPackage && !showBankDetail && (
          <PaymentMethods
            selectedMethod={selectedPaymentMethod}
            onSelectMethod={handlePaymentMethodSelect}
          />
        )}

        {/* Bank Transfer Detail */}
        {showBankDetail && selectedPackage && (
          <BankTransferDetail
            package={selectedPackage}
            onComplete={handleTransactionComplete}
            onBack={() => setShowBankDetail(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Recharge;
