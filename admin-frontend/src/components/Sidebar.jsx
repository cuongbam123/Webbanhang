import { NavLink } from "react-router-dom";
import { Home, Boxes, LogOut, PackageCheck, Users } from "lucide-react"; // ✅ Thêm icon Users

const Sidebar = () => {
  return (
    <aside className="h-screen w-64 bg-gray-900 text-white p-4 hidden md:block">
      <div className="text-2xl font-bold mb-8">Admin Dashboard</div>
      <nav className="flex flex-col gap-4">
        <NavLink to="/" className="flex items-center gap-2 hover:text-yellow-400">
          <Home size={20} />
          Dashboard
        </NavLink>
        <NavLink to="/products" className="flex items-center gap-2 hover:text-yellow-400">
          <Boxes size={20} />
          Sản phẩm
        </NavLink>
        <NavLink to="/orders" className="flex items-center gap-2 hover:text-yellow-400">
          <PackageCheck size={20} />
          Đơn hàng
        </NavLink>
        {/* ✅ Mục Người dùng */}
        <NavLink to="/users" className="flex items-center gap-2 hover:text-yellow-400">
          <Users size={20} />
          Người dùng
        </NavLink>
        <NavLink to="/logout" className="flex items-center gap-2 mt-auto hover:text-red-400">
          <LogOut size={20} />
          Đăng xuất
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
