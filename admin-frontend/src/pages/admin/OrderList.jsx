import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const mockOrders = [
  { id: 1, customer: "Nguyễn Văn A", total: 1200000, status: "Đang xử lý" },
  { id: 2, customer: "Trần Thị B", total: 850000, status: "Đã giao" },
  { id: 3, customer: "Lê Văn C", total: 650000, status: "Huỷ" },
  { id: 4, customer: "Phạm Thị D", total: 760000, status: "Đang xử lý" },
  { id: 5, customer: "Ngô Văn E", total: 990000, status: "Đã giao" },
  { id: 6, customer: "Mai Thị F", total: 430000, status: "Đang xử lý" },
  { id: 7, customer: "Bùi Văn G", total: 590000, status: "Huỷ" },
];

const OrderList = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState(mockOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  // Lọc theo trạng thái và từ khoá tìm kiếm
  const filteredOrders = orders.filter((order) => {
    const matchStatus = statusFilter === "Tất cả" || order.status === statusFilter;
    const matchSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  // Phân trang
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

  const handleStatusChange = (id, newStatus) => {
    const updated = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updated);
    toast.success(`Đã cập nhật đơn hàng #${id} thành "${newStatus}"`);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Quản lý đơn hàng
      </h1>

      {/* Bộ lọc + tìm kiếm */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Tìm theo tên khách hàng..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset lại trang
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

      {/* Bảng đơn hàng */}
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
                key={order.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => navigate(`/orders/${order.id}`)}
              >
                <td className="py-2 px-4 text-gray-900 dark:text-white">{order.id}</td>
                <td className="py-2 px-4 text-gray-800 dark:text-white">
                  {order.customer}
                </td>
                <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                  {order.total.toLocaleString("vi-VN")}₫
                </td>
                <td className="py-2 px-4">
                  <select
                    value={order.status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
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

        {/* Không có đơn */}
        {filteredOrders.length === 0 && (
          <p className="mt-4 text-center text-gray-500 dark:text-gray-400">
            Không có đơn hàng nào phù hợp.
          </p>
        )}
      </div>

      {/* Phân trang */}
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
