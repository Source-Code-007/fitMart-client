import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { Drawer } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAppSelector } from "../redux/hook";
import CartSlider from "../components/cart/CartSlider";
import CompoToTop from "../components/helpingCompo/CompoToTop";

const MainLayout = () => {
  const [cartDrawerVisible, setCartDrawerVisible] = useState(false);
  const { products } = useAppSelector((state) => state.cart);
  return (
    <div>
      <CompoToTop>
        <Navbar />
        <div className="mt-[135px]">
          <Outlet />
        </div>
        <Footer />
      </CompoToTop>

      {/* Cart drawer */}
      <span
        className={`h-10 w-10 bg-warning font-bold rounded-l-md flex items-center justify-center text-white fixed top-1/2 transition-all duration-500 cursor-pointer hover:scale-[1.02] ${
          products?.length > 0
            ? "right-0 visible opacity-100"
            : "-right-5 invisible opacity-0"
        } `}
        onClick={() => setCartDrawerVisible(true)}
      >
        <ShoppingCartOutlined />
      </span>
      <Drawer
        title="Cart"
        placement="right"
        closable={true}
        onClose={() => setCartDrawerVisible(false)}
        open={cartDrawerVisible}
        className=""
        style={{ zIndex: 200000 }}
      >
        {/* Add your cart content here */}
        <CartSlider
          isCartOpen={cartDrawerVisible}
          onClose={() => setCartDrawerVisible(false)}
        />
      </Drawer>
    </div>
  );
};

export default MainLayout;
