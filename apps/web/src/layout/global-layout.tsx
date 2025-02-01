import { Outlet } from "react-router-dom";

function Header() {
  return (
    <div className="bg-primary flex justifycenter items-center h-full">
      <h1 className="text-primary-foreground mx-auto text-2xl font-semibold">
        Horse Management System
      </h1>
    </div>
  );
}

function GlobalLayout() {
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-[8%]">
        <Header />
      </div>
      <div className="w-full h-[92%]">
        <Outlet />
      </div>
    </div>
  );
}

export default GlobalLayout;
