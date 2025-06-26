import React, { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import "./CSS/ShopCategory.css";
import { Link } from "react-router-dom";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const { all_product, addToCart } = useContext(ShopContext);

  const filteredProducts = all_product.filter(
    (product) =>
      product &&
      product.name_product &&
      query &&
      product.name_product.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="shop-category">
      <div className="shopcategory-indexSort">
        <p>
          <span>Kết quả tìm kiếm cho: {query}</span>
        </p>
        <p>Tìm thấy {filteredProducts.length} sản phẩm</p>
      </div>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name_product} />
                <h3>{product.name_product}</h3>
                <p>
                  {product.price_product &&
                    product.price_product.toLocaleString()}{" "}
                  VNĐ
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
          <p>Không tìm thấy sản phẩm nào phù hợp với từ khóa "{query}"</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
