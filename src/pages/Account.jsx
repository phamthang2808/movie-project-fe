import {
  BookMarked,
  Calendar,
  Camera,
  Clock,
  Edit2,
  Heart,
  LogOut,
  Mail,
  Phone,
  Play,
  Save,
  Shield,
  User,
  Wallet,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SafeAvatar from "../components/SafeAvatar";
import { uploadAvatar } from "../services/uploadService";
import { showError, showSuccess } from "../utils/notification";
import "./Account.scss";

const Account = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "favorites"
  );
  const [favoriteMovies, setFavoriteMovies] = useState([
    {
      id: 1,
      title: "Tài Xế Giao Hàng",
      subtitle: "The Delivery Rider",
      image: new URL(
        "../assets/avar-film/2e96ceca88e057ff1969a128dfc5313d.webp",
        import.meta.url
      ).href,
      episode: "03m",
      duration: "1h 31m",
    },
    {
      id: 2,
      title: "Ngôi Nhà Tối Ác",
      subtitle: "The Last House on the Left",
      image: new URL(
        "../assets/avar-film//489955f87e659835e0620e46b86fe20f.webp",
        import.meta.url
      ).href,
      episode: "01m",
      duration: "1h 54m",
    },
    {
      id: 3,
      title: "Nhập Thanh Vân",
      subtitle: "Love in the Clouds",
      image: new URL(
        "../assets/avar-film/eb20ecd315ed07e4e799be16504a6838.webp",
        import.meta.url
      ).href,
      episode: "Tập 14",
      duration: "34m / 46m",
    },
    {
      id: 4,
      title: "Nhật Tiêu Túy Ca",
      subtitle: "Fated Hearts",
      image: new URL(
        "../assets/avar-film/b8d9e202ee4bfcb982931f907977a6f6.webp",
        import.meta.url
      ).href,
      episode: "Tập 38",
      duration: "15m / 47m",
    },
    {
      id: 5,
      title: "Chiến Thần Đại Tần",
      subtitle: "Fated Hearts",
      image: new URL(
        "../assets/avar-film/de20f19c9485ac49476ac3ece58ca529.webp",
        import.meta.url
      ).href,
      episode: "Tập 36",
      duration: "15m / 47m",
    },
  ]);
  const [watchList, setWatchList] = useState([
    {
      id: 5,
      title: "Chiến Thần Đại Tần",
      subtitle: "The Great Warrior",
      image: new URL(
        "../assets/avar-film/5f146da72268d7ce5449dcf2f8765454.webp",
        import.meta.url
      ).href,
      episode: "Tập 20",
      duration: "40m / 50m",
    },
    {
      id: 6,
      title: "Hồ Sơ Trinh Thám",
      subtitle: "Detective Files",
      image: new URL(
        "../assets/avar-film/6c9779087671f044479dec8f8e06ce28.webp",
        import.meta.url
      ).href,
      episode: "Tập 12",
      duration: "30m / 45m",
    },
  ]);
  const [continueWatching, setContinueWatching] = useState([
    {
      id: 7,
      title: "Tài Xế Giao Hàng",
      subtitle: "The Delivery Rider",
      image: new URL("../assets/avar-film/1.webp", import.meta.url).href,
      episode: "03m",
      progress: 45,
      timeLeft: "28 phút còn lại",
    },
    {
      id: 8,
      title: "Nhập Thanh Vân",
      subtitle: "Love in the Clouds",
      image: new URL(
        "../assets/avar-film/086a7bc9b316bc3f9c2ff6d66ac65565.webp",
        import.meta.url
      ).href,
      episode: "Tập 14",
      progress: 70,
      timeLeft: "10 phút còn lại",
    },
  ]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        navigate("/login");
        return;
      }
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setEditedUser(userData);
    };

    loadUser();

    // Lắng nghe thay đổi từ localStorage
    window.addEventListener("storage", loadUser);
    window.addEventListener("userUpdated", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("userUpdated", loadUser);
    };
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

  const handleRemoveFavorite = (movieId) => {
    setFavoriteMovies((prev) => prev.filter((movie) => movie.id !== movieId));
    setConfirmDelete(null);
    showSuccess("Đã xóa khỏi danh sách yêu thích!");
  };

  const openDeleteConfirm = (movie) => {
    setConfirmDelete(movie);
  };

  const closeDeleteConfirm = () => {
    setConfirmDelete(null);
  };

  const handleRemoveFromWatchList = (movieId) => {
    setWatchList((prev) => prev.filter((movie) => movie.id !== movieId));
    setConfirmDelete(null);
    showSuccess("Đã xóa khỏi danh sách!");
  };

  const handleRemoveFromContinue = (movieId) => {
    setContinueWatching((prev) => prev.filter((movie) => movie.id !== movieId));
    setConfirmDelete(null);
    showSuccess("Đã xóa khỏi xem tiếp!");
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      showError("Lỗi", "Vui lòng chọn file ảnh!");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showError("Lỗi", "Ảnh không được vượt quá 5MB!");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to server
    await handleUploadAvatar(file);
  };

  const handleUploadAvatar = async (file) => {
    setIsUploadingAvatar(true);

    try {
      // Upload file to backend API
      const avatarUrl = await uploadAvatar(file);

      if (!avatarUrl) {
        throw new Error("Không nhận được URL avatar");
      }

      // Update user in localStorage
      const updatedUser = {
        ...user,
        avatar: avatarUrl,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setEditedUser(updatedUser);

      // Trigger update events
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("userUpdated"));

      showSuccess("Thành công", "Cập nhật avatar thành công!");
      setAvatarPreview(null);
    } catch (error) {
      console.error("Upload avatar error:", error);
      showError(
        "Lỗi",
        error.message || "Không thể tải ảnh lên. Vui lòng thử lại!"
      );
      setAvatarPreview(null);
    } finally {
      setIsUploadingAvatar(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const menuItems = [
    { id: "favorites", label: "Yêu thích", icon: Heart },
    { id: "watchlist", label: "Danh sách", icon: BookMarked },
    { id: "continue", label: "Xem tiếp", icon: Clock },
    { id: "account", label: "Tài khoản", icon: User },
  ];

  if (!user) {
    return null;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "favorites":
        return (
          <div className="favorites-section">
            <div className="section-header">
              <div className="header-with-icon">
                <Heart size={24} className="section-icon" />
                <h3>Danh sách yêu thích</h3>
              </div>
              <span className="favorite-count">
                {favoriteMovies.length} phim
              </span>
            </div>

            {favoriteMovies.length > 0 ? (
              <div className="favorites-grid">
                {favoriteMovies.map((movie) => (
                  <div key={movie.id} className="favorite-card">
                    <button
                      className="remove-favorite-btn"
                      onClick={() => {
                        setConfirmDelete({ ...movie, type: "favorite" });
                      }}
                      title="Xóa khỏi yêu thích"
                    >
                      <X size={18} />
                    </button>
                    <div className="favorite-image">
                      <img src={movie.image} alt={movie.title} />
                      <div className="favorite-overlay">
                        <button className="play-btn">▶</button>
                      </div>
                    </div>
                    <div className="favorite-info">
                      <h4 className="favorite-title">{movie.title}</h4>
                      <p className="favorite-subtitle">{movie.subtitle}</p>
                      <div className="favorite-meta">
                        <span className="favorite-episode">
                          {movie.episode}
                        </span>
                        <span className="favorite-duration">
                          {movie.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-favorites">
                <Heart size={64} />
                <p>Chưa có phim yêu thích nào</p>
              </div>
            )}
          </div>
        );

      case "watchlist":
        return (
          <div className="watchlist-section">
            <div className="section-header">
              <div className="header-with-icon">
                <BookMarked size={24} className="section-icon" />
                <h3>Danh sách phim</h3>
              </div>
              <span className="favorite-count">{watchList.length} phim</span>
            </div>

            {watchList.length > 0 ? (
              <div className="favorites-grid">
                {watchList.map((movie) => (
                  <div key={movie.id} className="favorite-card">
                    <button
                      className="remove-favorite-btn"
                      onClick={() => {
                        setConfirmDelete({ ...movie, type: "watchlist" });
                      }}
                      title="Xóa khỏi danh sách"
                    >
                      <X size={18} />
                    </button>
                    <div className="favorite-image">
                      <img src={movie.image} alt={movie.title} />
                      <div className="favorite-overlay">
                        <button className="play-btn">▶</button>
                      </div>
                    </div>
                    <div className="favorite-info">
                      <h4 className="favorite-title">{movie.title}</h4>
                      <p className="favorite-subtitle">{movie.subtitle}</p>
                      <div className="favorite-meta">
                        <span className="favorite-episode">
                          {movie.episode}
                        </span>
                        <span className="favorite-duration">
                          {movie.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-favorites">
                <BookMarked size={64} />
                <p>Danh sách trống</p>
              </div>
            )}
          </div>
        );

      case "continue":
        return (
          <div className="continue-section">
            <div className="section-header">
              <div className="header-with-icon">
                <Clock size={24} className="section-icon" />
                <h3>Xem tiếp</h3>
              </div>
              <span className="favorite-count">
                {continueWatching.length} phim
              </span>
            </div>

            {continueWatching.length > 0 ? (
              <div className="continue-grid">
                {continueWatching.map((movie) => (
                  <div key={movie.id} className="continue-card">
                    <button
                      className="remove-favorite-btn"
                      onClick={() => {
                        setConfirmDelete({ ...movie, type: "continue" });
                      }}
                      title="Xóa khỏi danh sách"
                    >
                      <X size={18} />
                    </button>
                    <div className="continue-image">
                      <img src={movie.image} alt={movie.title} />
                      <div className="continue-progress-bar">
                        <div
                          className="continue-progress-fill"
                          style={{ width: `${movie.progress}%` }}
                        ></div>
                      </div>
                      <div className="favorite-overlay">
                        <button className="play-btn">
                          <Play size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="continue-info">
                      <h4 className="continue-title">{movie.title}</h4>
                      <p className="continue-subtitle">{movie.subtitle}</p>
                      <div className="continue-meta">
                        <span className="continue-episode">
                          {movie.episode}
                        </span>
                        <span className="continue-time">{movie.timeLeft}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-favorites">
                <Clock size={64} />
                <p>Chưa có phim đang xem</p>
              </div>
            )}
          </div>
        );

      case "account":
        return (
          <>
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
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="account-page">
      <div className="account-container">
        <div className="account-header">
          <h1>Quản Lý Tài Khoản</h1>
          <p>Thông tin cá nhân và cài đặt tài khoản của bạn</p>
        </div>

        <div className="account-layout">
          <aside className="account-sidebar-nav">
            <div className="profile-card">
              <div className="avatar-section">
                <SafeAvatar
                  src={avatarPreview || user.avatar}
                  alt={user.name}
                  className="profile-avatar"
                />
                <button
                  className="avatar-upload-btn"
                  onClick={handleAvatarClick}
                  disabled={isUploadingAvatar}
                  title="Thay đổi avatar"
                >
                  {isUploadingAvatar ? (
                    <div className="spinner-mini"></div>
                  ) : (
                    <Camera size={18} />
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
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

            <nav className="sidebar-menu">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    className={`menu-item ${
                      activeTab === item.id ? "active" : ""
                    }`}
                    onClick={() => handleTabChange(item.id)}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <div className="account-main-content">{renderTabContent()}</div>
        </div>
      </div>

      {confirmDelete && (
        <div className="confirm-modal-overlay" onClick={closeDeleteConfirm}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-header">
              <h3>Xác nhận xóa</h3>
              <button className="close-modal-btn" onClick={closeDeleteConfirm}>
                <X size={20} />
              </button>
            </div>
            <div className="confirm-body">
              <p>
                Bạn có chắc chắn muốn xóa{" "}
                <strong>"{confirmDelete.title}"</strong>{" "}
                {confirmDelete.type === "favorite" &&
                  "khỏi danh sách yêu thích"}
                {confirmDelete.type === "watchlist" && "khỏi danh sách"}
                {confirmDelete.type === "continue" && "khỏi xem tiếp"} không?
              </p>
            </div>
            <div className="confirm-actions">
              <button
                className="cancel-confirm-btn"
                onClick={closeDeleteConfirm}
              >
                Hủy
              </button>
              <button
                className="delete-confirm-btn"
                onClick={() => {
                  if (confirmDelete.type === "favorite") {
                    handleRemoveFavorite(confirmDelete.id);
                  } else if (confirmDelete.type === "watchlist") {
                    handleRemoveFromWatchList(confirmDelete.id);
                  } else if (confirmDelete.type === "continue") {
                    handleRemoveFromContinue(confirmDelete.id);
                  }
                }}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
