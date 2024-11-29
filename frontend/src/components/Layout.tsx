import React, { useState  } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu, Avatar, Button, Drawer } from "antd";
import { UserOutlined} from "@ant-design/icons";
import "./Layout.css";
import logoc from "../assets/Logocat.png";

const { Header, Content, Footer } = Layout;

const SharedLayout: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const avatar = localStorage.getItem("avatar");
  const firstName = localStorage.getItem("e_firstname");
  const lastName = localStorage.getItem("e_lastname");
  const accessLevel = localStorage.getItem("access_level");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("e_firstname");
    localStorage.removeItem("e_lastname");
    localStorage.removeItem("avatar");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const menuItems = [
    {
      key: "1",
      label: <Link to="/manager">Home</Link>,
      icon: <img src="../../src/assets/building.png" alt="Home" style={{ width: 24 }} />,
      visible: accessLevel === "Manager" || accessLevel === "Employee",
    },
    {
      key: "2",
      label: <Link to="/employee">Employee</Link>,
      icon: <img src="../../src/assets/employees.png" alt="Employee" style={{ width: 24 }} />,
      visible: accessLevel === "Manager",
    },
    {
      key: "3",
      label: <Link to="/customer">Customer</Link>,
      icon: <img src="../../src/assets/public-relation.png" alt="Customer" style={{ width: 24 }} />,
      visible: accessLevel === "Manager",
    },
    {
      key: "4",
      label: <Link to="/warehouse">Warehouse</Link>,
      icon: <img src="../../src/assets/warehouse_menu.png" alt="Warehouse" style={{ width: 24 }} />,
      visible: accessLevel === "A",
    },
    {
      key: "5",
      label: <Link to="/warehouse">Count</Link>,
      icon: <img src="../../src/assets/calculator.png" alt="Warehouse" style={{ width: 24 }} />,
      visible: accessLevel === "A",
    },
    {
      key: "6",
      label: <Link to="/warehouse">Products</Link>,
      icon: <img src="../../src/assets/box.png" alt="Warehouse" style={{ width: 24 }} />,
      visible: accessLevel === "A",
    },
    {
      key: "7",
      label: <Link to="/warehouse">Transaction</Link>,
      icon: <img src="../../src/assets/transaction.png" alt="Warehouse" style={{ width: 24 }} />,
      visible: accessLevel === "A",
    },
    {
      key: "8",
      label: <Link to="/warehouse">Supplier</Link>,
      icon: <img src="../../src/assets/supplier.png" alt="Warehouse" style={{ width: 24 }} />,
      visible: accessLevel === "A",
    },
    {
      key: "9",
      label: <Link to="/warehouse">Location</Link>,
      icon: <img src="../../src/assets/zone-picking.png" alt="Warehouse" style={{ width: 24 }} />,
      visible: accessLevel === "A",
    },
    {
      key: "10",
      label: <Link to="/warehouse">Order</Link>,
      icon: <img src="../../src/assets/completed-task.png" alt="Warehouse" style={{ width: 24 }} />,
      visible: accessLevel === "A",
    },
    {
      key: "11",
      label: <Link to="/warehouse">Shipment</Link>,
      icon: <img src="../../src/assets/distribution.png" alt="Warehouse" style={{ width: 24 }} />,
      visible: accessLevel === "A",
    },

  ];

  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo">
          <img src={logoc} alt="Logo" className="logo-image" />
          <span className="logo-text">WAREHOUSE</span>
        </div>
        <img
          src="../../src/assets/menu2.gif" 
          alt="Menu Icon"
          onClick={toggleDrawer} 
          className="menu-toggle-gif"
        />
        <div className="avatar-section">
          <Avatar
            src={avatar ? `http://localhost:8080${avatar}` : undefined}
            size="large"
            icon={!avatar && <UserOutlined />}
            className="avatar-s"
          />
          <span className="user-name">
            {firstName} {lastName}
          </span>
          <Button
            type="link"
            onClick={handleLogout}
            className="logout-button"
            style={{ color: "white" }}
          >
            <img
              src="../../src/assets/close.png"
              alt="Logout"
              className="logout-icon"
            />
          </Button>
        </div>
      </Header>
      <Drawer
           title={<div className="ant-menu-title">Menu</div>}
           placement="left"
           onClose={toggleDrawer}
           visible={drawerVisible}
           className="drawer-menu"
        >
          <Menu mode="vertical">
            {menuItems
              .filter((item) => item.visible) 
              .map((item) => (
                <Menu.Item key={item.key} icon={item.icon}>
                  {item.label}
                </Menu.Item>
              ))}
          </Menu>
      </Drawer>
      <Content className="content">
        <Outlet />
      </Content>
      <Footer className="footer">
        <div className="footer-content">support@warehouse.com</div>
      </Footer>
    </Layout>
  );
};

export default SharedLayout;