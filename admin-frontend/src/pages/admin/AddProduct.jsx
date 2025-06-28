import React, { useState } from "react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sản phẩm mới:", product);
    alert("Đã thêm sản phẩm mới!");
    // TODO: gọi API POST đến backend sau khi kết nối thật
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-6">Thêm sản phẩm mới</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="block mb-1">Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Giá</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1">URL ảnh</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
          />
        </div>
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
