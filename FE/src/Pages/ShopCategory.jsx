// ShopCategory.jsx

import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';

const ShopCategory = ({ banner, category }) => {
  const { all_product, addToCart } = useContext(ShopContext);

  // Lọc sản phẩm theo id_category (theo cách bạn đang truyền)
  const filteredProducts = all_product.filter(product => product.id_category === category);

  return (
    <div className="shop-category">
      <img src={banner} alt="Category Banner" />
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product._id} className="product-card">
              <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name_product} />
                <h3>{product.name_product}</h3>
                <p>{product.price_product.toLocaleString()} VNĐ</p>
              </Link>
              <button onClick={() => addToCart(product._id)}>Thêm vào giỏ</button>
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
