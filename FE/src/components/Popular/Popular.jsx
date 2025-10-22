import React, { useContext } from "react";
import "./Popular.css";
import { ShopContext } from "../../Context/ShopContext";
import Item from "../Item/Item";

const Popular = () => {
  const { all_product } = useContext(ShopContext);

  // BASE_URL từ .env (nếu undefined thì fallback về backend của bạn)
  const BASE_URL = process.env.REACT_APP_BASE_URL || "https://my-backend-gbqg.onrender.com";

  // Helper: chuẩn hoá URL ảnh
  const normalizeImage = (img) => {
    if (!img) return ""; // hoặc return placeholder nếu muốn

    // nếu đã là URL đầy đủ thì kiểm tra nếu trỏ tới localhost thì thay thành BASE_URL
    if (img.startsWith("http://localhost:3001")) {
      return img.replace("http://localhost:3001", BASE_URL);
    }
    if (img.startsWith("http://") || img.startsWith("https://")) {
      return img;
    }

    // nếu bắt đầu bằng dấu "/" (ví dụ "/uploads/xxx.png")
    if (img.startsWith("/")) {
      return `${BASE_URL}${img}`;
    }

    // nếu chỉ là "uploads/xxx.png" hoặc chỉ tên file "xxx.png"
    // ưu tiên nếu chứa "uploads" thì nối trực tiếp, còn không thì thêm uploads/
    if (img.startsWith("uploads/")) {
      return `${BASE_URL}/${img}`;
    }

    // mặc định thêm uploads/ nếu có vẻ là tên file
    return `${BASE_URL}/uploads/${img}`;
  };

  // Lấy 4 sản phẩm có giá cao nhất (lưu ý dùng price_product)
  const popularProducts = [...(all_product || [])]
    .sort((a, b) => Number(b.price_product || 0) - Number(a.price_product || 0))
    .slice(0, 4);

  return (
    <div className="popular">
      <h1>POPULAR DEVICES</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item, i) => {
          const imageUrl = normalizeImage(item.image);

          // debug (chỉ hiện khi đang develop)
          if (process.env.NODE_ENV === "development") {
            // eslint-disable-next-line no-console
            console.log("Popular imageUrl:", imageUrl);
          }

          return (
            <Item
              key={item._id || i}
              id={item._id}
              name={item.name_product || item.name || ""}
              image={imageUrl}
              new_price={item.price_product}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
