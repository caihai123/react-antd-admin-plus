import { useEffect, useState, createElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Skeleton, theme } from "antd";
import { Scrollbars } from "react-custom-scrollbars";
import { selectTheme } from "@/store//modules//system";
import { useSelector } from "react-redux";

// import * as Icon from "@ant-design/icons";
import * as Icon from "@ant-design/icons";

// 动态渲染icon
const antdIcon = function (icon) {
  return icon && createElement(Icon[icon]);
};

const getItem = function ({ id, type, title, path, children, icon }) {
  return {
    key: path || id,
    label: title,
    icon: icon ? antdIcon(icon) : "",
    children:
      type === "2" ? (children || []).map((item) => getItem(item)) : undefined,
  };
};

export default function LayMenu({ initialMenuList, loading }) {
  // 监听路由变化，设置菜单选中状态
  const location = useLocation();

  const [activePathname, setActivePathname] = useState(location.pathname);
  useEffect(() => {
    setActivePathname(location.pathname);
  }, [location]);

  const [menuList, setMenuList] = useState([]);
  useEffect(() => {
    setMenuList(initialMenuList.map((item) => getItem(item)));
  }, [initialMenuList]);

  const navigate = useNavigate();

  const themeName = useSelector(selectTheme);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Skeleton
      active
      loading={loading}
      paragraph={{ rows: 6 }}
      title={false}
      style={{ padding: 20 }}
    >
      <Scrollbars style={{ height: "calc(100% - 64px)" }} autoHide>
        <Menu
          mode="inline"
          selectedKeys={[activePathname]}
          items={menuList}
          onClick={({ key }) => navigate(key)}
          style={{ border: "none", background: colorBgContainer }}
          theme={themeName === "dark" ? "dark" : "light"}
        ></Menu>
      </Scrollbars>
    </Skeleton>
  );
}
