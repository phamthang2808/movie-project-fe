import {
  CreditCard,
  Heart,
  List,
  LogOut,
  Play,
  Plus,
  User as UserIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PricingModal from "./PricingModal";
import SafeAvatar from "./SafeAvatar";
import "./UserMenu.scss";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [userState, setUserState] = useState(null);

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

  // Load user data và lắng nghe thay đổi
  useEffect(() => {
    const loadUser = () => {
      setUserState(getUserFromStorage());
    };

    loadUser();

    // Lắng nghe thay đổi từ localStorage
    window.addEventListener("storage", loadUser);

    // Lắng nghe custom event để cập nhật ngay lập tức
    const handleUserUpdate = () => {
      loadUser();
    };
    window.addEventListener("userUpdated", handleUserUpdate);

    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("userUpdated", handleUserUpdate);
    };
  }, []);

  const user = {
    username: userState?.fullName || userState?.email || "User",
    isPremium: userState?.isPremium || false,
    balance: userState?.balance || 0,
    avatar: userState?.avatar || "",
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
                  to="/account?tab=favorites"
                  className="user-menu-item"
                  onClick={() => setIsOpen(false)}
                >
                  <Heart size={18} />
                  <span>Yêu thích</span>
                </Link>

                <Link
                  to="/account?tab=watchlist"
                  className="user-menu-item"
                  onClick={() => setIsOpen(false)}
                >
                  <List size={18} />
                  <span>Danh sách</span>
                </Link>

                <Link
                  to="/account?tab=continue"
                  className="user-menu-item"
                  onClick={() => setIsOpen(false)}
                >
                  <Play size={18} />
                  <span>Xem tiếp</span>
                </Link>

                <Link
                  to="/account?tab=account"
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
