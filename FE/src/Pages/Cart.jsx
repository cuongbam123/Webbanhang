import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    setCartItems,
    getTotalCartAmount
  } = useContext(ShopContext);

  const navigate = useNavigate();

  const cartProducts = all_product.filter(product => cartItems[product._id]);

  const removeItemCompletely = (id) => {
    const newCart = { ...cartItems };
    delete newCart[id];
    setCartItems(newCart);
  };

  const handleCheckout = () => {
    if (cartProducts.length === 0) {
      alert('Giỏ hàng đang trống!');
      return;
    }
    navigate('/order'); // Đảm bảo bạn có route /order
  };

  return (
    <div className="cart" style={{ padding: '20px' }}>
      <h2>🛒 Giỏ hàng</h2>

      {cartProducts.length > 0 ? (
        <>
          {cartProducts.map(product => (
            <div
              key={product._id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '16px',
                borderBottom: '1px solid #ccc',
                paddingBottom: '12px'
              }}
            >
              <img src={product.image} alt={product.name_product} width="80" />
              <div style={{ flexGrow: 1 }}>
                <h4>{product.name_product}</h4>
                <p>
                  Số lượng:
                  <button onClick={() => removeFromCart(product._id)} style={{ margin: '0 6px' }}>➖</button>
                  {cartItems[product._id]}
                  <button onClick={() => addToCart(product._id)} style={{ margin: '0 6px' }}>➕</button>
                </p>
                <p>
                  Giá: {product.price_product.toLocaleString()} VNĐ
                </p>
                <p>
                  Thành tiền: {(product.price_product * cartItems[product._id]).toLocaleString()} VNĐ
                </p>
                <button
                  onClick={() => removeItemCompletely(product._id)}
                  style={{ background: 'red', color: 'white', padding: '4px 10px', border: 'none', borderRadius: '4px' }}
                >
                  Xóa sản phẩm
                </button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '20px', fontWeight: 'bold', fontSize: '18px' }}>
            🧾 Tổng tiền: {getTotalCartAmount().toLocaleString()} VNĐ
          </div>

          <button
            onClick={handleCheckout}
            style={{
              marginTop: '20px',
              backgroundColor: '#0a84ff',
              color: 'white',
              padding: '10px 24px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            🚀 Thanh toán
          </button>
        </>
      ) : (
        <p>Giỏ hàng của bạn đang trống.</p>
      )}
    </div>
  );
};

export default Cart;
