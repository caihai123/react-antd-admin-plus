import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import "./index.css";
import App from "./App";
import store from "@/store";
import { Provider } from "react-redux";
import "@/console";
import '@/mock';

console.log(process.env)

// if (process.env.REACT_APP_MOCK && process.env.NODE_ENV === "development") {
//   require("@/mock");
// }

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
