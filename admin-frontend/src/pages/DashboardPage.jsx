import React, { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const data = [
  { name: "Tháng 1", doanhThu: 400000 },
  { name: "Tháng 2", doanhThu: 300000 },
  { name: "Tháng 3", doanhThu: 500000 },
  { name: "Tháng 4", doanhThu: 700000 },
  { name: "Tháng 5", doanhThu: 600000 },
  { name: "Tháng 6", doanhThu: 800000 },
];

const orders = [
  {
    id: 1,
    customer: "Nguyễn Văn A",
    total: "1.200.000₫",
    status: "Đã giao",
    date: "2025-06-25",
  },
  {
    id: 2,
    customer: "Trần Thị B",
    total: "950.000₫",
    status: "Đang xử lý",
    date: "2025-06-26",
  },
  {
    id: 3,
    customer: "Lê Văn C",
    total: "2.150.000₫",
    status: "Đã huỷ",
    date: "2025-06-24",
  },
  {
    id: 4,
    customer: "Phạm Thị D",
    total: "850.000₫",
    status: "Đang giao",
    date: "2025-06-27",
  },
];

function DashboardPage() {
  const [tab, setTab] = useState("line"); // "line" | "bar" | "orders"

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-full">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Trang Admin Dashboard
      </h1>

      {/* Box thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded shadow">
          <h2 className="text-gray-800 dark:text-white">Sản phẩm</h2>
          <p className="text-2xl font-bold text-blue-800 dark:text-white">120</p>
        </div>
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded shadow">
          <h2 className="text-gray-800 dark:text-white">Đơn hàng</h2>
          <p className="text-2xl font-bold text-green-800 dark:text-white">90</p>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded shadow">
          <h2 className="text-gray-800 dark:text-white">Người dùng</h2>
          <p className="text-2xl font-bold text-yellow-800 dark:text-white">350</p>
        </div>
      </div>

      {/* TAB switch */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab("line")}
          className={`px-4 py-2 rounded ${tab === "line"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
            }`}
        >
          Biểu đồ đường
        </button>
        <button
          onClick={() => setTab("bar")}
          className={`px-4 py-2 rounded ${tab === "bar"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
            }`}
        >
          Biểu đồ cột
        </button>
        <button
          onClick={() => setTab("orders")}
          className={`px-4 py-2 rounded ${tab === "orders"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
            }`}
        >
          Đơn hàng mới
        </button>
      </div>

      {/* Hiển thị nội dung theo tab */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        {tab === "line" && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Doanh thu theo tháng (Biểu đồ đường)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <Line
                  type="monotone"
                  dataKey="doanhThu"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}

        {tab === "bar" && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Doanh thu theo tháng (Biểu đồ cột)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Bar dataKey="doanhThu" fill="#38bdf8" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}

        {tab === "orders" && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Đơn hàng mới nhất
            </h2>
            <table className="min-w-full text-left">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
                <tr>
                  <th className="py-2 px-4">Khách hàng</th>
                  <th className="py-2 px-4">Tổng tiền</th>
                  <th className="py-2 px-4">Trạng thái</th>
                  <th className="py-2 px-4">Ngày đặt</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <td className="py-2 px-4 text-gray-900 dark:text-white">
                      {order.customer}
                    </td>
                    <td className="py-2 px-4 text-blue-600 dark:text-blue-400">
                      {order.total}
                    </td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 text-sm rounded-full font-medium ${order.status === "Đã giao"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : order.status === "Đang xử lý"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            : order.status === "Đã huỷ"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
