import React, { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";
import "./CSS/ShopCategory.css";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const { all_product } = useContext(ShopContext);

  const filteredProducts = all_product.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="shop-category">
      <div className="shopcategory-indexSort">
        <p>
          <span>Kết quả tìm kiếm cho: {query}</span>
        </p>
        <p>Tìm thấy {filteredProducts.length} sản phẩm</p>
      </div>
      <div className="shopcategory-products">
        {filteredProducts.map((item, i) => (
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
      {filteredProducts.length === 0 && (
        <div className="no-results">
          <p>Không tìm thấy sản phẩm nào phù hợp với từ khóa "{query}"</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
