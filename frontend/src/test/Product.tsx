import React, { useState } from "react";
import { Button, Modal, Form, Input, InputNumber } from "antd"; // นำเข้า Form, Input, InputNumber
import { FormInstance } from "antd/es/form";

const Product: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();

  
  const showModal = () => {
    setIsModalVisible(true);
  };

 
  const handleOk = () => {
    form
      .validateFields() 
      .then((values) => {
        console.log("สินค้าใหม่:", values);
        // คุณสามารถส่งข้อมูลไปยัง backend หรือทำการบันทึกที่นี่
        setIsModalVisible(false); 
      })
      .catch((errorInfo) => {
        console.log("Error:", errorInfo);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false); 
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Button type="primary" onClick={showModal}>
        เพิ่มสินค้า
      </Button>

      <Modal
        title="เพิ่มสินค้า"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} 
      >
        <Form form={form} layout="vertical" name="add_product_form">
          <Form.Item
            label="ชื่อสินค้า"
            name="productName"
            rules={[{ required: true, message: "กรุณากรอกชื่อสินค้า!" }]}
          >
            <Input placeholder="กรอกชื่อสินค้า" />
          </Form.Item>

          <Form.Item
            label="ราคา"
            name="price"
            rules={[{ required: true, message: "กรุณากรอกราคา!" }]}
          >
            <InputNumber
              min={0}
              placeholder="กรอกราคา"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>
              ยกเลิก
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleOk}
            >
              เพิ่มสินค้า
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Product;
