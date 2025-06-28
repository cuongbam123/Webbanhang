// src/pages/admin/EditUser.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/users/admin/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (error) {
        toast.error("Không thể tải người dùng");
        console.error(error);
      }
    };
    fetchUser();
  }, [id, token]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('token:', token);
      await axios.put(`http://localhost:3001/api/users/users/${id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Cập nhật người dùng thành công!");
      navigate("/admin/users");
    } catch (error) {
      toast.error("Lỗi khi cập nhật người dùng");
      console.error(error);
    }
  };

  if (!user) return <p className="text-center text-white">Đang tải...</p>;

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Sửa người dùng #{user._id}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Họ tên
          </label>
          <input
            type="text"
            name="fullname"
            value={user.fullname}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Tên đăng nhập
          </label>
          <input
            type="text"
            name="username"
            value={user.username}
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
            disabled // email thường không sửa
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
            <option value="admin">Admin</option>
            <option value="user">Khách hàng</option>
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
