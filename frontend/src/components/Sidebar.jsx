// components/Sidebar.jsx
// components/Sidebar.jsx
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  BarChart3,
  Users,
  Settings,
  Plus,
  Activity
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="min-h-screen w-20 bg-white shadow-md flex flex-col items-center py-4 justify-between">
      
      {/* Top Section */}
      <div className="flex flex-col items-center gap-6">
        
        {/* Logo */}
        <div className="text-xl font-bold">💊</div>

        {/* Menu Icons */}
        <SidebarIcon icon={<LayoutDashboard size={22} />} />
        <SidebarIcon icon={<ShoppingCart size={22} />} />
        <SidebarIcon icon={<Package size={22} />} />
        <SidebarIcon icon={<BarChart3 size={22} />} />
        <SidebarIcon icon={<Users size={22} />} />
        <SidebarIcon icon={<Activity size={22} />} />

        {/* Divider */}
        <div className="w-8 h-px bg-gray-300"></div>

        <SidebarIcon icon={<Plus size={22} />} />
      </div>

      {/* Bottom Section */}
      <div>
        <SidebarIcon icon={<Settings size={22} />} />
      </div>
    </div>
  );
}

// Reusable Icon Component
function SidebarIcon({ icon }) {
  return (
    <div className="p-3 rounded-xl hover:bg-blue-100 text-gray-600 hover:text-blue-600 cursor-pointer transition">
      {icon}
    </div>
  );
}