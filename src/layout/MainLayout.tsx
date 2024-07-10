import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <div className="py-2 bg-green-500">Navbar</div>
      <Outlet />
      <div className="py-2 bg-red-500">Footer</div>
    </div>
  );
};

export default MainLayout;
