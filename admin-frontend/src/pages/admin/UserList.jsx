import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Edit, Trash2, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { getToken } from "../utils/auth"; // Tạo file utils nếu chưa có

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("Tất cả");

  useEffect(() => {
    fetchUsers();
  }, []);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/users/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Đã xoá người dùng!");
      fetchUsers();
    } catch (err) {
      toast.error("Lỗi khi xoá");
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-user/${id}`);
  };

  const handleAddUser = () => {
    navigate("/admin/add-user");
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
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Quản lý người dùng
        </h1>
        <button
          onClick={handleAddUser}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          <UserPlus size={18} />
          Thêm người dùng
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
                <button
                  onClick={() => handleEdit(user._id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-600 hover:text-red-800"
                >
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
    </div>
  );
};

export default UserList;
