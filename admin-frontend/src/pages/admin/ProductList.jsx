import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiEdit, FiTrash } from "react-icons/fi";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name_product: "",
    price_product: "",
    describe: "",
    number: "",
    id_category: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [oldImage, setOldImage] = useState("");

  const productsPerPage = 4;
  const [expandedRows, setExpandedRows] = useState({});

  const toggleDescription = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("❌ Không tìm thấy token. Vui lòng đăng nhập lại.");
        return;
      }
      const res = await axios.get("http://localhost:3001/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data.data);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
      toast.error("❌ Lỗi khi tải danh sách sản phẩm");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá sản phẩm này?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3001/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success(`✅ Đã xoá sản phẩm ID: ${id}`);
        fetchProducts();
      } catch (error) {
        console.error(error);
        toast.error("❌ Không xoá được sản phẩm");
      }
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name_product: product.name_product,
      price_product: product.price_product,
      describe: product.describe,
      number: product.number,
      id_category: product.id_category,
    });
    setOldImage(product.image);
    setImageFile(null);
    setEditId(product._id);
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("❌ Không tìm thấy token. Vui lòng đăng nhập lại.");
      return;
    }

    try {
      const data = new FormData();
      for (let key in formData) {
        data.append(key, formData[key]);
      }
      if (imageFile) {
        data.append("image", imageFile);
      }

      if (editId) {
        await axios.put(`http://localhost:3001/api/products/${editId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("✅ Sửa sản phẩm thành công!");
      } else {
        if (!imageFile) {
          toast.error("❌ Bạn chưa chọn ảnh sản phẩm");
          return;
        }
        await axios.post("http://localhost:3001/api/products", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("✅ Thêm sản phẩm thành công!");
      }

      setShowForm(false);
      setFormData({
        name_product: "",
        price_product: "",
        describe: "",
        number: "",
        id_category: "",
      });
      setImageFile(null);
      setOldImage("");
      setEditId(null);
      fetchProducts();
    } catch (error) {
      console.error("Lỗi khi thêm/sửa sản phẩm:", error);
      toast.error("❌ Lỗi khi thêm/sửa sản phẩm");
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name_product?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="p-4 bg-white dark:bg-gray-900 min-h-full text-gray-800 dark:text-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Danh sách sản phẩm
        </h1>

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
              setFormData({
                name_product: "",
                price_product: "",
                describe: "",
                number: "",
                id_category: "",
              });
              setImageFile(null);
              setOldImage("");
              setEditId(null);
            }}
            className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded shadow-lg group bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-600 hover:via-blue-600 hover:to-blue-700 transition-all duration-300"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full duration-300 transform translate-x-full bg-white bg-opacity-10 group-hover:translate-x-0"></span>
            <span className="relative z-10">➕ Thêm sản phẩm</span>
          </button>

        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow rounded-lg">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="py-2 px-4 text-left">Ảnh</th>
              <th className="py-2 px-4 text-left">Tên</th>
              <th className="py-2 px-4 text-left">Giá</th>
              <th className="py-2 px-4 text-left">Số lượng</th>
              <th className="py-2 px-4 text-left">Mô tả</th>
              <th className="py-2 px-4 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, idx) => (
              <tr
                key={product._id ?? product.name_product + idx}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <td className="py-2 px-4">
                  <img
                    src={product.image}
                    alt={product.name_product}
                    className="w-28 h-28 rounded object-cover mx-auto"
                  />
                </td>
                <td className="py-2 px-2 max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {product.name_product}
                </td>
                <td className="py-2 px-4">
                  {Number(product.price_product).toLocaleString("vi-VN")}₫
                </td>
                <td className="py-2 px-4">{product.number}</td>
                <td className="py-2 px-2 max-w-[300px] whitespace-normal break-words">
                  {expandedRows[product._id]
                    ? product.describe
                    : product.describe.length > 36
                      ? `${product.describe.slice(0, 36)}...`
                      : product.describe}

                  {product.describe.length > 36 && (
                    <button
                      onClick={() => toggleDescription(product._id)}
                      className="ml-2 text-blue-600 hover:underline focus:outline-none"
                    >
                      {expandedRows[product._id] ? "Thu gọn" : "Xem thêm"}
                    </button>
                  )}
                </td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => handleEdit(product)}
                    title="Sửa"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(product._id)}
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
          <p className="text-center mt-4 text-gray-500 dark:text-gray-400">
            Không tìm thấy sản phẩm phù hợp.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative w-full max-w-3xl bg-gray-100 rounded-lg shadow p-6 m-4 overflow-y-auto">
            <button
              onClick={() => {
                setShowForm(false);
                setFormData({
                  name_product: "",
                  price_product: "",
                  describe: "",
                  number: "",
                  id_category: "",
                });
                setImageFile(null);
                setOldImage("");
                setEditId(null);
              }}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl font-bold"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              {editId ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[150px]">
                  <label className="block mb-1">Tên sản phẩm</label>
                  <input
                    type="text"
                    name="name_product"
                    value={formData.name_product}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
                    required
                  />
                </div>
                <div className="flex-1 min-w-[150px]">
                  <label className="block mb-1">Giá</label>
                  <input
                    type="number"
                    name="price_product"
                    value={formData.price_product}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
                    required
                  />
                </div>
                <div className="flex-1 min-w-[150px]">
                  <label className="block mb-1">Số lượng</label>
                  <input
                    type="number"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1">Mô tả</label>
                <textarea
                  name="describe"
                  value={formData.describe}
                  onChange={handleChange}
                  className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
                  rows={5}
                />
              </div>

              <div className="flex flex-wrap gap-4 items-start">
                <div className="flex-1 min-w-[200px]">
                  <label className="block mb-1">Ảnh sản phẩm</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-gray-700 dark:text-white"
                  />
                  {(imageFile || oldImage) && (
                    <div className="mt-2">
                      <img
                        src={imageFile ? URL.createObjectURL(imageFile) : oldImage}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-[200px]">
                  <label className="block mb-1">Danh mục</label>
                  <select
                    name="id_category"
                    value={formData.id_category}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
                    required
                  >
                    <option value="">-- Chọn danh mục --</option>
                    <option value="laptop">Laptop</option>
                    <option value="dien-thoai">Điện thoại</option>
                    <option value="phu-kien">Phụ kiện</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded shadow-lg group bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-600 hover:via-blue-600 hover:to-blue-700 transition-all duration-300"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full duration-300 transform translate-x-full bg-white bg-opacity-10 group-hover:translate-x-0"></span>
                  <span className="relative z-10">{editId ? "Cập nhật" : "Thêm sản phẩm"}</span>
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
