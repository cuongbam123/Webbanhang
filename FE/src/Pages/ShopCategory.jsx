import React, { useContext, useState } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import { useSearchParams } from "react-router-dom";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const brand = searchParams.get("brand");
  const type = searchParams.get("type");
  const [visibleCount, setVisibleCount] = useState(12);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortType, setSortType] = useState(""); // "asc" | "desc" | ""

  // Lọc sản phẩm theo category, brand, type
  let filteredProducts = all_product.filter(
    (item) =>
      props.category === item.category &&
      (!brand || item.name.toLowerCase().includes(brand.toLowerCase())) &&
      (!type || item.name.toLowerCase().includes(type.toLowerCase()))
  );

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
      <img className="shopcategory-banner" src={props.banner} alt="" />
      {(brand || type) && (
        <h2
          style={{
            textAlign: "center",
            margin: "20px 0",
            color: "#2c3e50",
            fontWeight: 700,
          }}
        >
          {brand || type}
        </h2>
      )}
      <div className="shopcategory-indexSort">
        <p>
          <span>
            Showing 1-{Math.min(visibleCount, filteredProducts.length)}
          </span>{" "}
          out of {filteredProducts.length} products
        </p>
        <div className="shopcategory-sort" style={{ position: "relative" }}>
          <span
            onClick={() => setSortOpen((open) => !open)}
            style={{ cursor: "pointer" }}
          >
            Sort by{" "}
            <img
              src={dropdown_icon}
              alt=""
              style={{ verticalAlign: "middle" }}
            />
          </span>
          {sortOpen && (
            <div
              style={{
                position: "absolute",
                top: "110%",
                right: 0,
                background: "#fff",
                border: "1px solid #00d2dd",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                zIndex: 10,
                minWidth: "170px",
                padding: "8px 0",
              }}
            >
              <div
                style={{
                  padding: "10px 20px",
                  cursor: "pointer",
                  color: sortType === "asc" ? "#3498db" : undefined,
                }}
                onClick={() => {
                  setSortType("asc");
                  setSortOpen(false);
                }}
              >
                Giá: Thấp đến Cao
              </div>
              <div
                style={{
                  padding: "10px 20px",
                  cursor: "pointer",
                  color: sortType === "desc" ? "#3498db" : undefined,
                }}
                onClick={() => {
                  setSortType("desc");
                  setSortOpen(false);
                }}
              >
                Giá: Cao đến Thấp
              </div>
              <div
                style={{
                  padding: "10px 20px",
                  cursor: "pointer",
                  color: sortType === "" ? "#3498db" : undefined,
                }}
                onClick={() => {
                  setSortType("");
                  setSortOpen(false);
                }}
              >
                Mặc định
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="shopcategory-products">
        {filteredProducts.slice(0, visibleCount).map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
      {visibleCount < filteredProducts.length && (
        <div
          className="shopcategory-loadmore"
          onClick={() => {
            const scrollY = window.scrollY;
            setVisibleCount((v) => {
              setTimeout(() => window.scrollTo(0, scrollY), 0);
              return v + 12;
            });
          }}
          style={{ cursor: "pointer" }}
        >
          Explore More
        </div>
      )}
    </div>
  );
};

export default ShopCategory;
