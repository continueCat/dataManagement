import React, { useState } from "react";
import {
  DesktopOutlined,
  PieChartOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Switch, Popconfirm } from "antd";

import "./style.scss";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { LoginOut } from "../../store/modules/user";

const { Sider, Header } = Layout;

function getItem(label, key, icon, children) {
  return {
    label,
    key,
    icon,
    children,
  };
}

const items = [
  getItem("数据详情", "/Data", <PieChartOutlined />),
  getItem("标签详情", "/Tags", <DesktopOutlined />),
];

const headerStyle = {
  color: "#fff",
  height: 64,
  paddingInline: 30,
  lineHeight: "64px",
};

const LayoutApp = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const handleMenuClick = (item) => {
    const path = item.key;
    navigate(path);
  };

  //获取当前路由路径
  const location = useLocation();

  const userName = useSelector((state) => state.user.userName);

  const dispatch = useDispatch();
  const onConfirm = () => {
    dispatch(LoginOut());
    navigate("/login");
  };

  return (
    <>
      <Header style={headerStyle} className="layout-header">
        <div className="header-left">
          <span>数据管理平台</span>
          <Switch
            checkedChildren="中文"
            unCheckedChildren="En"
            defaultChecked
            className="custom-switch"
          />
        </div>

        <div className="userInfo">
          <span className="user-name">{userName}</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={onConfirm}
            >
              <PoweroffOutlined />
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            selectedKeys={location.pathname}
            mode="inline"
            items={items}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout className="layout-content">
          <Outlet></Outlet>
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutApp;
