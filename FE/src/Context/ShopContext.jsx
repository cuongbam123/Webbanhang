import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/products');
      setAllProduct(response.data.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    }
  };

  // 👉 Thêm đoạn này để khởi tạo cart từ localStorage
  const storedCart = localStorage.getItem("cartItems");
  if (storedCart) {
    setCartItems(JSON.parse(storedCart));
  }

  fetchProducts();
}, []);
useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}, [cartItems]);


  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) updated[itemId] -= 1;
      else delete updated[itemId];
      return updated;
    });
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const product = all_product.find(p => p._id === id);
      if (product) total += product.price_product * cartItems[id];
    }
    return total;
  };

  const getTotalCartItem = () => {
    return Object.values(cartItems).reduce((acc, val) => acc + val, 0);
  };

  return (
    <ShopContext.Provider
      value={{
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        setCartItems,
        getTotalCartAmount,
        getTotalCartItem
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
