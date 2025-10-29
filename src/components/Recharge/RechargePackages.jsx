import { Check } from "lucide-react";
import PropTypes from "prop-types";
import "./RechargePackages.scss";

const packages = [
  {
    id: "100k",
    name: "Gói 100K",
    amount: 100000,
    coins: "◉",
  },
  {
    id: "200k",
    name: "Gói 200K",
    amount: 200000,
    coins: "◉",
  },
  {
    id: "500k",
    name: "Gói 500K",
    amount: 500000,
    coins: "◉",
  },
  {
    id: "1m",
    name: "Gói 1M",
    amount: 1000000,
    coins: "◉",
  },
];

const RechargePackages = ({ selectedPackage, onSelectPackage }) => {
  return (
    <div className="recharge-packages-section">
      <h2 className="section-title">
        <span className="step-badge">Bước 1:</span> Chọn gói tiền thích hợp
      </h2>

      <div className="packages-grid">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`package-card ${
              selectedPackage?.id === pkg.id ? "selected" : ""
            }`}
            onClick={() => onSelectPackage(pkg)}
          >
            <h3 className="package-name">
              {pkg.name} {pkg.coins}
            </h3>
            <p className="package-amount">
              {pkg.amount.toLocaleString("vi-VN")} VND
            </p>

            {selectedPackage?.id === pkg.id && (
              <div className="selected-indicator">
                <Check size={20} strokeWidth={3} />
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedPackage && (
        <p className="selected-info">
          Bạn đang chọn gói{" "}
          <span className="highlight-amount">
            {selectedPackage.amount.toLocaleString("vi-VN")} VND
          </span>
          .
        </p>
      )}
    </div>
  );
};

RechargePackages.propTypes = {
  selectedPackage: PropTypes.object,
  onSelectPackage: PropTypes.func.isRequired,
};

export default RechargePackages;
