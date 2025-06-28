import React, { useContext } from "react";
import "./Popular.css";
import { ShopContext } from "../../Context/ShopContext";
import Item from "../Item/Item";

const Popular = () => {
  const { all_product } = useContext(ShopContext);
  // Lấy 4 sản phẩm có giá cao nhất
  const popularProducts = [...all_product]
    .sort((a, b) => Number(b.price_product) - Number(a.price_product))
    .slice(0, 4);
  return (
    <div className="popular">
      <h1>POPULAR DEVICES</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item, i) => (
          <Item
            key={item._id || i}
            id={item._id}
            name={item.name_product}
            image={item.image}
            new_price={item.price_product}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
