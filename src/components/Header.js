import React from 'react';
import { Layout, Typography } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = ({ theme }) => (
  <Header
    style={{
      background: theme === 'dark' ? '#1a1a1a' : '#fff',
      padding: '0 16px',
    }}
  >
    <Title level={4} style={{     margin: "auto",
    height: "100%",
    display: "flex",
    alignItems: "center", color: theme === 'dark' ? '#fff' : '#000' }}>
      LOGO
    </Title>
  </Header>
);

export default AppHeader;
