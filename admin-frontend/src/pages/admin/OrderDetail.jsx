import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [detailOrders, setDetailOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const resOrder = await axios.get(`http://localhost:3001/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(resOrder.data.data);

        const resDetails = await axios.get(`http://localhost:3001/api/detail-orders/order/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDetailOrders(resDetails.data);
      } catch (error) {
        console.error(error);
        toast.error("Lỗi khi tải chi tiết đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p className="p-4 text-center">Đang tải...</p>;
  if (!order) return <p className="p-4 text-center">Không tìm thấy đơn hàng.</p>;

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Chi tiết đơn hàng #{order._id}</h1>

      <div className="space-y-2 mb-6">
        <p><strong>Khách hàng:</strong> {order.id_user?.fullname || order.id_user?.username}</p>
        <p><strong>Trạng thái:</strong> {order.status}</p>
        <p><strong>Tổng tiền:</strong> {order.total?.toLocaleString("vi-VN")}₫</p>
        <p><strong>Phí ship:</strong> {order.feeship?.toLocaleString("vi-VN")}₫</p>
        <p><strong>Thanh toán:</strong> {order.pay ? "Đã thanh toán" : "Chưa thanh toán"}</p>
        <p><strong>Ngày tạo:</strong> {new Date(order.create_time).toLocaleString("vi-VN")}</p>
        <p><strong>Địa chỉ:</strong> {order.address}</p>
        <p><strong>Ghi chú:</strong> {order.id_note?.content || "Không có"}</p>
        <p><strong>Mã giảm giá:</strong> {order.id_coupon?.code || "Không áp dụng"}</p>
        <p><strong>Phương thức thanh toán:</strong> {order.id_payment?.pay_name || "-"}</p>
      </div>

      <hr className="my-4" />
      <h2 className="text-xl font-semibold mb-2">Chi tiết sản phẩm:</h2>

      {detailOrders.length === 0 ? (
        <p className="text-gray-500">Không có sản phẩm nào.</p>
      ) : (
        <table className="w-full text-sm mt-2">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-left">
              <th className="py-2 px-4">Tên sản phẩm</th>
              {/* <th className="py-2 px-4">Size</th> */}
              <th className="py-2 px-4">Số lượng</th>
              <th className="py-2 px-4">Giá</th>
            </tr>
          </thead>
          <tbody>
            {detailOrders.map((item) => (
              <tr key={item._id} className="border-b dark:border-gray-600">
                <td className="py-2 px-4">{item.name_product || item.id_product?.name_product}</td>
                {/* <td className="py-2 px-4">{item.size}</td> */}
                <td className="py-2 px-4">{item.count}</td>
                <td className="py-2 px-4">{Number(item.price_product).toLocaleString("vi-VN")}₫</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderDetail;
