import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!");
      return;
    }

    try {
      setLoading(true);

      // 🧠 Gửi username + password (đúng với backend)
      const res = await axios.post("https://my-backend-gbqg.onrender.com/api/users/login", {
        username,
        password,
      });

      const { token, role, user } = res.data;

      if (!token) {
        toast.error("Không nhận được token từ server!");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role || user?.role);
      localStorage.setItem("user", JSON.stringify(user));

      if (role === "admin" || user?.role === "admin") {
        toast.success("Đăng nhập thành công ✅");
        navigate("/admin/products");
      } else {
        toast.error("Tài khoản này không có quyền admin!");
        localStorage.clear();
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      const msg =
        error.response?.data?.message || "Sai tài khoản hoặc mật khẩu!";
      toast.error("❌ " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Đăng nhập Admin
        </h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Tên đăng nhập"
            className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full p-2 border rounded mb-6 dark:bg-gray-700 dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 rounded text-white font-bold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
