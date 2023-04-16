import { Layout, theme, Avatar, Switch, Dropdown } from "antd";
import Breadcrumb from "./Breadcrumb";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LockOutlined,
  FullscreenOutlined,
  UserOutlined,
  SettingOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { selectTheme, setTheme } from "@/store/modules/system";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Header = styled(Layout.Header)`
  height: 48px;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  z-index: 99;
  padding: 0;
  height: 48;
  lineheight: 1;
  background: ${(props) => props.background};
  & .header-actions-item {
    display: flex;
    align-items: center;
    height: 48px;
    font-size: 18px;
    padding: 0 12px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.03);
    }
  }
`;

const Trigger = styled.div`
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  font-size: 18px;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
`;

export default function LayHeader(props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const themeName = useSelector(selectTheme);

  return (
    <Header background={colorBgContainer}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Trigger
          as={props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined}
          onClick={() => props.setCollapsed(!props.collapsed)}
        />
        <div style={{ height: 36, display: "flex", alignItems: "center" }}>
          <Breadcrumb menuList={props.menuList} />
        </div>
      </div>

      <div style={{ display: "flex", paddingRight: 16 }}>
        <div className="header-actions-item">
          <LockOutlined />
        </div>
        <div className="header-actions-item">
          <FullscreenOutlined />
        </div>
        <div
          className="header-actions-item"
          onClick={() => dispatch(setTheme())}
        >
          <Switch
            checked={themeName === "dark"}
            checkedChildren="🌜"
            unCheckedChildren="🌞"
          />
        </div>

        <Dropdown
          menu={{
            items: [
              {
                key: 1,
                label: "个人中心",
                icon: <UserOutlined />,
              },
              {
                key: 2,
                label: "个人设置",
                icon: <SettingOutlined />,
              },
              {
                type: "divider",
              },
              {
                key: 3,
                label: "退出登录",
                icon: <LoginOutlined />,
                onClick: () => {
                  localStorage.removeItem("token");
                  navigate("/login");
                },
              },
            ],
          }}
        >
          <div className="header-actions-item">
            <Avatar
              src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
              size="small"
              style={{ marginRight: 8 }}
            />
            <span style={{ fontSize: 14 }}>Cai Hai</span>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
}
