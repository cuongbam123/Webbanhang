import React, { useContext, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";

const ShopCategory = ({ banner, category }) => {
  //   const { all_product } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const brand = searchParams.get("brand");
  const type = searchParams.get("type");
  const [visibleCount, setVisibleCount] = useState(12);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortType, setSortType] = useState(""); // "asc" | "desc" | ""
  const { all_product, addToCart } = useContext(ShopContext);

  // Lọc sản phẩm theo id_category (theo cách bạn đang truyền)

  const filteredProducts = all_product.filter(
    (product) => product.id_category === category
  );

  // Lọc sản phẩm theo category, brand, type
  //   let filteredProducts = all_product.filter(
  //     (item) =>
  //       props.category === item.category &&
  //       (!brand || item.name.toLowerCase().includes(brand.toLowerCase())) &&
  //       (!type || item.name.toLowerCase().includes(type.toLowerCase()))
  //   );

  // Sắp xếp sản phẩm nếu có chọn sort
  if (sortType === "asc") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.new_price - b.new_price
    );
  } else if (sortType === "desc") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.new_price - a.new_price
    );
  }

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={banner} alt="" />
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name_product} />
                <h3>{product.name_product}</h3>
                <p>
                  {product.price_product.toLocaleString()} VNĐ
                  {product.old_price && (
                    <span className="old-price" style={{ marginLeft: 8 }}>
                      {product.old_price.toLocaleString()} VNĐ
                    </span>
                  )}
                </p>
              </Link>
              <button onClick={() => addToCart(product._id)}>
                Thêm vào giỏ
              </button>
            </div>
          ))
        ) : (
          <p>Không có sản phẩm nào trong danh mục này.</p>
        )}
      </div>
    </div>
  );
};

export default ShopCategory;
