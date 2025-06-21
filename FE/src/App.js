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
import men_banner from "./Components/Assets/banner_dt.png";
import women_banner from "./Components/Assets/banner_laptop.jpg";
import kid_banner from "./Components/Assets/banner_phukien.jpg";



import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  return (
    <PayPalScriptProvider options={{ "client-id": "sb" }}>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Shop />} />
          <Route
            path="/dien-thoai"
            element={<ShopCategory banner={men_banner} category="dien-thoai" />}
          />
          <Route
            path="/laptop"
            element={<ShopCategory banner={women_banner} category="laptop" />}
          />
          <Route
            path="/phu-kien"
            element={<ShopCategory banner={kid_banner} category="phu-kien" />}
          />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/product">
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}

export default App;
