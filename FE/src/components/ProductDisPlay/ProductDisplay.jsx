import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router-dom";

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const navigate = useNavigate();

  if (!product) return <p>Đang tải sản phẩm...</p>;

  // ✅ Lấy BASE_URL từ .env
  const BASE_URL =
    process.env.REACT_APP_BASE_URL || "https://my-backend-gbqg.onrender.com";

  // ✅ Chuẩn hoá đường dẫn ảnh (fix localhost, thêm BASE_URL nếu thiếu)
  const normalizeImageUrl = (img) => {
    if (!img) return "";

    // Nếu là localhost → thay bằng domain thật
    if (img.startsWith("http://localhost:3001")) {
      return img.replace("http://localhost:3001", BASE_URL);
    }

    // Nếu là http/https hợp lệ → giữ nguyên
    if (img.startsWith("http://") || img.startsWith("https://")) {
      return img;
    }

    // Nếu có dấu / ở đầu → thêm BASE_URL
    if (img.startsWith("/")) {
      return `${BASE_URL}${img}`;
    }

    // Nếu không có / → thêm BASE_URL + /
    return `${BASE_URL}/${img}`;
  };

  // ✅ Gọi hàm xử lý ảnh
  const imageUrl = normalizeImageUrl(product.image);

  // Debug (chỉ để kiểm tra khi dev)
  if (process.env.NODE_ENV === "development") {
    console.log("🖼️ ProductDisplay imageUrl:", imageUrl);
  }

  return (
    <div className="productdisplay">
      {/* 🖼️ Hình ảnh */}
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {[...Array(4)].map((_, i) => (
            <img key={i} src={imageUrl} alt={product.name} />
          ))}
        </div>
        <div className="productdisplay-mig">
          <img
            className="productdisplay-main-img"
            src={imageUrl}
            alt={product.name}
          />
        </div>
      </div>

      {/* 🧾 Thông tin */}
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-brand">
          <strong>Thương hiệu:</strong> {product.brand || "Không rõ"}
        </div>

        <div className="productdisplay-right-stars">
          {[...Array(4)].map((_, i) => (
            <img key={i} src={star_icon} alt="⭐" />
          ))}
          <img src={star_dull_icon} alt="☆" />
          <p>(122)</p>
        </div>

        {/* 💰 Giá */}
        <div className="productdisplay-pricebox">
          <div className="productdisplay-pricebox-title">Giá sản phẩm</div>
          <div className="productdisplay-pricebox-main">
            <span className="productdisplay-pricebox-new">
              {product.price?.toLocaleString()}đ
            </span>
            {product.discount && product.discount > 0 && (
              <span className="productdisplay-pricebox-old">
                {(
                  product.price / (1 - product.discount / 100)
                ).toLocaleString()}
                đ
              </span>
            )}
          </div>
        </div>

        {/* 🧴 Mô tả */}
        <div className="productdisplay-right-description">
          <span className="productdisplay-right-description-label">Mô tả:</span>{" "}
          {product.description || "Chưa có mô tả cho sản phẩm này."}
        </div>

        {/* 📦 Thông tin thêm */}
        <div className="productdisplay-right-extra">
          <p>
            <strong>Loại da:</strong>{" "}
            {product.skinType || "Phù hợp mọi loại da"}
          </p>
          <p>
            <strong>Số lượng còn lại:</strong> {product.stock || 0}
          </p>
          <p>
            <strong>Danh mục:</strong> {product.category?.name || "Không rõ"}
          </p>
        </div>

        {/* 🛒 Nút thêm giỏ */}
        <button
          onClick={() => {
            addToCart(product._id);
            navigate("/cart");
          }}
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default ProductDisplay;
