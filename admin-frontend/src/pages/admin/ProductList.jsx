import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();

  // 🔒 Kiểm tra đăng nhập & quyền admin
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role"); // lưu role khi login
    if (!token || role !== "admin") {
      toast.error("Bạn cần đăng nhập quyền admin!");
      navigate("/login");
    }
  }, [navigate]);

  // 🧩 State quản lý dữ liệu
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [oldImage, setOldImage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    ingredients: "",
    skinType: "all",
    stock: "",
    expiryDate: "",
    discount: "",
    category: "",
  });

  // 🧾 Lấy danh sách sản phẩm & danh mục
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3001/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data.data || []);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
      toast.error("❌ Không tải được danh sách sản phẩm");
    }
  };

  const fetchCategories = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/categories");

    console.log("📦 Categories từ server:", res.data); // kiểm tra
    // Vì API trả về mảng trực tiếp, ta gán thẳng res.data
    setCategories(Array.isArray(res.data) ? res.data : []);
  } catch (error) {
    console.error("❌ Lỗi khi tải danh mục:", error);
    toast.error("Không thể tải danh mục");
  }
};


  // ❌ Xoá sản phẩm
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá sản phẩm này?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3001/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("✅ Đã xoá sản phẩm!");
        fetchProducts();
      } catch (error) {
        console.error("Lỗi khi xoá sản phẩm:", error);
        toast.error("❌ Không xoá được sản phẩm");
      }
    }
  };

  // ✏️ Sửa sản phẩm
  const handleEdit = (p) => {
    setFormData({
      name: p.name,
      brand: p.brand,
      price: p.price,
      description: p.description,
      ingredients: p.ingredients || "",
      skinType: p.skinType || "all",
      stock: p.stock || "",
      expiryDate: p.expiryDate ? p.expiryDate.split("T")[0] : "",
      discount: p.discount || "",
      category: p.category?._id || "",
    });
    setOldImage(p.image);
    setImageFile(null);
    setEditId(p._id);
    setShowForm(true);
  };

  // 🖊️ Nhập dữ liệu form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 📷 Ảnh
  const handleImageChange = (e) => setImageFile(e.target.files[0]);

  // 💾 Gửi form thêm/sửa
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return toast.error("❌ Bạn chưa đăng nhập!");

    try {
      const data = new FormData();
      for (const key in formData) data.append(key, formData[key]);
      if (imageFile) data.append("image", imageFile);

      if (editId) {
        await axios.put(`http://localhost:3001/api/products/${editId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("✅ Cập nhật sản phẩm thành công!");
      } else {
        if (!imageFile) return toast.error("❌ Vui lòng chọn ảnh sản phẩm");
        await axios.post("http://localhost:3001/api/products", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("✅ Thêm sản phẩm mới thành công!");
      }

      setShowForm(false);
      setFormData({
        name: "",
        brand: "",
        price: "",
        description: "",
        ingredients: "",
        skinType: "all",
        stock: "",
        expiryDate: "",
        discount: "",
        category: "",
      });
      setImageFile(null);
      setOldImage("");
      setEditId(null);
      fetchProducts();
    } catch (error) {
      console.error("Lỗi khi thêm/sửa sản phẩm:", error);
      toast.error("❌ Có lỗi xảy ra khi lưu sản phẩm");
    }
  };

  // 🔍 Tìm kiếm
  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🖥️ Giao diện
  return (
    <div className="p-4 bg-white dark:bg-gray-900 min-h-full text-gray-800 dark:text-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold mb-6">💄 Quản lý sản phẩm mỹ phẩm</h1>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            className="p-2 border rounded w-64 dark:bg-gray-800 dark:text-white"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => {
              setShowForm(true);
              setEditId(null);
              setFormData({
                name: "",
                brand: "",
                price: "",
                description: "",
                ingredients: "",
                skinType: "all",
                stock: "",
                expiryDate: "",
                discount: "",
                category: "",
              });
              setImageFile(null);
              setOldImage("");
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            + Thêm sản phẩm
          </button>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow rounded-lg">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="py-2 px-4">Ảnh</th>
              <th className="py-2 px-4 text-left">Tên</th>
              <th className="py-2 px-4 text-left">Thương hiệu</th>
              <th className="py-2 px-4 text-left">Giá</th>
              <th className="py-2 px-4 text-left">Danh mục</th>
              <th className="py-2 px-4 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p, idx) => (
              <tr
                key={p._id || idx}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <td className="py-2 px-4">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-4">{p.name}</td>
                <td className="py-2 px-4">{p.brand}</td>
                <td className="py-2 px-4">
                  {p.price?.toLocaleString("vi-VN")}₫
                </td>
                <td className="py-2 px-4">{p.category?.name || "Chưa có"}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Sửa"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Xoá"
                  >
                    <FiTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <p className="text-center mt-4 text-gray-500">Không có sản phẩm nào.</p>
        )}
      </div>

      {/* Form thêm/sửa */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-3xl">
            <h2 className="text-xl font-bold mb-4">
              {editId ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
            </h2>
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tên sản phẩm"
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Thương hiệu"
                  className="p-2 border rounded"
                />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Giá"
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Số lượng"
                  className="p-2 border rounded"
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="p-2 border rounded"
                  required
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <select
                  name="skinType"
                  value={formData.skinType}
                  onChange={handleChange}
                  className="p-2 border rounded"
                >
                  <option value="all">Mọi loại da</option>
                  <option value="dry">Da khô</option>
                  <option value="oily">Da dầu</option>
                  <option value="sensitive">Da nhạy cảm</option>
                  <option value="normal">Da thường</option>
                </select>
              </div>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Mô tả sản phẩm..."
                className="w-full p-2 border rounded"
                rows={4}
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />
              {(imageFile || oldImage) && (
                <img
                  src={imageFile ? URL.createObjectURL(imageFile) : oldImage}
                  alt="preview"
                  className="w-32 h-32 mt-2 object-cover rounded"
                />
              )}

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {editId ? "Cập nhật" : "Thêm mới"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Huỷ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
