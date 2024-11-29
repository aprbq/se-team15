import { useState } from "react";
import { Button, Input, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import wareh from "../../assets/warehouse.jpg";
import title_e from "../../assets/title.png";
import people_m from "../../assets/peoplemanage.png";
import { SignIn } from "../../services/https/index"; 
import { SignInInterface } from '../../interfaces/SignIn';

function WarehouseLogin() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);  // สถานะการโหลด

  const onFinish = async (values: SignInInterface) => {
    setLoading(true);  
    let res = await SignIn(values);

    if (res.status === 200) {
      const { token, token_type, id, access_level, avatar, e_firstname, e_lastname } = res.data;

      messageApi.success("Sign-in successful");

      localStorage.setItem("isLogin", "true");
      localStorage.setItem("token", token);
      localStorage.setItem("token_type", token_type);
      localStorage.setItem("id", id);
      localStorage.setItem("access_level", access_level);
      localStorage.setItem("avatar", avatar);
      localStorage.setItem("e_firstname", e_firstname);
      localStorage.setItem("e_lastname", e_lastname);

      setTimeout(() => {
        switch (access_level) {
          case "Manager":
            navigate("/manager");
            break;
          case "A":
            navigate("/page-a");
            break;
          case "B":
            navigate("/page-b");
            break;
          case "C":
            navigate("/page-c");
            break;
          case "D":
            navigate("/page-d");
            break;
          default:
            navigate("/dashboard");
        }
      }, 3000); 
    } else {
      messageApi.error(res.data.error || "Sign-in failed");
      setLoading(false); 
    }
  };

  return (
    <div className="login-container">
      {contextHolder}
      <div className="background-square"></div>
      <div className="background-square-1"></div>
      <div className="background-square-2"></div>
      <div className="background-square-3"></div>
      <div className="background-square-4"></div>
      <div className="background-square-5"></div>
      <div className="background-square-6"></div>
      <div className="warehouse-image">
        <img src={wareh} alt="Warehouse" />
      </div>
      <div className="login-box">
        <div className="employ-image">
          <img src={people_m} alt="employ" />
        </div>
        <div className="login-content">
          <div className="title-image">
            <img src={title_e} alt="title" />
          </div>
          <div className="span"></div>
          <Form className="login-form" layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-button" disabled={loading}>
                LOGIN
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      {loading && (
        <div className="loading-overlay">
          <img src={"../../../src/assets/loading.gif"} alt="Loading..." />
        </div>
      )}
    </div>
  );
};

export default WarehouseLogin;
