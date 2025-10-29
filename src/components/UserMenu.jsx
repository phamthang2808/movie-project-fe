import {
  CreditCard,
  Heart,
  List,
  LogOut,
  Play,
  Plus,
  User as UserIcon,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PricingModal from "./PricingModal";
import SafeAvatar from "./SafeAvatar";
import "./UserMenu.scss";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

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

  const userFromStorage = getUserFromStorage();

  const user = {
    username: userFromStorage?.fullName || userFromStorage?.email || "User",
    isPremium: userFromStorage?.isPremium || false,
    balance: userFromStorage?.balance || 0,
    avatar: userFromStorage?.avatar || "",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <>
      <div className="user-menu-wrapper">
        {/* Avatar Button */}
        <button
          className="user-avatar-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="User menu"
        >
          <SafeAvatar
            src={user.avatar}
            alt={user.username}
            className="user-avatar"
          />
          {user.isPremium && <span className="premium-badge">∞</span>}
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <>
            <div className="user-dropdown">
              {/* User Info Header */}
              <div className="user-dropdown-header">
                <div className="user-info">
                  <div className="user-name-row">
                    <span className="username">{user.username}</span>
                    {user.isPremium && (
                      <span className="infinity-badge" title="Premium Member">
                        ∞
                      </span>
                    )}
                  </div>
                  <p className="upgrade-text">
                    Nâng cấp tài khoản RoX để có trải nghiệm đẳng cấp hơn.
                  </p>
                  <button
                    className="upgrade-btn"
                    onClick={() => {
                      setIsPricingModalOpen(true);
                      setIsOpen(false);
                    }}
                  >
                    Nâng cấp ngay ⚡
                  </button>
                </div>
              </div>

              {/* Balance Section */}
              <div className="balance-section">
                <div className="balance-info">
                  <CreditCard size={18} className="balance-icon" />
                  <span className="balance-label">Số dư</span>
                  <span className="balance-amount">
                    {user.balance.toLocaleString("vi-VN")} VND
                  </span>
                </div>
                <Link
                  to="/recharge"
                  className="recharge-btn"
                  onClick={() => setIsOpen(false)}
                >
                  <Plus size={16} />
                  Nạp
                </Link>
              </div>

              {/* Menu Items */}
              <div className="user-menu-items">
                <Link
                  to="/favorites"
                  className="user-menu-item"
                  onClick={() => setIsOpen(false)}
                >
                  <Heart size={18} />
                  <span>Yêu thích</span>
                </Link>

                <Link
                  to="/watchlist"
                  className="user-menu-item"
                  onClick={() => setIsOpen(false)}
                >
                  <List size={18} />
                  <span>Danh sách</span>
                </Link>

                <Link
                  to="/continue-watching"
                  className="user-menu-item"
                  onClick={() => setIsOpen(false)}
                >
                  <Play size={18} />
                  <span>Xem tiếp</span>
                </Link>

                <Link
                  to="/account"
                  className="user-menu-item"
                  onClick={() => setIsOpen(false)}
                >
                  <UserIcon size={18} />
                  <span>Tài khoản</span>
                </Link>

                <button
                  className="user-menu-item logout-item"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  <span>Thoát</span>
                </button>
              </div>
            </div>

            {/* Backdrop */}
            <div
              className="user-menu-backdrop"
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </div>

      {/* Pricing Modal */}
      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        user={user}
      />
    </>
  );
};

export default UserMenu;
