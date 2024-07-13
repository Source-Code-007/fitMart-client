import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  FaClock,
  FaDollarSign,
  FaHome,
  FaMicroblog,
  FaQuestionCircle,
  FaTrophy,
} from "react-icons/fa";
import {
  MdOutlineMiscellaneousServices,
  MdOutlineUnsubscribe,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import logo from "../assets/img/logo.png";
import { Button, Layout, Menu, MenuProps, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RiTeamFill } from "react-icons/ri";
import { BiCategory, BiPhone } from "react-icons/bi";
import { PiFlagBanner } from "react-icons/pi";
import { GiChoice } from "react-icons/gi";
import moment from "moment";

import {
  DashboardOutlined,
  HomeFilled,
  OrderedListOutlined,
  ProductFilled,
  ShoppingOutlined,
} from "@ant-design/icons";
const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children?) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const DashboardLayout = () => {
  const [time, setTime] = useState<string | null>(null);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format("LTS"));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  //   const items = [
  //     getItem("Dashboard", "/dashboard", <FaHome />),
  //     // getItem("My order", "/dashboard/order-list", <FaCartPlus />),

  //     getItem("Product", "/dashboard/product", <PiFlagBanner />),
  //     getItem(
  //       "Services",
  //       "/dashboard/services-list",
  //       <MdOutlineMiscellaneousServices />
  //     ),
  //   ];

  type MenuItem = Required<MenuProps>["items"][number];

  const items: MenuItem[] = [
    {
      label: <Link to={"/dashboard"}>Home</Link>,
      key: "home",
      icon: <HomeFilled />,
    },
    {
      label: <Link to={"/dashboard/products"}>Products</Link>,
      key: "Products",
      icon: <ProductFilled />,
    },
    {
      label: <Link to={"/dashboard/category"}>Category</Link>,
      key: "Category",
      icon: <BiCategory />,
    },
    {
      label: <Link to={"/dashboard/order"}>Order</Link>,
      key: "order",
      icon: <OrderedListOutlined />,
    },
  ];

  const routes = [
    {
      key: "Home",
      path: "/dashboard",
      label: "Home",
      icon: <DashboardOutlined />,
    },
    {
      key: "products",
      path: "/dashboard/products",
      label: "Products",
      icon: <ShoppingOutlined />,
    },
  ];

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        // style={{
        //   overflow: "auto",
        //   height: "100vh",
        //   position: "fixed",
        //   left: 0,
        //   top: 0,
        //   bottom: 0,
        // }}
      >
        <Menu theme="dark">
          <div>
            <div className=" flex justify-center mt-5">
              <img
                src={logo}
                alt="digitalagencypark_logo"
                style={{ height: "50px", width: "50px", borderRadius: "100%" }}
              />
            </div>
          </div>

          <p className=" text-white text-center  my-5 capitalize font-semibold">
            Fit Mart
          </p>
        </Menu>

        <div className="demo-logo-vertical" />

        <Menu
          //   onClick={({ key }) => {
          //     key ? navigate(key) : navigate("/dashboard");
          //   }}
          theme="dark"
          defaultSelectedKeys={["dashboard"]}
          mode="inline"
          items={items}
        />
      </Sider>

      <Layout
      // style={{
      //   marginLeft: 200,
      // }}
      >
        <Header>
          <div className="demo-logo" />
          <Menu mode="horizontal" theme="dark">
            <h2 className="text-white font-bold flex items-center gap-1 pr-2">
              <FaClock />
              {time}
            </h2>
            {routes.map((route) => (
              <Menu.Item
                key={route.key}
                icon={route.icon}
                onClick={() => navigate(route.path)}
              >
                {/* Use onClick to handle navigation */}
                {route.label}
              </Menu.Item>
            ))}
          </Menu>
        </Header>

        <Content>
          <div
            style={{
              padding: 0,
              minHeight: 360,
              // background: colorBgContainer,
            }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default DashboardLayout;
