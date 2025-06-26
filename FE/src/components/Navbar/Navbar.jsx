import React, { useContext, useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/logoshop.png";
import cart_icon from "../Assets/cart_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/nav_dropdown.png";
import all_product from "../Assets/all_product";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [menu, setMenu] = useState("shop");
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

  // Lấy danh sách hãng từ sản phẩm
  const getBrands = (category) => {
    const brands = all_product
      .filter((p) => p.category === category)
      .map((p) => {
        // Lấy hãng là từ đầu tên sản phẩm (từ đầu đến khoảng trắng đầu tiên hoặc đến từ thứ 2)
        const firstWord = p.name.split(" ")[0].toLowerCase();
        // Một số hãng có 2 từ đầu (Apple MacBook, Samsung Galaxy, etc)
        if (
          firstWord === "apple" ||
          firstWord === "samsung" ||
          firstWord === "macbook" ||
          firstWord === "asus" ||
          firstWord === "hp" ||
          firstWord === "msi" ||
          firstWord === "lenovo" ||
          firstWord === "acer" ||
          firstWord === "gigabyte" ||
          firstWord === "oppo" ||
          firstWord === "vivo" ||
          firstWord === "xiaomi" ||
          firstWord === "nubia" ||
          firstWord === "realme" ||
          firstWord === "marshall" ||
          firstWord === "jbl" ||
          firstWord === "logitech" ||
          firstWord === "razer" ||
          firstWord === "harman" ||
          firstWord === "dji"
        ) {
          return p.name.split(" ").slice(0, 2).join(" ");
        }
        return p.name.split(" ")[0];
      });
    // Loại bỏ trùng lặp và chuẩn hóa chữ hoa đầu
    return [
      ...new Set(brands.map((b) => b.charAt(0).toUpperCase() + b.slice(1))),
    ];
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
        <li onClick={() => setMenu("dien-thoai")} className="has-submenu">
          <Link
            style={{ textDecoration: "none" }}
            to="/dien-thoai"
            onClick={() => handleNavigate("/dien-thoai")}
          >
            Điện thoại
          </Link>
          {menu === "dien-thoai" && <hr />}
          <ul className="submenu">
            <li>
              <Link
                to="/dien-thoai?brand=Iphone"
                onClick={() => handleNavigate("/dien-thoai?brand=Iphone")}
              >
                Iphone
              </Link>
            </li>
            <li>
              <Link
                to="/dien-thoai?brand=Samsung"
                onClick={() => handleNavigate("/dien-thoai?brand=Samsung")}
              >
                Samsung
              </Link>
            </li>
            <li>
              <Link
                to="/dien-thoai?brand=Xiaomi"
                onClick={() => handleNavigate("/dien-thoai?brand=Xiaomi")}
              >
                Xiaomi
              </Link>
            </li>
            <li>
              <Link
                to="/dien-thoai?brand=Realme"
                onClick={() => handleNavigate("/dien-thoai?brand=Realme")}
              >
                Realme
              </Link>
            </li>
            <li>
              <Link
                to="/dien-thoai?brand=Oppo"
                onClick={() => handleNavigate("/dien-thoai?brand=Oppo")}
              >
                Oppo
              </Link>
            </li>
            <li>
              <Link
                to="/dien-thoai?brand=Vivo"
                onClick={() => handleNavigate("/dien-thoai?brand=Vivo")}
              >
                Vivo
              </Link>
            </li>
            <li>
              <Link
                to="/dien-thoai?brand=Nubia"
                onClick={() => handleNavigate("/dien-thoai?brand=Nubia")}
              >
                Nubia
              </Link>
            </li>
          </ul>
        </li>
        <li onClick={() => setMenu("laptop")} className="has-submenu">
          <Link
            style={{ textDecoration: "none" }}
            to="/laptop"
            onClick={() => handleNavigate("/laptop")}
          >
            Laptop
          </Link>
          {menu === "laptop" && <hr />}
          <ul className="submenu">
            <li>
              <Link
                to="/laptop?brand=Macbook"
                onClick={() => handleNavigate("/laptop?brand=Macbook")}
              >
                Macbook
              </Link>
            </li>
            <li>
              <Link
                to="/laptop?brand=Lenovo"
                onClick={() => handleNavigate("/laptop?brand=Lenovo")}
              >
                Lenovo
              </Link>
            </li>
            <li>
              <Link
                to="/laptop?brand=HP"
                onClick={() => handleNavigate("/laptop?brand=HP")}
              >
                HP
              </Link>
            </li>
            <li>
              <Link
                to="/laptop?brand=MSI"
                onClick={() => handleNavigate("/laptop?brand=MSI")}
              >
                MSI
              </Link>
            </li>
            <li>
              <Link
                to="/laptop?brand=ASUS"
                onClick={() => handleNavigate("/laptop?brand=ASUS")}
              >
                ASUS
              </Link>
            </li>
            <li>
              <Link
                to="/laptop?brand=Acer"
                onClick={() => handleNavigate("/laptop?brand=Acer")}
              >
                Acer
              </Link>
            </li>
            <li>
              <Link
                to="/laptop?brand=Gigabyte"
                onClick={() => handleNavigate("/laptop?brand=Gigabyte")}
              >
                Gigabyte
              </Link>
            </li>
          </ul>
        </li>
        <li onClick={() => setMenu("phu-kien")} className="has-submenu">
          <Link
            style={{ textDecoration: "none" }}
            to="/phu-kien"
            onClick={() => handleNavigate("/phu-kien")}
          >
            Phụ kiện
          </Link>
          {menu === "phu-kien" && <hr />}
          <ul className="submenu">
            <li>
              <Link
                to="/phu-kien?type=Bàn phím"
                onClick={() => handleNavigate("/phu-kien?type=Bàn phím")}
              >
                Bàn phím
              </Link>
            </li>
            <li>
              <Link
                to="/phu-kien?type=Tai nghe"
                onClick={() => handleNavigate("/phu-kien?type=Tai nghe")}
              >
                Tai nghe
              </Link>
            </li>
            <li>
              <Link
                to="/phu-kien?type=Loa"
                onClick={() => handleNavigate("/phu-kien?type=Loa")}
              >
                Loa
              </Link>
            </li>
            <li>
              <Link
                to="/phu-kien?type=Camera"
                onClick={() => handleNavigate("/phu-kien?type=Camera")}
              >
                Camera
              </Link>
            </li>
            <li>
              <Link
                to="/phu-kien?type=Chuột"
                onClick={() => handleNavigate("/phu-kien?type=Chuột")}
              >
                Chuột
              </Link>
            </li>
            <li>
              <Link
                to="/phu-kien?type=Ốp lưng"
                onClick={() => handleNavigate("/phu-kien?type=Ốp lưng")}
              >
                Ốp lưng
              </Link>
            </li>
          </ul>
        </li>
        {/* Hiển thị menu quản lý nếu là admin */}
        {role === "admin" && (
          <li onClick={() => setMenu("admin")}>
            <Link
              style={{ textDecoration: "none" }}
              to="/admin"
              onClick={() => handleNavigate("/admin")}
            >
              Quản lý hệ thống
            </Link>
            {menu === "admin" && <hr />}
          </li>
        )}
      </ul>
      <div className="nav-login-cart">
        <div className="nav-hotline">
          <a
            href="tel:00008386"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#3498db",
              color: "#fff",
              borderRadius: 30,
              padding: "6px 18px",
              fontWeight: 600,
              fontSize: 17,
              textDecoration: "none",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              style={{ marginRight: 6 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5.75C3 4.784 3.784 4 4.75 4h2.5A1.75 1.75 0 0 1 9 5.75v1.5A1.75 1.75 0 0 1 7.25 9H6.5a11.5 11.5 0 0 0 11 11v-.75A1.75 1.75 0 0 1 19.25 17h1.5A1.75 1.75 0 0 1 22 18.75v2.5A1.75 1.75 0 0 1 20.25 23h-2.5A1.75 1.75 0 0 1 16 21.25v-1.5A1.75 1.75 0 0 1 17.75 18h.75A13.25 13.25 0 0 1 3 5.75Z"
              />
            </svg>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 1.1,
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 500 }}>Hotline</span>
              <span style={{ fontSize: 15, fontWeight: 500 }}>0000.8386</span>
            </span>
          </a>
        </div>
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
                background: "#36a2eb",
                color: "#fff",
                border: "none",
                borderRadius: "25px",
                padding: "5px 10px",
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
                minWidth: "120px",
                zIndex: 10,
                border: "1.5px solid #36a2eb",
              }}
            >
              <button
                onClick={handleLogout}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  color: "#36a2eb",
                  padding: "10px",
                  textAlign: "left",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Thông tin đặt hàng
              </button>
              <hr />
              <button
                onClick={handleLogout}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  color: "#36a2eb",
                  padding: "10px",
                  textAlign: "left",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => handleNavigate("/login")}>Login</button>
        )}
        <img
          className="nav-cart-icon"
          src={cart_icon}
          alt=""
          onClick={() => handleNavigate("/cart")}
        />
        <div className="nav-cart-count">{getTotalCartItem()}</div>
      </div>
    </div>
  );
};

export default Navbar;
