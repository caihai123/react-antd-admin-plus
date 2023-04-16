import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/layout";
import Login from "@/pages/login";
import { ConfigProvider, App as AntdApp, theme } from "antd";
import zhCN from "antd/locale/zh_CN";
import { selectTheme } from "@/store/modules/system";
import { useSelector } from "react-redux";

export default function App() {
  const themeName = useSelector(selectTheme);

  const isLight = themeName !== "dark";

  return (
    <AntdApp>
      <ConfigProvider
        locale={zhCN}
        theme={{
          token: {
            borderRadius: 2,
            // colorBgBase: isLight ? "#fff" : "#242525",
            colorBgContainer: isLight ? "#ffffff" : "#242525",
            colorBgLayout: isLight ? "#f0f2f5" : "#2A2C2C",
            colorTextBase: isLight ? "#1E293B" : "#E2E8F0",
            colorBorder: isLight ? "#e5e7eb" : "#454847",
          },
          algorithm: isLight ? theme.defaultAlgorithm : theme.darkAlgorithm,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Layout />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </AntdApp>
  );
}
