import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddUser = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    role: "user", // BE: 'user' hoặc 'admin'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullname, username, email, password, role } = form;

    if (!fullname || !username || !email || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:3001/api/users/register", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Đã thêm người dùng mới!");
      navigate("/admin/users");
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Lỗi khi thêm người dùng!");
      }
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Thêm người dùng
      </h1>

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="block mb-1 text-gray-800 dark:text-white">Họ và tên:</label>
          <input
            name="fullname"
            type="text"
            placeholder="Nhập tên..."
            value={form.fullname}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-800 dark:text-white">Tên đăng nhập:</label>
          <input
            name="username"
            type="text"
            placeholder="Nhập tên đăng nhập..."
            value={form.username}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-800 dark:text-white">Email:</label>
          <input
            name="email"
            type="email"
            placeholder="Nhập email..."
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-800 dark:text-white">Mật khẩu:</label>
          <input
            name="password"
            type="password"
            placeholder="Nhập mật khẩu..."
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-800 dark:text-white">Vai trò:</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
          >
            <option value="user">Khách hàng</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Thêm
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/users")}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Huỷ
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
