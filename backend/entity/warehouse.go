package entity

import (
	"gorm.io/gorm"
)

type Warehouses struct {
	gorm.Model
	//Warehouse_name    string
	WarehouseName     string `json:"warehouse_name" gorm:"unique"`
	WarehouseTypeID   uint
	Capacity          float64 `json:"capacity"` // หน่วย: m³ (ลูกบาศก์เมตร)
	WarehouseStatusID uint
	Address           string `json:"address"`
	Zipcode           string `json:"zipcode"`
	ProvinceID        uint
	Province          Provinces         `gorm:"foreignKey: ProvinceID" json:"province"`
	WarehouseType     WarehouseTypes    `gorm:"foreignKey: WarehouseTypeID" json:"warehouse_type"`
	WarehouseStatus   WarehouseStatuses `gorm:"foreignKey: WarehouseStatusID" json:"warehouse_status"`

	Employees []Employee `gorm:"foreignKey:PositionID"`
}
