import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
  const navigate = useNavigate();
  const {
    getTotalCartAmount,
    all_product,
    cartItems,
    removeFromCart,
    addToCart,
    setCartItems
  } = useContext(ShopContext);

  const removeItemCompletely = (id) => {
    const newCart = { ...cartItems };
    delete newCart[id]; // hoặc: newCart[id] = 0;
    setCartItems(newCart);
  };

  return (
    <div className="cart-background">
      <div className='cartitems'>
        <div className="cartitems-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e) => {
          if (cartItems[e._id] > 0) {
            return (
              <div key={e._id}>
                <div className="cartitems-format cartitems-format-main">
                  <img src={e.image} alt="" className='carticon-product-icon' />
                  <p>{e.name_product}</p>
                  <p>${e.price_product}</p>
                  <div className='cartitems-quantity-group'>
                    <button onClick={() => removeFromCart(e._id)} className='cartitems-quantity-btn'>-</button>
                    <span className='cartitems-quantity'>{cartItems[e._id]}</span>
                    <button onClick={() => addToCart(e._id)} className='cartitems-quantity-btn'>+</button>
                  </div>
                  <p>${e.price_product * cartItems[e._id]}</p>
                  <img
                    className='cartitems-remove-icon'
                    src={remove_icon}
                    onClick={() => removeItemCompletely(e._id)}
                    alt="remove"
                  />
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
        <div className="cartitems-down">
          <div className="cartitems-total">
            <h1>Cart Totals</h1>
            <div>
              <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Shipping Fee</p>
                <p>Free</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <h3>Total</h3>
                <h3>${getTotalCartAmount()}</h3>
              </div>
              <button onClick={() => navigate("/order")}>PROCEED TO CHECKOUT</button>
            </div>
          </div>
          <div className="cartitems-promocode">
            <p>If you have a promo code, Enter it here</p>
            <div className="cartitems-promobox">
              <input type="text" placeholder='Promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
