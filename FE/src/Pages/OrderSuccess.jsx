import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3001/api/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrder(data.data);
        } else {
          setError(data.message || "Không tìm thấy đơn hàng");
        }
      })
      .catch((err) => setError("Lỗi kết nối server"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p style={{ padding: 40 }}>Đang tải đơn hàng...</p>;
  if (error)
    return (
      <div style={{ padding: 40, color: "red" }}>
        <h2>❌ Lỗi:</h2>
        <p>{error}</p>
        <Link to="/">⬅️ Quay lại trang chủ</Link>
      </div>
    );

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", background: "#fff", padding: 32, borderRadius: 16, boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
      <h1 style={{ fontSize: 28, color: "#2ecc71" }}>✅ Đặt hàng thành công!</h1>
      <p style={{ fontSize: 18, marginTop: 12 }}>Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được ghi nhận.</p>

      <div style={{ marginTop: 32 }}>
        <h3>Mã đơn hàng:</h3>
        <p style={{ fontWeight: 600 }}>{order._id}</p>

        <h3>Địa chỉ nhận hàng:</h3>
        <p>{order.address}</p>

        <h3>Phương thức thanh toán:</h3>
        <p>{order.id_payment?.pay_name || order.id_payment}</p>

        <h3>Tổng tiền:</h3>
        <p style={{ fontWeight: 600 }}>{Number(order.total).toLocaleString()} VNĐ</p>

        {order.id_note && (
          <>
            <h3>Người nhận:</h3>
            <p>{order.id_note.fullname} - {order.id_note.phone}</p>
            {order.id_note.content && <p>Ghi chú: {order.id_note.content}</p>}
          </>
        )}
      </div>

      <div style={{ marginTop: 32 }}>
        <Link to="/" style={{ padding: "12px 24px", background: "#3498db", color: "white", borderRadius: 8, textDecoration: "none", fontWeight: 600 }}>
          ⬅️ Về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
