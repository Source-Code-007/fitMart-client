import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Homepage from "../pages/Homepage";
import Products from "../pages/Products";
import Product from "../pages/Product";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "about-us",
        element: <h2>About Us Page</h2>,
      },
      {
        path: "products",
        element: <Products/>,
      },
      {
        path: "product/:id",
        element: <Product/>,
      },
    ],
  },
]);

export default routes;
