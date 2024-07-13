import { createBrowserRouter, Link } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Homepage from "../pages/Homepage";
import Products from "../pages/Products";
import Product from "../pages/Product";
import DashboardLayout from "../layout/DashboardLayout";
import DashboardProducts from "../pages/Dashboard/Products";
import Category from "../pages/Dashboard/Category";
import Order from "../pages/Dashboard/Order";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import NotFound from "../pages/NotFound";
import AboutUs from "../pages/AboutUs";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "product/:id",
        element: <Product />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/dashboard",
        element: (
          <div className="bg-secondary-100 flex items-center justify-center h-screen font-bold text-2xl">
            Homepage of dashboard is coming soon!
          </div>
        ),
      },
      {
        path: "products",
        element: <DashboardProducts />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "order",
        element: <Order />,
      },
    ],
  },
]);

export default routes;
