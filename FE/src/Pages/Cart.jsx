import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import "./CSS/Cart.css";

const Cart = () => {
  const {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    setCartItems,
    getTotalCartAmount,
  } = useContext(ShopContext);

  const navigate = useNavigate();

  const cartProducts = all_product.filter((product) => cartItems[product._id]);

  const removeItemCompletely = (id) => {
    const newCart = { ...cartItems };
    delete newCart[id];
    setCartItems(newCart);
  };

  const handleCheckout = () => {
    if (cartProducts.length === 0) {
      alert("Giỏ hàng đang trống!");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập để thanh toán!");
      navigate("/login");
      return;
    }
    navigate("/order");
  };

  return (
    <div className="cart-bg">
      <div className="cart-page">
        <h2 className="cart-title">🛒 Giỏ hàng</h2>
        {cartProducts.length > 0 ? (
          <>
            {cartProducts.map((product) => (
              <div key={product._id} className="cart-item">
                <img
                  src={product.image}
                  alt={product.name_product}
                  className="cart-item-img"
                />
                <div className="cart-item-info">
                  <div className="cart-item-title">{product.name_product}</div>
                  <div className="cart-item-price">
                    Giá:{" "}
                    <span>
                      {Number(product.price_product).toLocaleString()} VNĐ
                    </span>
                  </div>
                  <div className="cart-item-qty">
                    Số lượng:
                    <button
                      onClick={() => removeFromCart(product._id)}
                      className="cart-qty-btn"
                    >
                      -
                    </button>
                    <span className="cart-qty-value">
                      {cartItems[product._id]}
                    </span>
                    <button
                      onClick={() => addToCart(product._id)}
                      className="cart-qty-btn"
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total">
                    Thành tiền:{" "}
                    <span>
                      {(
                        Number(product.price_product) * cartItems[product._id]
                      ).toLocaleString()}{" "}
                      VNĐ
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeItemCompletely(product._id)}
                  className="cart-item-remove"
                >
                  Xóa
                </button>
              </div>
            ))}
            <div className="cart-total">
              <span>
                🧾 Tổng tiền:{" "}
                <span>{getTotalCartAmount().toLocaleString()} VNĐ</span>
              </span>
              <button onClick={handleCheckout} className="cart-checkout-btn">
                🚀 Thanh toán
              </button>
            </div>
          </>
        ) : (
          <p className="cart-empty">Giỏ hàng của bạn đang trống.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
