import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./router/routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ConfigProvider } from "antd";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0e7673",
        },
        components: {
          Button: {
            colorPrimary: "#0e7673",
          },
          Checkbox: {
            colorPrimary: "#0e7673",
          },
        },
      }}
    >
      <Provider store={store}>
        <RouterProvider router={routes}></RouterProvider>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
