// src/pages/admin/EditUser.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const mockUsers = [
  { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com", role: "Admin" },
  { id: 2, name: "Trần Thị B", email: "b@gmail.com", role: "Khách hàng" },
  { id: 3, name: "Lê Văn C", email: "c@gmail.com", role: "Khách hàng" },
];

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const foundUser = mockUsers.find((u) => u.id === parseInt(id));
    if (foundUser) setUser(foundUser);
    else toast.error("Không tìm thấy người dùng");
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(`Đã cập nhật người dùng #${user.id}`);
    // TODO: Gọi API PUT / PATCH để lưu thay đổi nếu có backend
    navigate("/users");
  };

  if (!user) return null;

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Sửa người dùng #{user.id}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Tên
          </label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Vai trò
          </label>
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
          >
            <option value="Admin">Admin</option>
            <option value="Khách hàng">Khách hàng</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
};

export default EditUser;
