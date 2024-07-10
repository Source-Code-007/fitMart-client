import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "about-us",
        element: <h2>About Us Page</h2>,
      },
    ],
  },
]);

export default routes;
