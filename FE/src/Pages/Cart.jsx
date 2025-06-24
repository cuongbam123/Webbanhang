import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';

const Cart = () => {
  const { all_product, cartItems } = useContext(ShopContext);

  const cartProducts = all_product.filter(product => cartItems[product._id]);

  return (
    <div className="cart">
      <h2>Giỏ hàng</h2>
      {cartProducts.length > 0 ? (
        cartProducts.map(product => (
          <div key={product._id} className="cart-item">
            <img src={product.image} alt={product.name_product} />
            <div>
              <h4>{product.name_product}</h4>
              <p>Số lượng: {cartItems[product._id]}</p>
              <p>Giá: {product.price_product.toLocaleString()} VNĐ</p>
            </div>
          </div>
        ))
      ) : (
        <p>Giỏ hàng của bạn đang trống.</p>
      )}
    </div>
  );
};

export default Cart;
