import React, { useContext, useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/queen_logo.png"; // logo thương hiệu mới
import cart_icon from "../Assets/cart_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/nav_dropdown.png";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [menu, setMenu] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [fullname, setFullname] = useState("");
  const [role, setRole] = useState("");

  const { getTotalCartItem, clearCart } = useContext(ShopContext);
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
      window.scrollTo(0, 0);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullname");
    localStorage.removeItem("role");
    clearCart();
    setIsLoggedIn(false);
    setRole("");
    if (window.location.pathname === "/admin") {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const handleNavigate = (to) => {
    navigate(to);
    window.scrollTo(0, 0);
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <img src={logo} alt="Queen Beauty" />
          <span className="brand-name">HRU COSMETICS</span>
        </Link>
      </div>

      {/* Ô tìm kiếm */}
      <form className="nav-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Tìm sản phẩm làm đẹp..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
        alt="menu"
      />

      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu("nuoc-tay-trang")}>
          <Link to="/nuoc-tay-trang" onClick={() => handleNavigate("/nuoc-tay-trang")}>
            Nước tẩy trang
          </Link>
          {menu === "nuoc-tay-trang" && <hr />}
        </li>

        <li onClick={() => setMenu("serum")}>
          <Link to="/serum" onClick={() => handleNavigate("/serum")}>
            Serum
          </Link>
          {menu === "serum" && <hr />}
        </li>

        <li onClick={() => setMenu("sua-rua-mat")}>
          <Link to="/sua-rua-mat" onClick={() => handleNavigate("/sua-rua-mat")}>
            Sữa rửa mặt
          </Link>
          {menu === "sua-rua-mat" && <hr />}
        </li>

        <li onClick={() => setMenu("duong-toc")}>
          <Link to="/duong-toc" onClick={() => handleNavigate("/duong-toc")}>
            Dưỡng tóc
          </Link>
          {menu === "duong-toc" && <hr />}
        </li>

        <li onClick={() => setMenu("kem-chong-nang")}>
          <Link to="/kem-chong-nang" onClick={() => handleNavigate("/kem-chong-nang")}>
            Kem chống nắng
          </Link>
          {menu === "kem-chong-nang" && <hr />}
        </li>

        {/* Menu Admin */}
        {role === "admin" && (
          <li
            onClick={() => {
              setMenu("admin");
              const token = localStorage.getItem("token");
              const encodedToken = encodeURIComponent(token);
              window.location.href = `http://localhost:3002/admin?token=${encodedToken}`;
            }}
          >
            <span style={{ textDecoration: "none", cursor: "pointer" }}>
              Quản trị hệ thống
            </span>
            {menu === "admin" && <hr />}
          </li>
        )}
      </ul>

      {/* Phần bên phải */}
      <div className="nav-login-cart">
        <div className="nav-hotline">
          <a
            href="tel:0900123456"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#d4af37",
              color: "#fff",
              borderRadius: 30,
              padding: "6px 18px",
              fontWeight: 600,
              fontSize: 17,
              textDecoration: "none",
            }}
          >
            📞 <span>Hotline: 0900.123.456</span>
          </a>
        </div>

        {/* User Dropdown */}
        {isLoggedIn ? (
          <div
            className="nav-user-dropdown"
            style={{
              position: "relative",
              marginRight: "16px",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              const menu = e.currentTarget.querySelector(".dropdown-menu");
              if (menu) menu.style.display = "block";
            }}
            onMouseLeave={(e) => {
              const menu = e.currentTarget.querySelector(".dropdown-menu");
              if (menu) menu.style.display = "none";
            }}
          >
            <button
              className="user-btn"
              style={{
                background: "#e2c45b",
                color: "#fff",
                border: "none",
                borderRadius: "25px",
                padding: "6px 12px",
                fontWeight: "bold",
                cursor: "pointer",
                minWidth: "100px",
              }}
            >
              {fullname || "User"}
            </button>
            <div
              className="dropdown-menu"
              style={{
                display: "none",
                position: "absolute",
                top: "110%",
                left: 0,
                background: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                borderRadius: "8px",
                minWidth: "130px",
                zIndex: 10,
                border: "1.5px solid #d4af37",
              }}
            >
              <button
                onClick={() => handleNavigate("/profile")}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  color: "#d4af37",
                  padding: "10px",
                  textAlign: "left",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Tài khoản
              </button>
              <hr />
              <button
                onClick={handleLogout}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  color: "#d4af37",
                  padding: "10px",
                  textAlign: "left",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Đăng xuất
              </button>
            </div>
          </div>
        ) : (
          <button className="login-btn" onClick={() => handleNavigate("/login")}>
            Đăng nhập
          </button>
        )}

        {/* Giỏ hàng */}
        <img
          className="nav-cart-icon"
          src={cart_icon}
          alt="cart"
          onClick={() => handleNavigate("/cart")}
        />
        <div className="nav-cart-count">{getTotalCartItem()}</div>
      </div>
    </div>
  );
};

export default Navbar;
