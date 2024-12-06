import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, InputNumber, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const PageC: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<string[]>(["electronics", "fashion", "food"]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("สินค้าใหม่:", values);
        setIsModalVisible(false);
      })
      .catch((errorInfo) => {
        console.log("Error:", errorInfo);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // ใช้ useEffect สำหรับเรียกฟังก์ชัน fetchCategories เมื่อคอมโพเนนต์ถูก mount
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesFromEntity = ["electronics", "fashion", "food"];
      setCategories(categoriesFromEntity);
    };

    fetchCategories();
  }, []); // ใส่ [] เพื่อให้มันทำงานแค่ครั้งเดียวเมื่อคอมโพเนนต์โหลด

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

          <Form.Item
            label="ประเภทสินค้า"
            name="category"
            rules={[{ required: true, message: "กรุณาเลือกประเภทสินค้า!" }]}
          >
            <Select placeholder="เลือกประเภทสินค้า" allowClear>
              {categories.map((category) => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="อัปโหลดรูปภาพ" name="image">
            <Upload
              showUploadList={false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>คลิกเพื่อเลือกไฟล์รูปภาพ</Button>
            </Upload>
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

export default PageC;
