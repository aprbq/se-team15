import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu, Avatar, Button } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import "./Layout.css";
import logoc from "../assets/Logocat.png";

const { Header, Content } = Layout;

const SharedLayout: React.FC = () => {
  const avatar = localStorage.getItem("avatar");
  const firstName = localStorage.getItem("e_firstname");
  const lastName = localStorage.getItem("e_lastname");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("e_firstname");
    localStorage.removeItem("e_lastname");
    localStorage.removeItem("avatar");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo">
          <img src={logoc} alt="Logo" className="logo-image" />
          <span className="logo-text">WAREHOUSE</span>
        </div>
        <Menu theme="dark" mode="horizontal" className="menu">
          <Menu.Item key="1">
            <Link to="/manager">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/employee">Employee</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/customer">Customer</Link>
          </Menu.Item>
        </Menu>
        <div className="avatar-section">
          <Avatar
            src={avatar}
            size="large"
            icon={!avatar && <UserOutlined />}
          />
          <span className="user-name">
            {firstName} {lastName}
          </span>

          <Button
            icon={<LogoutOutlined />}
            type="link"
            onClick={handleLogout}
            className="logout-button"
            style={{ color: "white" }}
          />
        </div>
      </Header>
      <Content className="content">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default SharedLayout;
