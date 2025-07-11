import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";

// Pages
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProductList from "./pages/admin/ProductList";
import OrderList from "./pages/admin/OrderList";
import OrderDetail from "./pages/admin/OrderDetail";
import UserList from "./pages/admin/UserList";

// Layout
import Layout from "./components/Layout";


function App() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromFE = params.get("token");
    if (tokenFromFE) {
      localStorage.setItem("token", tokenFromFE);

      // Xoá token khỏi URL sau khi lưu để bảo mật
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);
  return (
    <Router>
      <Routes>
        {/* Route không có layout */}
        <Route path="/login" element={<LoginPage />} />

        {/* Route có layout */}
        <Route path="/admin" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<ProductList />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="users" element={<UserList />} />
        </Route>
      </Routes>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
