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

  // Lọc sản phẩm theo category, brand, type
  const filteredProducts = all_product.filter(
    (item) =>
      props.category === item.category &&
      (!brand || item.name.toLowerCase().includes(brand.toLowerCase())) &&
      (!type || item.name.toLowerCase().includes(type.toLowerCase()))
  );

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
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
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
          onClick={() => setVisibleCount(visibleCount + 12)}
          style={{ cursor: "pointer" }}
        >
          Explore More
        </div>
      )}
    </div>
  );
};

export default ShopCategory;
