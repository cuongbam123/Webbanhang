import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const mockProducts = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: `Sản phẩm ${i + 1}`,
  price: (100 + i * 10).toLocaleString("vi-VN") + "₫",
  image: "https://via.placeholder.com/50",
}));

const ProductList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const filteredProducts = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xoá sản phẩm này?");
    if (confirmDelete) {
      toast.success(`✅ Đã xoá sản phẩm ID: ${id}`);
      // TODO: Gọi API xoá sản phẩm thật sau
    }
  };

  const handleAdd = () => {
    navigate("/add-product");
  };

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
              <tr
                key={product.id}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <td className="py-2 px-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded"
                  />
                </td>
                <td className="py-2 px-4 text-gray-900 dark:text-white">
                  {product.name}
                </td>
                <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                  {product.price}
                </td>
                <td className="py-2 px-4">
                  <button
                    className="text-blue-600 hover:underline mr-2"
                    onClick={() => handleEdit(product.id)}
                  >
                    Sửa
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(product.id)}
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
