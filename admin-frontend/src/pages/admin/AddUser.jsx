import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddUser = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Khách hàng",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    // TODO: Gọi API thật tại đây (hiện chỉ giả lập)
    console.log("Thêm người dùng mới:", form);
    toast.success("Đã thêm người dùng mới!");

    navigate("/users");
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
            name="name"
            type="text"
            placeholder="Nhập tên..."
            value={form.name}
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
            <option value="Khách hàng">Khách hàng</option>
            <option value="Admin">Admin</option>
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
            onClick={() => navigate("/users")}
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
