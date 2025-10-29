import {
  Calendar,
  Camera,
  Edit2,
  LogOut,
  Mail,
  Phone,
  Save,
  Shield,
  User,
  Wallet,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SafeAvatar from "../components/SafeAvatar";
import { showSuccess } from "../utils/notification";
import "./Account.scss";

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    const userData = JSON.parse(storedUser);
    setUser(userData);
    setEditedUser(userData);
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser({ ...user });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser({ ...user });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(editedUser));
    setUser(editedUser);
    setIsEditing(false);
    showSuccess("Cập nhật thông tin thành công!");
  };

  const handleChange = (field, value) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    showSuccess("Đăng xuất thành công!");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Chưa cập nhật";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="account-page">
      <div className="account-container">
        <div className="account-header">
          <h1>Quản Lý Tài Khoản</h1>
          <p>Thông tin cá nhân và cài đặt tài khoản của bạn</p>
        </div>

        <div className="account-content">
          <div className="account-sidebar">
            <div className="profile-card">
              <div className="avatar-section">
                <SafeAvatar
                  src={user.avatar}
                  alt={user.name}
                  className="profile-avatar"
                />
                <button className="avatar-upload-btn">
                  <Camera size={18} />
                </button>
              </div>
              <h2 className="profile-name">{user.name}</h2>
              <p className="profile-email">{user.email}</p>

              <div className="balance-card">
                <div className="balance-icon">
                  <Wallet size={24} />
                </div>
                <div className="balance-info">
                  <span className="balance-label">Số dư</span>
                  <span className="balance-amount">
                    {user.balance?.toLocaleString("vi-VN") || "0"} VND
                  </span>
                </div>
                <button
                  className="recharge-btn"
                  onClick={() => navigate("/recharge")}
                >
                  Nạp tiền
                </button>
              </div>
            </div>

            <div className="quick-stats">
              <div className="stat-item">
                <Shield className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-label">Cấp độ</span>
                  <span className="stat-value">
                    {user.membershipLevel || "Thành viên"}
                  </span>
                </div>
              </div>
              <div className="stat-item">
                <Calendar className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-label">Tham gia</span>
                  <span className="stat-value">
                    {formatDate(user.joinDate)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="account-main">
            <div className="info-section">
              <div className="section-header">
                <h3>Thông tin cá nhân</h3>
                {!isEditing ? (
                  <button className="edit-btn" onClick={handleEdit}>
                    <Edit2 size={18} />
                    Chỉnh sửa
                  </button>
                ) : (
                  <div className="edit-actions">
                    <button className="save-btn" onClick={handleSave}>
                      <Save size={18} />
                      Lưu
                    </button>
                    <button className="cancel-btn" onClick={handleCancel}>
                      <X size={18} />
                      Hủy
                    </button>
                  </div>
                )}
              </div>

              <div className="info-grid">
                <div className="info-item">
                  <div className="info-label">
                    <User size={18} />
                    <span>Họ và tên</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      className="info-input"
                      value={editedUser.name || ""}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  ) : (
                    <div className="info-value">{user.name}</div>
                  )}
                </div>

                <div className="info-item">
                  <div className="info-label">
                    <Mail size={18} />
                    <span>Email</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="email"
                      className="info-input"
                      value={editedUser.email || ""}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  ) : (
                    <div className="info-value">{user.email}</div>
                  )}
                </div>

                <div className="info-item">
                  <div className="info-label">
                    <Phone size={18} />
                    <span>Số điện thoại</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="tel"
                      className="info-input"
                      value={editedUser.phone || ""}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="Chưa cập nhật"
                    />
                  ) : (
                    <div className="info-value">
                      {user.phone || "Chưa cập nhật"}
                    </div>
                  )}
                </div>

                <div className="info-item">
                  <div className="info-label">
                    <Calendar size={18} />
                    <span>Ngày sinh</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="date"
                      className="info-input"
                      value={editedUser.birthday || ""}
                      onChange={(e) => handleChange("birthday", e.target.value)}
                    />
                  ) : (
                    <div className="info-value">
                      {formatDate(user.birthday)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="security-section">
              <div className="section-header">
                <h3>Bảo mật</h3>
              </div>

              <div className="security-grid">
                <div className="security-item">
                  <div className="security-info">
                    <Shield size={20} />
                    <div className="security-content">
                      <h4>Mật khẩu</h4>
                      <p>Thay đổi mật khẩu định kỳ để bảo mật tài khoản</p>
                    </div>
                  </div>
                  <button className="action-btn">Đổi mật khẩu</button>
                </div>

                <div className="security-item">
                  <div className="security-info">
                    <Mail size={20} />
                    <div className="security-content">
                      <h4>Email xác thực</h4>
                      <p>Email của bạn đã được xác thực</p>
                    </div>
                  </div>
                  <span className="verified-badge">✓ Đã xác thực</span>
                </div>
              </div>
            </div>

            <div className="danger-section">
              <div className="section-header">
                <h3>Vùng nguy hiểm</h3>
              </div>

              <div className="danger-actions">
                <button className="logout-btn" onClick={handleLogout}>
                  <LogOut size={20} />
                  Đăng xuất
                </button>
                <button className="delete-account-btn">
                  <X size={20} />
                  Xóa tài khoản
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
