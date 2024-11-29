import React, { useState, useEffect } from "react";
import { Row, Col, message } from "antd";
import { useNavigate } from "react-router-dom";
import { LocationInterface } from "../interfaces/InterfaceFull";
import { GetAllLocation } from "../services/https/index";
import pichome from "../../src/assets/home_icon.png";
import "./PageA.css";

const PageA: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [locations, setLocations] = useState<LocationInterface[]>([]);
  const navigate = useNavigate();

  const getLocation = async () => {
    let res = await GetAllLocation();
    if (res.status === 200) {
      setLocations(res.data);
    } else {
      setLocations([]);
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };

  const groupByWarehouse = (): { warehouseID: number; total: number }[] => {
    const grouped = locations.reduce((acc, location) => {
      const warehouseID = location.WarehouseID ?? 0;
      if (!acc[warehouseID]) {
        acc[warehouseID] = 0;
      }
      acc[warehouseID]++;
      return acc;
    }, {} as Record<number, number>);

    return Object.entries(grouped).map(([warehouseID, total]) => ({
      warehouseID: parseInt(warehouseID),
      total,
    }));
  };

  const getUsedHeightPercentage = (used: number, total: number): string => {
    const percentage = (used / total) * 100;
    return `${percentage}%`;
  };

  const getColorBasedOnUsage = (used: number, total: number): string => {
    const percentage = (used / total) * 100;
    if (percentage >= 100) {
      return "#ff4d4f"; // Red for 100%
    } else if (percentage >= 75) {
      return "#fa8c16"; // Orange for 75%
    } else if (percentage >= 50) {
      return "#ffec3d"; // Yellow for 50%
    }
    return "#52c41a"; // Green for below 50%
  };

  useEffect(() => {
    getLocation();
  }, []);

  const groupedWarehouses = groupByWarehouse();

  return (
    <div style={{ margin: "0", padding: "0", backgroundColor: "#f5f5f5" }}>
      {contextHolder}
      <div style={{ padding: "20px"}} className="banner">
        <h1>Locations</h1>
      </div>
      <div style={{ padding: "20px" }}>
        <Row gutter={[16, 16]}>
          {groupedWarehouses.map((warehouse, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <div
                className="card-1"
                style={{
                  padding: "15px",
                }}
                onClick={() => navigate(`/page-b/${warehouse.warehouseID}/1`)}
              >
                {/* House Body */}
                <div
                  style={{
                    backgroundColor: "white",
                    width: "200px",
                    height: "180px",
                    position: "relative",
                    overflow: "hidden",
                    margin: "0 auto 20px",
                  }}
                >
                  <img
                    src={pichome}
                    alt="Warehouse"
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      zIndex: 2,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      height: getUsedHeightPercentage(warehouse.warehouseID, warehouse.total),
                      backgroundColor: getColorBasedOnUsage(warehouse.warehouseID, warehouse.total),
                      transition: "height 0.3s ease",
                      zIndex: 1,
                    }}
                  ></div>
                </div>

                {/* Warehouse Info */}
                <div style={{ textAlign: "center" }}>
                  <h3>Warehouse ID: {warehouse.warehouseID}</h3>
                </div>
                <div style={{ textAlign: "left" ,paddingLeft:"10px"}}>
                  <h3>Warehouse ID : {warehouse.warehouseID}</h3>
                  <h3>Space Totals : {warehouse.total}</h3>
                  <h3>Space Uses : {warehouse.total}</h3>
                  <h3>Space Broken : {warehouse.total}</h3>
                  <h3>Space Free : {warehouse.total}</h3>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default PageA;
