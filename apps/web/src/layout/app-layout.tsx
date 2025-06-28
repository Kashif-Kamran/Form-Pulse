import { Outlet } from "react-router-dom";
import Sidebar from "@/components/custom-ui/sidebar";
import { useState } from "react";

function AppLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="w-screen h-full py-2 flex justify-evenly">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'w-[5%]' : 'w-[21%]'}`}>
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>
      {/* Main application */}
      <div className={`bg-gray-300 h-full rounded-lg border-[1px] border-gray-500 p-6 transition-all duration-300 ${isSidebarCollapsed ? 'w-[94%]' : 'w-[78%]'}`}>
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
