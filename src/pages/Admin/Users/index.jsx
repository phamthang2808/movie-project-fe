import { Ban, Edit2, Search, Shield, Trash2, User } from "lucide-react";
import { useState } from "react";
import "./Users.scss";

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  // Mock data
  const users = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "user1@example.com",
      role: "user",
      status: "active",
      isPremium: true,
      balance: 500000,
      joinDate: "2024-12-01",
      lastLogin: "2 giờ trước",
    },
    {
      id: 2,
      name: "Trần Thị Staff",
      email: "staff@example.com",
      role: "staff",
      status: "active",
      isPremium: true,
      balance: 1000000,
      joinDate: "2024-11-15",
      lastLogin: "30 phút trước",
    },
    {
      id: 3,
      name: "Lê Văn Admin",
      email: "admin@example.com",
      role: "admin",
      status: "active",
      isPremium: true,
      balance: 10000000,
      joinDate: "2024-10-01",
      lastLogin: "10 phút trước",
    },
    {
      id: 4,
      name: "Phạm Thị B",
      email: "user2@example.com",
      role: "user",
      status: "banned",
      isPremium: false,
      balance: 0,
      joinDate: "2024-12-10",
      lastLogin: "1 ngày trước",
    },
    {
      id: 5,
      name: "Hoàng Văn C",
      email: "user3@example.com",
      role: "user",
      status: "active",
      isPremium: false,
      balance: 250000,
      joinDate: "2025-01-05",
      lastLogin: "5 giờ trước",
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = filterRole === "all" || user.role === filterRole;
    return matchSearch && matchRole;
  });

  const getRoleBadge = (role) => {
    const badges = {
      admin: { text: "Admin", class: "role-admin" },
      staff: { text: "Staff", class: "role-staff" },
      user: { text: "User", class: "role-user" },
    };
    return badges[role] || badges.user;
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: { text: "Hoạt động", class: "status-active" },
      banned: { text: "Đã khóa", class: "status-banned" },
      inactive: { text: "Không hoạt động", class: "status-inactive" },
    };
    return badges[status] || badges.active;
  };

  return (
    <div className="admin-users">
      <div className="page-header">
        <div>
          <h1>Quản lý Users</h1>
          <p>{users.length} người dùng trong hệ thống</p>
        </div>
      </div>

      <div className="filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm người dùng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="filter-select"
        >
          <option value="all">Tất cả vai trò</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
          <option value="user">User</option>
        </select>
      </div>

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Người dùng</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>VIP</th>
              <th>Số dư</th>
              <th>Ngày tham gia</th>
              <th>Lần cuối đăng nhập</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => {
              const roleBadge = getRoleBadge(user.role);
              const statusBadge = getStatusBadge(user.status);
              return (
                <tr key={user.id}>
                  <td>#{index + 1}</td>
                  <td className="user-info">
                    <div className="avatar">
                      <User size={20} />
                    </div>
                    <span>{user.name}</span>
                  </td>
                  <td className="email">{user.email}</td>
                  <td>
                    <span className={`role-badge ${roleBadge.class}`}>
                      <Shield size={14} />
                      {roleBadge.text}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${statusBadge.class}`}>
                      {statusBadge.text}
                    </span>
                  </td>
                  <td>
                    {user.isPremium ? (
                      <span className="vip-badge">👑 VIP</span>
                    ) : (
                      <span className="no-vip">Thường</span>
                    )}
                  </td>
                  <td className="balance">{user.balance.toLocaleString()} VND</td>
                  <td>{user.joinDate}</td>
                  <td className="last-login">{user.lastLogin}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-edit" title="Sửa">
                        <Edit2 size={16} />
                      </button>
                      <button
                        className={user.status === "banned" ? "btn-unban" : "btn-ban"}
                        title={user.status === "banned" ? "Mở khóa" : "Khóa"}
                      >
                        <Ban size={16} />
                      </button>
                      <button className="btn-delete" title="Xóa">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;

