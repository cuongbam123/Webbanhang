import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OrderList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data.data);
    } catch (err) {
      console.error("Lỗi khi tải đơn hàng:", err);
      toast.error("❌ Lỗi khi tải danh sách đơn hàng");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:3001/api/orders/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`Đã cập nhật đơn hàng #${id} thành \"${newStatus}\"`);
      fetchOrders();
    } catch (err) {
      console.error("Cập nhật đơn hàng lỗi:", err);
      toast.error("❌ Không cập nhật được đơn hàng");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchStatus = statusFilter === "Tất cả" || order.status === statusFilter;
    const name = order.id_user?.fullname || order.id_user?.username || "Ẩn danh";
    const matchSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

  return (
    <div className="p-4 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Quản lý đơn hàng
      </h1>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Tìm theo tên khách hàng..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="p-2 border rounded dark:bg-gray-800 dark:text-white w-full md:w-1/2"
        />
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="p-2 border rounded dark:bg-gray-800 dark:text-white"
        >
          <option value="Tất cả">Tất cả trạng thái</option>
          <option value="Đang xử lý">Đang xử lý</option>
          <option value="Đã giao">Đã giao</option>
          <option value="Huỷ">Huỷ</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow rounded-lg">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Khách hàng</th>
              <th className="py-2 px-4 text-left">Tổng tiền</th>
              <th className="py-2 px-4 text-left">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => (
              <tr
                key={order._id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => navigate(`/orders/${order._id}`)}
              >
                <td className="py-2 px-4 text-gray-900 dark:text-white">{order._id}</td>
                <td className="py-2 px-4 text-gray-800 dark:text-white">
                  {order.id_user?.fullname || order.id_user?.username || "Ẩn danh"}
                </td>
                <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                  {Number(order.total).toLocaleString("vi-VN")}₫
                </td>
                <td className="py-2 px-4">
                  <select
                    value={order.status || "Đang xử lý"}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className={`p-1 rounded border dark:bg-gray-800 dark:text-white ${
                      order.status === "Đã giao"
                        ? "bg-green-100"
                        : order.status === "Đang xử lý"
                        ? "bg-yellow-100"
                        : "bg-red-100"
                    }`}
                  >
                    <option>Đang xử lý</option>
                    <option>Đã giao</option>
                    <option>Huỷ</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <p className="mt-4 text-center text-gray-500 dark:text-gray-400">
            Không có đơn hàng nào phù hợp.
          </p>
        )}
      </div>

      {filteredOrders.length > ordersPerPage && (
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            ← Trước
          </button>
          <span className="text-gray-800 dark:text-white mt-2">
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Sau →
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderList;