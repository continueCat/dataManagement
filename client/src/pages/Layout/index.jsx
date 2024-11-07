import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Switch } from "antd";

import "./style.scss";
import { Outlet } from "react-router-dom";
const { Sider, Header } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("数据详情", "1", <PieChartOutlined />),
  getItem("标签详情", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Files", "6", <FileOutlined />),
];

const headerStyle = {
  color: "#fff",
  height: 64,
  paddingInline: 30,
  lineHeight: "64px",
};

const LayoutApp = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Header style={headerStyle} className="layout-header">
        数据信息管理平台
        <Switch
          checkedChildren="中文"
          unCheckedChildren="En"
          defaultChecked
          className="custom-switch"
        />
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
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
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
