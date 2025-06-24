import React, { useContext, useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/logoshop.png";
import cart_icon from "../Assets/cart_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/nav_dropdown.png";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [menu, setMenu] = useState("shop");
  const [searchQuery, setSearchQuery] = useState("");
  const [fullname, setFullname] = useState("");
  const [role, setRole] = useState("");

  const { getTotalCartItem } = useContext(ShopContext);
  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("fullname");
    const storedRole = localStorage.getItem("role");
    if (storedName) setFullname(storedName);
    if (storedRole) setRole(storedRole);
  }, [isLoggedIn]);

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullname");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole("");
    if (window.location.pathname === "/admin") {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={logo} alt="" />
        </Link>
      </div>
      <form className="nav-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        {/* <li onClick={() => setMenu("shop")}> */}
        {/*   <Link style={{ textDecoration: "none" }} to="/">Shop</Link> */}
        {/*   {menu === "shop" && <hr />} */}
        {/* </li> */}
        <li onClick={() => setMenu("dien-thoai")}> 
          <Link style={{ textDecoration: "none" }} to="/dien-thoai">Điện thoại</Link>
          {menu === "dien-thoai" && <hr />}
        </li>
        <li onClick={() => setMenu("laptop")}> 
          <Link style={{ textDecoration: "none" }} to="/laptop">Laptop</Link>
          {menu === "laptop" && <hr />}
        </li>
        <li onClick={() => setMenu("phu-kien")}> 
          <Link style={{ textDecoration: "none" }} to="/phu-kien">Phụ kiện</Link>
          {menu === "phu-kien" && <hr />}
        </li>

        {/* Hiển thị menu quản lý nếu là admin */}
        {role === "admin" && (
          <li onClick={() => setMenu("admin")}> 
            <Link style={{ textDecoration: "none" }} to="/admin">Quản lý hệ thống</Link>
            {menu === "admin" && <hr />}
          </li>
        )}
      </ul>
      <div className="nav-login-cart">
        {isLoggedIn ? (
          <>
            <span style={{ marginRight: "10px", fontWeight: "bold" }}>{fullname}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}

        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItem()}</div>
      </div>
    </div>
  );
};

export default Navbar;
