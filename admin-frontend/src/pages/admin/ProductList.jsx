import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;


  // Gọi API lấy danh sách sản phẩm
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token"); // ✅ Lấy token từ FE lưu
      const res = await axios.get("http://localhost:3001/api/products", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Gửi token lên BE
        },
      });
      setProducts(res.data.data); // Lấy mảng sản phẩm từ res.data.data
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
      toast.error("❌ Lỗi khi tải danh sách sản phẩm");
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };
  

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xoá sản phẩm này?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        console.log("Xoá sản phẩm ID:", id);
        await axios.delete(`http://localhost:3001/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Nếu BE yêu cầu xác thực
          },
        });
        toast.success(`✅ Đã xoá sản phẩm ID: ${id}`);
        fetchProducts(); // Load lại danh sách
      } catch (error) {
        console.error(error);
        toast.error("❌ Không xoá được sản phẩm");
      }
    }
  };

  const handleAdd = () => {
    navigate("/admin/add-product");
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
    <div className="p-4 bg-white dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
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
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ➕ Thêm sản phẩm
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
              <th className="py-2 px-4 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
                // console.log("product:", product),
              <tr
                key={product._id}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <td className="py-2 px-4">
                  <img
                    src={product.image}
                    alt={product.name_product}
                    className="w-10 h-10 rounded object-cover"
                  />
                </td>
                <td className="py-2 px-4 text-gray-900 dark:text-white">
                  {product.name_product}
                </td>
                <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                  {Number(product.price_product).toLocaleString("vi-VN")}₫
                </td>
                <td className="py-2 px-4">
                  <button
                    className="text-blue-600 hover:underline mr-2"
                    onClick={() => handleEdit(product._id)}
                  >
                    Sửa
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(product._id)}
                  >
                    Xoá
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

      {/* PHÂN TRANG */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
