import React, { useEffect, useState } from "react";

const labelStyle = {
  display: "inline-block",
  minWidth: 120,
  fontWeight: 600,
  marginBottom: 6,
};
const inputStyle = {
  padding: "7px 12px",
  borderRadius: 6,
  border: "1px solid #ccc",
  fontSize: 15,
  marginBottom: 8,
  width: 260,
  maxWidth: "100%",
};
const btnStyle = {
  background: "#36a2eb",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "8px 18px",
  fontWeight: 600,
  fontSize: 15,
  cursor: "pointer",
  transition: "background 0.2s, box-shadow 0.2s",
  boxShadow: "0 2px 8px #e3f0ff",
};
const btnHover = {
  background: "linear-gradient(90deg, #36a2eb 0%, #3498db 100%)",
  boxShadow: "0 4px 16px #b3e0ff",
};
const btnCancel = {
  ...btnStyle,
  background: "#eee",
  color: "#333",
  marginLeft: 8,
  boxShadow: "none",
};
const infoBox = {
  background: "#f8fbff",
  borderRadius: 12,
  padding: 24,
  marginBottom: 28,
  boxShadow: "0 2px 8px #e3f0ff",
};
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#fff",
  borderRadius: 10,
  overflow: "hidden",
  boxShadow: "0 2px 8px #e3f0ff",
};
const thStyle = {
  background: "#e3f0ff",
  fontWeight: 700,
  padding: 10,
  borderBottom: "1.5px solid #d0e6fa",
  fontSize: 15,
};
const tdStyle = {
  padding: 10,
  borderBottom: "1px solid #f0f0f0",
  fontSize: 15,
};

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editUser, setEditUser] = useState({});
  const [editBtnHover, setEditBtnHover] = useState(false);

  useEffect(() => {
    // Lấy thông tin user từ localStorage (hoặc gọi API)
    const fullname = localStorage.getItem("fullname");
    const email = localStorage.getItem("email");
    const phone = localStorage.getItem("phone");
    const birthday = localStorage.getItem("birthday");
    setUser({ fullname, email, phone, birthday });

    // Gọi API lấy lịch sử đơn hàng (ví dụ)
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch("http://localhost:3001/api/orders/my-orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setOrders(data.data || []);
      } catch (err) {
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);

  const handleEdit = () => {
    setEditUser(user);
    setEditing(true);
  };

  const handleSave = () => {
    setUser(editUser);
    setEditing(false);
    // Lưu vào localStorage (hoặc gọi API nếu có)
    localStorage.setItem("fullname", editUser.fullname || "");
    localStorage.setItem("email", editUser.email || "");
    localStorage.setItem("phone", editUser.phone || "");
    localStorage.setItem("birthday", editUser.birthday || "");
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        background: "#fff",
        borderRadius: 16,
        padding: 32,
        boxShadow: "0 2px 12px #e3f0ff",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontWeight: 900,
          fontSize: 32,
          background: "linear-gradient(90deg, #36a2eb 0%, #3498db 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textTransform: "uppercase",
          letterSpacing: 1.5,
          textShadow: "0 2px 12px #b3e0ff",
          marginBottom: 32,
        }}
      >
        Thông tin cá nhân
      </h2>
      <div style={infoBox}>
        {editing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div style={{ marginBottom: 10 }}>
              <label style={labelStyle}>Họ tên:</label>
              <input
                style={inputStyle}
                value={editUser.fullname || ""}
                onChange={(e) =>
                  setEditUser((u) => ({ ...u, fullname: e.target.value }))
                }
                required
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label style={labelStyle}>Email:</label>
              <input
                style={inputStyle}
                value={editUser.email || ""}
                onChange={(e) =>
                  setEditUser((u) => ({ ...u, email: e.target.value }))
                }
                type="email"
                required
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label style={labelStyle}>Số điện thoại:</label>
              <input
                style={inputStyle}
                value={editUser.phone || ""}
                onChange={(e) =>
                  setEditUser((u) => ({ ...u, phone: e.target.value }))
                }
                required
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label style={labelStyle}>Ngày sinh:</label>
              <input
                style={inputStyle}
                type="date"
                value={editUser.birthday || ""}
                onChange={(e) =>
                  setEditUser((u) => ({ ...u, birthday: e.target.value }))
                }
              />
            </div>
            <button type="submit" style={btnStyle}>
              Lưu
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              style={btnCancel}
            >
              Hủy
            </button>
          </form>
        ) : (
          <>
            <div style={{ marginBottom: 8 }}>
              <span style={labelStyle}>Họ tên:</span>{" "}
              {user.fullname || "Chưa cập nhật"}
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={labelStyle}>Email:</span>{" "}
              {user.email || "Chưa cập nhật"}
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={labelStyle}>Số điện thoại:</span>{" "}
              {user.phone || "Chưa cập nhật"}
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={labelStyle}>Ngày sinh:</span>{" "}
              {user.birthday || "Chưa cập nhật"}
            </div>
            <button
              onClick={handleEdit}
              style={editBtnHover ? { ...btnStyle, ...btnHover } : btnStyle}
              onMouseEnter={() => setEditBtnHover(true)}
              onMouseLeave={() => setEditBtnHover(false)}
            >
              Chỉnh sửa thông tin
            </button>
          </>
        )}
      </div>
      <h3
        style={{
          color: "#222",
          fontWeight: 700,
          margin: "32px 0 18px 0",
          fontSize: 22,
        }}
      >
        Lịch sử đơn hàng
      </h3>
      {orders.length === 0 ? (
        <div
          style={{
            color: "#888",
            fontStyle: "italic",
            textAlign: "center",
            margin: "24px 0",
          }}
        >
          Chưa có đơn hàng nào.
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Mã đơn</th>
                <th style={thStyle}>Ngày đặt</th>
                <th style={thStyle}>Tổng tiền</th>
                <th style={thStyle}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td style={tdStyle}>{order._id}</td>
                  <td style={tdStyle}>
                    {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td style={tdStyle}>
                    {order.total && order.total.toLocaleString()} VNĐ
                  </td>
                  <td style={tdStyle}>{order.status || "Đang xử lý"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
