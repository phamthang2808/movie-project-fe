import { Copy } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { showSuccess } from "../../utils/notification";
import "./BankTransferDetail.scss";

const BankTransferDetail = ({ package: pkg, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  // Tạo mã giao dịch ngẫu nhiên
  const generateTransactionCode = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const [transactionCode] = useState(generateTransactionCode());

  // Bank info - Có thể lấy từ API hoặc config
  const bankInfo = {
    bankName: "BIDV",
    accountNumber: "123456789",
    accountName: "THANG CA CHEP",
    amount: pkg.amount,
    content: transactionCode,
    qrCode: `https://img.vietqr.io/image/BIDV-123456789-compact2.png?amount=${pkg.amount}&addInfo=${transactionCode}`, // VietQR API
  };

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Copy to clipboard
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    showSuccess("Đã sao chép", `${label} đã được sao chép vào clipboard`);
  };

  return (
    <div className="bank-transfer-detail">
      <h2 className="detail-title">Chuyển khoản ngân hàng</h2>
      <p className="detail-subtitle">Chú ý: nhập chính xác nội dung bên dưới</p>

      <div className="detail-grid">
        {/* Left Side - Bank Info */}
        <div className="bank-info-section">
          <div className="info-row">
            <span className="info-label">Ngân hàng</span>
            <div className="info-value-group">
              <span className="info-value">{bankInfo.bankName}</span>
              <button
                className="copy-btn"
                onClick={() => copyToClipboard(bankInfo.bankName, "Ngân hàng")}
              >
                <Copy size={16} />
              </button>
            </div>
          </div>

          <div className="info-row">
            <span className="info-label">Số tài khoản</span>
            <div className="info-value-group">
              <span className="info-value">{bankInfo.accountNumber}</span>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(bankInfo.accountNumber, "Số tài khoản")
                }
              >
                <Copy size={16} />
              </button>
            </div>
          </div>

          <div className="info-row">
            <span className="info-label">Chủ tài khoản</span>
            <div className="info-value-group">
              <span className="info-value">{bankInfo.accountName}</span>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(bankInfo.accountName, "Chủ tài khoản")
                }
              >
                <Copy size={16} />
              </button>
            </div>
          </div>

          <div className="info-row">
            <span className="info-label">Số tiền</span>
            <div className="info-value-group">
              <span className="info-value highlight">
                {bankInfo.amount.toLocaleString("vi-VN")} vnđ
              </span>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(bankInfo.amount.toString(), "Số tiền")
                }
              >
                <Copy size={16} />
              </button>
            </div>
          </div>

          <div className="info-row">
            <span className="info-label">Nội dung</span>
            <div className="info-value-group">
              <span className="info-value highlight">{bankInfo.content}</span>
              <button
                className="copy-btn"
                onClick={() => copyToClipboard(bankInfo.content, "Nội dung")}
              >
                <Copy size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - QR Code */}
        <div className="qr-section">
          <div className="qr-wrapper">
            <img src={bankInfo.qrCode} alt="QR Code" className="qr-image" />
          </div>
          <div className="timer-display">
            <p className="timer-label">Thời gian còn lại</p>
            <p className="timer-value">{formatTime(timeLeft)}</p>
          </div>
        </div>
      </div>

      <div className="detail-note">
        <p>
          ⚠️ <strong>Lưu ý:</strong> Vui lòng nhập chính xác nội dung{" "}
          <strong>{bankInfo.content}</strong> khi chuyển khoản để hệ thống tự
          động xác nhận giao dịch.
        </p>
        <p>
          Sau khi chuyển khoản thành công, số dư sẽ được cập nhật trong vòng{" "}
          <strong>1-5 phút</strong>.
        </p>
      </div>
    </div>
  );
};

BankTransferDetail.propTypes = {
  package: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default BankTransferDetail;
