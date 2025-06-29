import { NavLink } from "react-router-dom";
import { Home, Boxes, LogOut, PackageCheck, Users } from "lucide-react"; // ✅ Thêm icon Users

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white p-4 hidden md:block min-h-screen">
      <div className="text-2xl font-bold mb-8">Admin Dashboard</div>
      <nav className="flex flex-col gap-4">
        <NavLink to="/admin" className="flex items-center gap-2 hover:text-yellow-400">
          <Home size={20} />
          Dashboard
        </NavLink>
        <NavLink to="/admin/products" className="flex items-center gap-2 hover:text-yellow-400">
          <Boxes size={20} />
          Sản phẩm
        </NavLink>
        <NavLink to="/admin/orders" className="flex items-center gap-2 hover:text-yellow-400">
          <PackageCheck size={20} />
          Đơn hàng
        </NavLink>
        {/* ✅ Mục Người dùng */}
        <NavLink to="/admin/users" className="flex items-center gap-2 hover:text-yellow-400">
          <Users size={20} />
          Người dùng
        </NavLink>
        <button
  onClick={() => (window.location.href = 'http://localhost:3000/login')}
  className="flex items-center gap-2 mt-auto hover:text-red-400"
>
  <LogOut size={20} />
  Đăng xuất
</button>

      </nav>
    </aside>
  );
};

export default Sidebar;
