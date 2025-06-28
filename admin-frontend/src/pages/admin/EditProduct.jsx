import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name_product: "",
    price_product: "",
    describe: "",
    number: "",
    id_category: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);

  // ✅ Lấy dữ liệu sản phẩm hiện tại
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(res.data);
      } catch (error) {
        toast.error("❌ Không tải được sản phẩm");
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name_product", formData.name_product);
      data.append("price_product", formData.price_product);
      data.append("describe", formData.describe);
      data.append("number", formData.number);
      data.append("id_category", formData.id_category);

      if (imageFile) {
        data.append("image", imageFile);
      }

      await axios.put(`http://localhost:3001/api/products/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("✅ Cập nhật sản phẩm thành công");
      navigate("/admin/products");
    } catch (error) {
      toast.error("❌ Lỗi khi cập nhật sản phẩm");
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Sửa sản phẩm
      </h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
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

        <div className="mb-4">
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

        <div className="mb-4">
          <label className="block mb-1">Mô tả</label>
          <textarea
            name="describe"
            value={formData.describe}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Số lượng</label>
          <input
            type="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">ID danh mục</label>
          <input
            type="text"
            name="id_category"
            value={formData.id_category}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Cập nhật ảnh mới (tuỳ chọn)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-gray-700 dark:text-white"
          />
        </div>

        {formData.image && (
          <div className="mb-4">
            <label className="block mb-1">Ảnh hiện tại</label>
            <img
              src={formData.image}
              alt="Ảnh sản phẩm"
              className="w-32 h-32 object-cover rounded"
            />
          </div>
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
