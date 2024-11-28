import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { message } from "antd";
import { LocationInterface } from "../interfaces/InterfaceFull";
import { GetAllLocation } from "../services/https/index";
import "./PageA.css";

const PageB: React.FC = () => {
  const [messageApi] = message.useMessage();
  const { warehouseID, shelfID } = useParams();
  const [locations, setLocations] = useState<LocationInterface[]>([]);
  const [shelfIDs, setShelfIDs] = useState<number[]>([]); // New state for shelf IDs
  const [loading, setLoading] = useState(true);

  console.log(shelfID)

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

  const fetchWarehouseLocations = async () => {
    setLoading(true);
    const res = await GetAllLocation();
    if (res.status === 200) {
      const warehouseLocations: LocationInterface[] = res.data.filter(
        (location: LocationInterface) => location.ZoneID === parseInt(warehouseID || "0")
      );
      setLocations(warehouseLocations);
  
      // Extract unique shelf IDs (handling null Shelf values)
      const uniqueShelfIDs = [
        ...new Set(warehouseLocations.map((location) => location.Shelf ?? 0)),
      ];
      setShelfIDs(uniqueShelfIDs as number[]);
    }
    setLoading(false);
  };

  const groupLocationsByZone = () => {
    const grouped: Record<number, LocationInterface[]> = {};
    locations.forEach((location) => {
      const zone = location.ZoneID ?? 0;
      if (!grouped[zone]) grouped[zone] = [];
      grouped[zone].push(location);
    });
    return grouped;
  };

  const fetchShelfLocations = async () => {
    setLoading(true);
    const res = await GetAllLocation();
    if (res.status === 200) {
      const shelfLocations = res.data.filter(
        (location: LocationInterface) =>
          location.ZoneID === parseInt(warehouseID || "0") &&
          location.Shelf === parseInt(shelfID || "0")
      );
      setLocations(shelfLocations);
    }
    setLoading(false);
  };

  useEffect(() => {
    getLocation();
    fetchWarehouseLocations();
    fetchShelfLocations();
  }, [warehouseID, shelfID]);

  const groupedZones = groupLocationsByZone(); // Grouping locations by Zone

  return (
    <div style={{ textAlign: "center" }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div style={{ display: "flex" }}>
            {shelfIDs.map((shelf) => (
              <div key={shelf} style={{ textAlign: "center" }}>
                <Link to={`/page-b/${warehouseID}/${shelf}`}>
                  <button className="btn-1">
                    View Shelf {shelf}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* <h1>Page B</h1>
      <h1>Warehouse Details</h1>
      <p>Warehouse ID: {warehouseID}</p> */}
      {/* {loading ? (
        <p>Loading...</p>
      ) : ( */}
        <div>
          {/* <h3>Blocks in Shelf {shelfID}</h3> */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Object.keys(groupedZones).length}, 1fr)`, // Number of columns based on the number of zones
              gap: "10px",
              justifyContent: "center",
            }}
          >
            {Object.entries(groupedZones).map(([zoneID, zoneLocations]) => (
              <div key={zoneID} style={{ display: "flex", flexDirection: "column" }}>
                {zoneLocations.map((location) => (
                  <div
                    key={location.ID}
                    style={{
                      padding: "10px",
                      width: "200px",
                      height: "200px",
                      backgroundColor: "#1890ff",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "4px",
                      marginBottom: "5px",
                    }}
                  >
                    Zone : {location.ZoneID} {/* Display Block value */}
                    Block :{location.Block}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      {/* )} */}
    </div>
  );
};

export default PageB;
