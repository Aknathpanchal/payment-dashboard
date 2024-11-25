import React, { useState } from 'react';
import { Layout, ConfigProvider, Switch } from 'antd';
import AppHeader from './components/Header';
import Sidebar from './components/Sidebar';
import TransactionTable from './components/TransactionTable';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { useTheme } from './ThemeContext';
import './App.css';

const { Content } = Layout;

const App = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeMenu, setActiveMenu] = useState('dashboard'); // Track active menu

  // Define the theme for Ant Design
  const antdTheme = theme === 'dark' ? {
    token: {
      colorPrimary: '#1890ff',
      colorBgBase: '#1a1a1a',
      colorTextBase: '#fff',
      colorLink: '#1890ff',
      colorBorder: '#333',
      colorBgContainer: '#121212',
    },
  } : {
    token: {
      colorPrimary: '#1890ff',
      colorBgBase: '#f0f2f5',
      colorTextBase: '#000',
      colorLink: '#1890ff',
      colorBorder: '#d9d9d9',
      colorBgContainer: '#fff',
    },
  };

  return (
    <ConfigProvider theme={antdTheme}>
      <Layout style={{ minHeight: '100vh' }} className={theme}>
        <AppHeader theme={theme} />

        {/* Theme Toggle */}
        <Switch
          checkedChildren="Dark"
          unCheckedChildren="Light"
          defaultChecked
          onChange={toggleTheme}
          style={{ position: 'absolute', top: '20px', right: '20px' }}
        />

        <Layout>
          <Sidebar theme={theme} onMenuSelect={setActiveMenu} /> {/* Pass state handler */}
          <Layout style={{ padding: '16px' }}>
            <Content>
              {activeMenu === 'dashboard' && <AnalyticsDashboard />}
              {activeMenu === 'transactions' && <TransactionTable />}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;

