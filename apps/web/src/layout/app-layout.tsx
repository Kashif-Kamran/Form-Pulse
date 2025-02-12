import { Outlet } from "react-router-dom";
import Sidebar from "@/components/custom-ui/sidebar";
function AppLayout() {
  return (
    <div className="w-screen h-full py-2 flex justify-evenly">
      {/* Sidebar */}
      <div className="w-[21%]">
        <Sidebar />
      </div>
      {/* Main application */}
      <div className="bg-gray-300 h-full w-[78%] rounded-lg border-[1px] border-gray-500 p-6 ">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
