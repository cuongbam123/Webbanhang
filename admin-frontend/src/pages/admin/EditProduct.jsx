import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams(); // ✅ Lấy ID từ URL
  const navigate = useNavigate();

  // Giả lập dữ liệu sản phẩm (sau này sẽ gọi API GET theo ID)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
  });

  // ✅ useEffect để giả lập việc load dữ liệu từ API
  useEffect(() => {
    // Giả lập dữ liệu sản phẩm
    const mockData = {
      name: `Sản phẩm ${id}`,
      price: 100000,
      image: "https://via.placeholder.com/100",
    };

    setFormData(mockData);
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Gọi API cập nhật sản phẩm ở đây
    toast.success("Cập nhật sản phẩm thành công!");
    navigate("/products");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Sửa sản phẩm
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Tên sản phẩm
          </label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Giá (VNĐ)
          </label>
          <input
            type="number"
            name="price"
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            URL ảnh
          </label>
          <input
            type="text"
            name="image"
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="w-32 h-32 object-cover rounded mb-4"
          />
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
