import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  TableOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
const { Sider } = Layout;

const Sidebar = ({ theme, onMenuSelect }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      width={200}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      trigger={null}
      className={theme === "dark" ? "sidebar-dark" : "sidebar-light"}
      style={{ overflow: "auto" }}
    >
      <div
        style={{
          padding: "16px",
          display: "flex",
          justifyContent: collapsed ? "center" : "flex-end",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        onClick={(e) => onMenuSelect(e.key)}
        className={theme === "dark" ? "sidebar-dark" : "sidebar-light"}
        style={{ borderRight: 0 }}
        items={[
          {
            key: "dashboard",
            icon: <DashboardOutlined />,
            label: "Dashboard",
          },
          {
            key: "transactions",
            icon: <TableOutlined />,
            label: "Transactions",
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
