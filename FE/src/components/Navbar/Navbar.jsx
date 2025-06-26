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
          <Link style={{ textDecoration: "none" }} to="/dien-thoai">
            Điện thoại
          </Link>
          {menu === "dien-thoai" && <hr />}
          <ul className="submenu">
            <li>
              <Link to="/dien-thoai?brand=Iphone">Iphone</Link>
            </li>
            <li>
              <Link to="/dien-thoai?brand=Samsung">Samsung</Link>
            </li>
            <li>
              <Link to="/dien-thoai?brand=Xiaomi">Xiaomi</Link>
            </li>
            <li>
              <Link to="/dien-thoai?brand=Realme">Realme</Link>
            </li>
            <li>
              <Link to="/dien-thoai?brand=Oppo">Oppo</Link>
            </li>
            <li>
              <Link to="/dien-thoai?brand=Vivo">Vivo</Link>
            </li>
            <li>
              <Link to="/dien-thoai?brand=Nubia">Nubia</Link>
            </li>
          </ul>
        </li>
        <li onClick={() => setMenu("laptop")} className="has-submenu">
          <Link style={{ textDecoration: "none" }} to="/laptop">
            Laptop
          </Link>
          {menu === "laptop" && <hr />}
          <ul className="submenu">
            <li>
              <Link to="/laptop?brand=Macbook">Macbook</Link>
            </li>
            <li>
              <Link to="/laptop?brand=Lenovo">Lenovo</Link>
            </li>
            <li>
              <Link to="/laptop?brand=HP">HP</Link>
            </li>
            <li>
              <Link to="/laptop?brand=MSI">MSI</Link>
            </li>
            <li>
              <Link to="/laptop?brand=ASUS">ASUS</Link>
            </li>
            <li>
              <Link to="/laptop?brand=Acer">Acer</Link>
            </li>
            <li>
              <Link to="/laptop?brand=Gigabyte">Gigabyte</Link>
            </li>
          </ul>
        </li>
        <li onClick={() => setMenu("phu-kien")} className="has-submenu">
          <Link style={{ textDecoration: "none" }} to="/phu-kien">
            Phụ kiện
          </Link>
          {menu === "phu-kien" && <hr />}
          <ul className="submenu">
            <li>
              <Link to="/phu-kien?type=Bàn phím">Bàn phím</Link>
            </li>
            <li>
              <Link to="/phu-kien?type=Tai nghe">Tai nghe</Link>
            </li>
            <li>
              <Link to="/phu-kien?type=Loa">Loa</Link>
            </li>
            <li>
              <Link to="/phu-kien?type=Camera">Camera</Link>
            </li>
            <li>
              <Link to="/phu-kien?type=Chuột">Chuột</Link>
            </li>
            <li>
              <Link to="/phu-kien?type=Ốp lưng">Ốp lưng</Link>
            </li>
          </ul>
        </li>
        {/* Hiển thị menu quản lý nếu là admin */}
        {role === "admin" && (
          <li onClick={() => setMenu("admin")}>
            <Link style={{ textDecoration: "none" }} to="/admin">
              Quản lý hệ thống
            </Link>
            {menu === "admin" && <hr />}
          </li>
        )}
      </ul>
      <div className="nav-login-cart">
        {isLoggedIn ? (
          <>
            <span style={{ marginRight: "10px", fontWeight: "bold" }}>
              {fullname}
            </span>
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
