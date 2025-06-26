import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import bg_showing from "../Components/Assets/bg_showing.jpg";

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
    navigate("/order");
  };

  return (
    <div className="cart-bg">
      <div
        className="cart-page"
        style={{
          maxWidth: 900,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 2px 12px rgba(44,62,80,0.08)",
          padding: 32,
        }}
      >
        <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 32 }}>
          🛒 Giỏ hàng
        </h2>

        {cartProducts.length > 0 ? (
          <>
            {cartProducts.map((product) => (
              <div
                key={product._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  marginBottom: 24,
                  borderBottom: "1px solid #e2e2e2",
                  paddingBottom: 18,
                }}
              >
                <img
                  src={product.image}
                  alt={product.name_product}
                  style={{
                    width: 90,
                    height: 90,
                    objectFit: "contain",
                    borderRadius: 12,
                    background: "#fafafa",
                  }}
                />
                <div style={{ flexGrow: 1 }}>
                  <div
                    style={{ fontWeight: 600, fontSize: 20, marginBottom: 6 }}
                  >
                    {product.name_product}
                  </div>
                  <div style={{ color: "#555", fontSize: 16, marginBottom: 6 }}>
                    Giá:{" "}
                    <span style={{ fontWeight: 600 }}>
                      {Number(product.price_product).toLocaleString()} VNĐ
                    </span>
                  </div>
                  <div style={{ color: "#555", fontSize: 16, marginBottom: 6 }}>
                    Số lượng:
                    <button
                      onClick={() => removeFromCart(product._id)}
                      style={{
                        margin: "0 8px",
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        border: "1.5px solid #e0e0e0",
                        background: "#fff",
                        fontWeight: 700,
                        fontSize: 18,
                        cursor: "pointer",
                      }}
                    >
                      -
                    </button>
                    <span style={{ fontWeight: 600, fontSize: 18 }}>
                      {cartItems[product._id]}
                    </span>
                    <button
                      onClick={() => addToCart(product._id)}
                      style={{
                        margin: "0 8px",
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        border: "1.5px solid #e0e0e0",
                        background: "#fff",
                        fontWeight: 700,
                        fontSize: 18,
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div style={{ color: "#222", fontSize: 16, fontWeight: 600 }}>
                    Thành tiền:{" "}
                    <span style={{ color: "#e74c3c", fontWeight: 700 }}>
                      {(
                        Number(product.price_product) * cartItems[product._id]
                      ).toLocaleString()}{" "}
                      VNĐ
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeItemCompletely(product._id)}
                  style={{
                    background: "#ff5a5a",
                    color: "white",
                    padding: "8px 16px",
                    border: "none",
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: "pointer",
                    marginLeft: 12,
                  }}
                >
                  Xóa
                </button>
              </div>
            ))}

            <div
              style={{
                marginTop: 32,
                fontWeight: 700,
                fontSize: 22,
                color: "#222",
                display: "flex",
                alignItems: "center",
                gap: 32,
              }}
            >
              <span>
                🧾 Tổng tiền:{" "}
                <span style={{ color: "#e74c3c" }}>
                  {getTotalCartAmount().toLocaleString()} VNĐ
                </span>
              </span>
              <button
                onClick={handleCheckout}
                style={{
                  backgroundColor: "#0a84ff",
                  color: "white",
                  padding: "12px 32px",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 18,
                  fontWeight: 700,
                  cursor: "pointer",
                  marginLeft: 24,
                }}
              >
                🚀 Thanh toán
              </button>
            </div>
          </>
        ) : (
          <p style={{ fontSize: 18, color: "#888", margin: "32px 0" }}>
            Giỏ hàng của bạn đang trống.
          </p>
        )}
      </div>
    </div>
  );
};

export default Cart;
