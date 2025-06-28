import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(res.data.data);
      } catch (err) {
        toast.error("Lỗi khi tải chi tiết đơn hàng");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <p className="text-center p-4">Đang tải...</p>;
  if (!order) return <p className="text-center p-4">Không tìm thấy đơn hàng.</p>;

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Chi tiết đơn hàng #{order._id}</h1>

      <div className="space-y-2 mb-6">
        <p><strong>Khách hàng:</strong> {order.id_user?.fullname || order.id_user?.username}</p>
        <p><strong>Trạng thái:</strong> {order.status}</p>
        <p><strong>Tổng tiền:</strong> {order.total?.toLocaleString("vi-VN")}₫</p>
        <p><strong>Phí ship:</strong> {order.feeship?.toLocaleString("vi-VN")}₫</p>
        <p><strong>Thanh toán:</strong> {order.pay ? "Đã thanh toán" : "Chưa thanh toán"}</p>
        <p><strong>Ngày tạo:</strong> {new Date(order.create_time).toLocaleString()}</p>
        <p><strong>Địa chỉ:</strong> {order.address}</p>
        <p><strong>Ghi chú:</strong> {order.id_note?.content || "Không có"}</p>
        <p><strong>Mã giảm giá:</strong> {order.id_coupon?.code || "Không áp dụng"}</p>
        <p><strong>Phương thức thanh toán:</strong> {order.id_payment?.pay_name || "-"}</p>
      </div>

      <hr className="my-4" />
      <p className="text-xl font-semibold mb-2">Chi tiết sản phẩm (nếu có):</p>
      <p className="text-sm text-gray-500">* Nếu bạn muốn xem chi tiết từng sản phẩm, cần kết nối thêm với bảng DetailOrder</p>
    </div>
  );
};

export default OrderDetail;
