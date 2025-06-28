import React, { useContext } from "react";
import "./RelatedProducts.css";
import { ShopContext } from "../../Context/ShopContext";
import Item from "../Item/Item";

const RelatedProducts = ({ currentName, currentId }) => {
  const { all_product } = useContext(ShopContext);
  const brand = currentName?.split(" ")[0]?.toLowerCase() || "";

  // Lọc sản phẩm cùng hãng, loại bỏ sản phẩm hiện tại
  let related = all_product.filter(
    (item) =>
      item.name_product?.toLowerCase().includes(brand) && item._id !== currentId
  );

  // Nếu có nhiều hơn 4 sản phẩm, chọn ngẫu nhiên 4 sản phẩm
  if (related.length > 4) {
    related = related.sort(() => 0.5 - Math.random()).slice(0, 4);
  }

  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {related.map((item, i) => (
          <Item
            key={item._id || i}
            id={item._id}
            name={item.name_product}
            image={item.image}
            new_price={item.price_product}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
