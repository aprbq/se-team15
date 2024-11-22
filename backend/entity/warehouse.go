package entity

import (
	"gorm.io/gorm"
)

type Warehouses struct {
	gorm.Model
	Warehouse_name string

	Employees []Employee `gorm:"foreignKey:PositionID"`
}