import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Edit, Trash2, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("Tất cả");
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "user",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/users/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      toast.error("Lỗi khi tải danh sách người dùng");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá người dùng này?")) return;
    try {
      await axios.delete(`http://localhost:3001/api/users/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Đã xoá người dùng!");
      fetchUsers();
    } catch (err) {
      toast.error("Lỗi khi xoá");
    }
  };

  const openAddForm = () => {
    setEditingUser(null);
    setForm({ fullname: "", email: "", password: "", role: "user" });
    setShowForm(true);
  };

  const openEditForm = (user) => {
    setEditingUser(user);
    setForm({ ...user, password: "" });
    setShowForm(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // Gọi API cập nhật
        await axios.put(`http://localhost:3001/api/users/admin/users/${editingUser._id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Đã cập nhật người dùng!");
      } else {
        // Gọi API thêm
        await axios.post(`http://localhost:3001/api/users/admin/users`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Đã thêm người dùng!");
      }
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      toast.error("Lỗi khi lưu");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      roleFilter === "Tất cả" ||
      (roleFilter === "Admin" && user.role === "admin") ||
      (roleFilter === "Khách hàng" && user.role === "user");
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-4 bg-white dark:bg-gray-900 min-h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quản lý người dùng</h1>
        <button
          onClick={openAddForm}
          className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded shadow-lg group bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-600 hover:via-blue-600 hover:to-blue-700 transition-all duration-300"
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full duration-300 transform translate-x-full bg-white bg-opacity-10 group-hover:translate-x-0"></span>
          <span className="relative z-10 flex items-center gap-2">
            <UserPlus size={18} />
            Thêm người dùng
          </span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Tìm theo tên hoặc email..."
          className="p-2 border rounded dark:bg-gray-800 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="p-2 border rounded dark:bg-gray-800 dark:text-white"
        >
          <option value="Tất cả">Tất cả vai trò</option>
          <option value="Admin">Admin</option>
          <option value="Khách hàng">Khách hàng</option>
        </select>
      </div>

      <table className="min-w-full bg-white dark:bg-gray-800 shadow rounded-lg">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Tên</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Vai trò</th>
            <th className="py-2 px-4 text-left">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr
              key={user._id}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="py-2 px-4 text-gray-900 dark:text-white">{user._id}</td>
              <td className="py-2 px-4 text-gray-800 dark:text-white">{user.fullname}</td>
              <td className="py-2 px-4 text-gray-700 dark:text-gray-300">{user.email}</td>
              <td className="py-2 px-4 text-gray-700 dark:text-gray-300">{user.role === "admin" ? "Admin" : "Khách hàng"}</td>
              <td className="py-2 px-4 flex gap-2">
                <button onClick={() => openEditForm(user)} className="text-blue-600 hover:text-blue-800">
                  <Edit size={18} />
                </button>
                <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:text-red-800">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredUsers.length === 0 && (
        <p className="mt-4 text-center text-gray-500 dark:text-gray-400">
          Không có người dùng nào phù hợp.
        </p>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              {editingUser ? `Sửa người dùng` : "Thêm người dùng"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300">Họ và tên</label>
                <input
                  name="fullname"
                  type="text"
                  value={form.fullname}
                  onChange={handleChange}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              {!editingUser && (
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">Mật khẩu</label>
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              )}
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300">Vai trò</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                >
                  <option value="user">Khách hàng</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                {/* Nút Thêm/Lưu */}
                <button
                  type="submit"
                  className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded shadow-lg group bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-600 hover:via-blue-600 hover:to-blue-700 transition-all duration-300"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full duration-300 transform translate-x-full bg-white bg-opacity-10 group-hover:translate-x-0"></span>
                  <span className="relative z-10">{editingUser ? " Lưu" : " Thêm"}</span>
                </button>

                {/* Nút Huỷ */}
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded shadow-lg group bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 transition-all duration-300"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full duration-300 transform translate-x-full bg-white bg-opacity-10 group-hover:translate-x-0"></span>
                  <span className="relative z-10">Huỷ</span>
                </button>

              </div>


            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
