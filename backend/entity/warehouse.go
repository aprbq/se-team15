package entity

import (
	"gorm.io/gorm"
)

type Warehouses struct {
	gorm.Model
	WarehouseName     string `json:"warehouse_name" gorm:"unique"`
	WarehouseTypeID   uint
	Capacity          float64 `json:"capacity"` // หน่วย: m³ (ลูกบาศก์เมตร)
	WarehouseStatusID uint
	Address           string `json:"address"`
	Zipcode           string `json:"zipcode"`
	ProvinceID        uint
	Province          *Provinces         `gorm:"foreignKey: ProvinceID" `
	WarehouseType     *WarehouseTypes    `gorm:"foreignKey: WarehouseTypeID" `
	WarehouseStatus   *WarehouseStatuses `gorm:"foreignKey: WarehouseStatusID" `

	Employees []Employee `gorm:"foreignKey:WarehouseID"`
	Location []Location `gorm:"foreignKey:WarehouseID"`

}
