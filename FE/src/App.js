import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

import { useEffect, useState } from "react";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [fullname, setFullname] = useState("");

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const storedName = localStorage.getItem("fullname");
  //   if (token && storedName) {
  //     setIsLoggedIn(true);
  //     setFullname(storedName);
  //   }
  // }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <PayPalScriptProvider options={{ "client-id": "sb" }}>
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/dien-thoai" element={<ShopCategory banner={dt_banner} category="dien-thoai" />} />
          <Route path="/laptop" element={<ShopCategory banner={laptop_banner} category="laptop" />} />
          <Route path="/phu-kien" element={<ShopCategory banner={pkien_banner} category="phu-kien" />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/product">
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup setIsLoggedIn={setIsLoggedIn}/>} />

          <Route path="/order" element={<OrderPage />} />

        </Routes>

        <Footer />
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}



export default App;
