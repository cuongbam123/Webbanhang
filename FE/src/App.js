// src/App.js
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import SearchResults from "./Pages/SearchResults";
import OrderPage from "./Pages/OrderPage";
import dt_banner from "./Components/Assets/banner_dt.png";
import laptop_banner from "./Components/Assets/banner_laptop.jpg";
import pkien_banner from "./Components/Assets/banner_phukien.jpg";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ShopContextProvider } from "./Context/ShopContext";
import AdminAddProduct from "./Pages/AdminAddProduct";
import OrderSuccess from "./Pages/OrderSuccess";
import MyOrders from "./Pages/MyOrder";
import UserProfile from "./Pages/UserProfile";

import AIChatBox from "./Components/ChatAI/AIChatBox";
import FloatingChatButton from "./Components/ChatAI/FloatingChatButton";

import { useEffect, useState } from "react";

// 👉 Wrapper tách biệt để được dùng trong <BrowserRouter>
function Layout() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const isChatPage = location.pathname === "/chat";

  return (
    // <ShopContextProvider>
    //   <PayPalScriptProvider options={{ "client-id": "sb" }}>
    //     <BrowserRouter>
    //       <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    //       <Routes>
    //         <Route path="/" element={<Shop />} />
    //           <Route path="/dien-thoai" element={<ShopCategory banner={dt_banner} category="dien-thoai" />} />
    //           <Route path="/laptop" element={<ShopCategory banner={laptop_banner} category="laptop" />} />
    //           <Route path="/phu-kien" element={<ShopCategory banner={pkien_banner} category="phu-kien" />} />
    //           <Route path="/search" element={<SearchResults />} />
    //           <Route path="/product">
    //             <Route path=":productId" element={<Product />} />
    //           </Route>
    //           <Route path="/cart" element={<Cart />} />
    //           <Route path="/login" element={<LoginSignup setIsLoggedIn={setIsLoggedIn}/>} />
    //           <Route path="/admin/add-product" element={<AdminAddProduct />} />

    //           <Route path="/order" element={<OrderPage />} />
    //           <Route path="/my-orders" element={<MyOrders />} />
    //           <Route path="/order-success/:id" element={<OrderSuccess />} />

    //           <Route path="/chat" element={<AIChatBox />} />

    //       </Routes>
    //       <Footer />
    //       {!isChatPage && (
    //   <>
    //     {showChat && <AIChatBox onClose={() => setShowChat(false)} />}
    //     <FloatingChatButton onClick={() => setShowChat(true)} />
    //   </>
    // )}
    //     </BrowserRouter>
    //   </PayPalScriptProvider>
    // </ShopContextProvider>
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route
          path="/dien-thoai"
          element={<ShopCategory banner={dt_banner} category="dien-thoai" />}
        />
        <Route
          path="/laptop"
          element={<ShopCategory banner={laptop_banner} category="laptop" />}
        />
        <Route
          path="/phu-kien"
          element={<ShopCategory banner={pkien_banner} category="phu-kien" />}
        />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/login"
          element={<LoginSignup setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/admin/add-product" element={<AdminAddProduct />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/order-success/:id" element={<OrderSuccess />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/chat" element={<AIChatBox />} />
      </Routes>
      <Footer />
      {!isChatPage && (
        <>
          {showChat && <AIChatBox onClose={() => setShowChat(false)} />}
          <FloatingChatButton onClick={() => setShowChat(true)} />
        </>
      )}
    </>
  );
}

function App() {
  return (
    <ShopContextProvider>
      <PayPalScriptProvider options={{ "client-id": "sb" }}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </PayPalScriptProvider>
    </ShopContextProvider>
  );
}

export default App;
