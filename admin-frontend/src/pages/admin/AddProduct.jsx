import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name_product: "",
    price_product: "",
    describe: "",
    number: "",
    id_category: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      for (let key in formData) {
        data.append(key, formData[key]);
      }
      if (imageFile) {
        data.append("image", imageFile);
      }

      await axios.post("http://localhost:3001/api/products", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("✅ Thêm sản phẩm thành công!");
      navigate("/admin/products");
    } catch (error) {
      toast.error("❌ Lỗi khi thêm sản phẩm");
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-6">Thêm sản phẩm mới</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4" encType="multipart/form-data">
        <div>
          <label className="block mb-1">Tên sản phẩm</label>
          <input
            type="text"
            name="name_product"
            value={formData.name_product}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Giá</label>
          <input
            type="number"
            name="price_product"
            value={formData.price_product}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Mô tả</label>
          <textarea
            name="describe"
            value={formData.describe}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-1">Số lượng</label>
          <input
            type="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-1">ID danh mục</label>
          <input
            type="text"
            name="id_category"
            value={formData.id_category}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Ảnh sản phẩm</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-gray-700 dark:text-white"
          />
        </div>

        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            className="w-32 h-32 object-cover rounded"
          />
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Thêm sản phẩm
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
