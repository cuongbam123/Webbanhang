import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Danh sách đơn hàng giả lập
const mockOrders = [
  {
    id: 1,
    customer: "Nguyễn Văn A",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    phone: "0901234567",
    status: "Đã giao",
    items: [
      { name: "Sản phẩm 1", quantity: 2, price: 200000 },
      { name: "Sản phẩm 2", quantity: 1, price: 300000 },
    ],
  },
  {
    id: 2,
    customer: "Trần Thị B",
    address: "456 Đường XYZ, Quận 3, TP.HCM",
    phone: "0912345678",
    status: "Đang xử lý",
    items: [
      { name: "Sản phẩm A", quantity: 1, price: 500000 },
      { name: "Sản phẩm B", quantity: 3, price: 150000 },
    ],
  },
  // Thêm đơn hàng khác nếu cần
];

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const order = mockOrders.find((o) => o.id === Number(id));

  if (!order) {
    return (
      <div className="p-6 text-red-500 dark:text-red-400">
        Đơn hàng không tồn tại.
        <button
          onClick={() => navigate(-1)}
          className="block mt-4 text-blue-600 hover:underline"
        >
          ← Quay lại
        </button>
      </div>
    );
  }

  const total = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:underline mb-4"
      >
        <ArrowLeft size={16} className="mr-1" />
        Quay lại
      </button>

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Chi tiết đơn hàng #{order.id}
      </h1>

      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow mb-6">
        <p className="text-gray-800 dark:text-gray-300">
          <strong>Khách hàng:</strong> {order.customer}
        </p>
        <p className="text-gray-800 dark:text-gray-300">
          <strong>SĐT:</strong> {order.phone}
        </p>
        <p className="text-gray-800 dark:text-gray-300">
          <strong>Địa chỉ:</strong> {order.address}
        </p>
        <p className="text-gray-800 dark:text-gray-300">
          <strong>Trạng thái:</strong> {order.status}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow rounded-lg">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="py-2 px-4 text-left">Tên sản phẩm</th>
              <th className="py-2 px-4 text-left">Số lượng</th>
              <th className="py-2 px-4 text-left">Đơn giá</th>
              <th className="py-2 px-4 text-left">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <td className="py-2 px-4 text-gray-900 dark:text-white">{item.name}</td>
                <td className="py-2 px-4 text-gray-700 dark:text-gray-300">{item.quantity}</td>
                <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                  {item.price.toLocaleString("vi-VN")}₫
                </td>
                <td className="py-2 px-4 text-gray-800 dark:text-gray-200 font-medium">
                  {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right mt-6 text-xl font-semibold text-gray-900 dark:text-white">
        Tổng tiền: {total.toLocaleString("vi-VN")}₫
      </div>
    </div>
  );
};

export default OrderDetail;
