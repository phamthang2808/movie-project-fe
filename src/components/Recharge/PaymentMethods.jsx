import PropTypes from "prop-types";
import bankIcon from "../../assets/images/bank.jpg";
import momoIcon from "../../assets/images/momo.jpg";
import vnpayIcon from "../../assets/images/vnpay.jpg";
import { showWarning } from "../../utils/notification";
import "./PaymentMethods.scss";

const paymentMethods = [
  {
    id: "bank",
    name: "Chuyển khoản ngân hàng",
    icon: bankIcon,
    iconType: "image",
    available: true,
  },
  {
    id: "momo",
    name: "Thanh toán qua ví Momo",
    icon: momoIcon,
    iconType: "image",
    available: true,
    maintenance: true,
  },
  {
    id: "vnpay",
    name: "Thanh toán qua VNPay",
    icon: vnpayIcon,
    iconType: "image",
    available: true,
  },
];

const PaymentMethods = ({ selectedMethod, onSelectMethod }) => {
  const handleMethodClick = (method) => {
    if (method.maintenance) {
      showWarning(
        "Thanh toán qua Momo hiện đang bảo trì. Vui lòng chọn phương thức khác!"
      );
      return;
    }
    onSelectMethod(method);
  };

  return (
    <div className="payment-methods-section">
      <h2 className="section-title">
        <span className="step-badge">Bước 2:</span> Chọn phương thức thanh toán
      </h2>

      <div className="payment-methods-grid">
        {paymentMethods.map((method) => {
          return (
            <div
              key={method.id}
              className={`payment-method-card ${
                selectedMethod?.id === method.id ? "selected" : ""
              } ${method.maintenance ? "maintenance" : ""}`}
              onClick={() => handleMethodClick(method)}
            >
              <div className="method-icon">
                {method.iconType === "image" ? (
                  <img
                    src={method.icon}
                    alt={method.name}
                    className="payment-icon-img"
                  />
                ) : (
                  <method.icon size={32} />
                )}
              </div>
              <h3 className="method-name">{method.name}</h3>
              <button className="method-btn">Chọn</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

PaymentMethods.propTypes = {
  selectedMethod: PropTypes.object,
  onSelectMethod: PropTypes.func.isRequired,
};

export default PaymentMethods;
