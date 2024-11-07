import React, { useState } from "react";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { Layout, Menu, Switch } from "antd";

import "./style.scss";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
  getItem("数据详情", "Data", <PieChartOutlined />),
  getItem("标签详情", "Tags", <DesktopOutlined />),
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
    // console.log("菜单被点击", item);
    const path = item.key;
    navigate(path);
  };

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
