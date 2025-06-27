import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProductList from "./pages/admin/ProductList";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import OrderList from "./pages/admin/OrderList";
import OrderDetail from "./pages/admin/OrderDetail";
import UserList from "./pages/admin/UserList";
import EditUser from "./pages/admin/EditUser";
import AddUser from "./pages/admin/AddUser"; // ✅ Thêm nếu có trang thêm người dùng

// Layout
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route không có layout */}
        <Route path="/login" element={<LoginPage />} />

        {/* Route có layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<ProductList />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="users" element={<UserList />} />
          <Route path="edit-user/:id" element={<EditUser />} />
          <Route path="add-user" element={<AddUser />} /> {/* ✅ nếu có */}
        </Route>
      </Routes>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
