import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { toast } from "react-toastify";

function DashboardPage() {
  const [tab, setTab] = useState("line");
  const [chartData, setChartData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0 });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        // 📊 Doanh thu theo tháng
        const resChart = await axios.get("https://my-backend-gbqg.onrender.com/api/orders/stats/monthly", { headers });
        setChartData(resChart.data.data);

        // 🧾 Danh sách đơn hàng (admin)
        const resOrders = await axios.get("https://my-backend-gbqg.onrender.com/api/orders", { headers });
        const orderList = resOrders.data.data || [];

        // 🧮 Tính tổng thống kê
        setStats({
          products: 120, // nếu có API thì fetch từ /api/products
          orders: orderList.length,
          users: 350, // tương tự /api/users
        });

        // 🆕 Lấy 5 đơn hàng mới nhất
        setOrders(orderList.slice(0, 5));
      } catch (err) {
        console.error("Dashboard error:", err);
        toast.error("Không thể tải dữ liệu Dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [token]);

  if (loading) {
    return <p className="p-6 text-center text-gray-500">Đang tải dữ liệu...</p>;
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-full">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Trang Admin Dashboard
      </h1>

      {/* Box thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded shadow">
          <h2 className="text-gray-800 dark:text-white">Sản phẩm</h2>
          <p className="text-2xl font-bold text-blue-800 dark:text-white">
            {stats.products}
          </p>
        </div>
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded shadow">
          <h2 className="text-gray-800 dark:text-white">Đơn hàng</h2>
          <p className="text-2xl font-bold text-green-800 dark:text-white">
            {stats.orders}
          </p>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded shadow">
          <h2 className="text-gray-800 dark:text-white">Người dùng</h2>
          <p className="text-2xl font-bold text-yellow-800 dark:text-white">
            {stats.users}
          </p>
        </div>
      </div>

      {/* TAB switch */}
      <div className="flex gap-2 mb-4">
        {["line", "bar", "orders"].map((key) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 rounded transition ${
              tab === key
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
            }`}
          >
            {key === "line"
              ? "Biểu đồ đường"
              : key === "bar"
              ? "Biểu đồ cột"
              : "Đơn hàng mới"}
          </button>
        ))}
      </div>

      {/* Hiển thị nội dung */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        {tab === "line" && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Doanh thu theo tháng (Biểu đồ đường)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <Line type="monotone" dataKey="doanhThu" stroke="#2563eb" strokeWidth={3} />
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
              <BarChart data={chartData}>
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
                  <tr key={order._id} className="border-b dark:border-gray-700">
                    <td className="py-2 px-4 text-gray-900 dark:text-white">
                      {order.user?.fullname || "Khách hàng"}
                    </td>
                    <td className="py-2 px-4 text-blue-600 dark:text-blue-400">
                      {order.total?.toLocaleString("vi-VN")}₫
                    </td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 text-sm rounded-full font-medium ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            : order.status === "cancelled"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        }`}
                      >
                        {order.status === "pending"
                          ? "Đang xử lý"
                          : order.status === "delivered"
                          ? "Đã giao"
                          : order.status === "cancelled"
                          ? "Đã hủy"
                          : order.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                      {new Date(order.createdAt).toLocaleDateString("vi-VN")}
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
