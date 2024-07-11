import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-[127px]">
        <Outlet />
      </div>
      <div className="py-2 bg-red-500">Footer</div>
    </div>
  );
};

export default MainLayout;
