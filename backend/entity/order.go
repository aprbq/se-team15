package entity

import (
	"gorm.io/gorm"
)

type Order struct {
	gorm.Model
	ShipNumber string  `json:"shipment_number"`
	Price      float32 `json:"price"`

	Bill      []Bill      `gorm:"foreignKey:OrderID"` // ตารางหนึ่ง
	OrderItem []OrderItem `gorm:"foreignKey:OrderID"` // ตารางหนึ่ง

	OrderStatusID *uint
	OrderStatus   OrderStatus `gorm:"foriegnKey:OrderStatusID"` // ตารางหลาย

	EmployeeID *uint
	Employee   Employee `gorm:"foriegnKey:EmployeeID"` // ตารางหลาย

	ShipmentID *uint
	Shipment   Shipment `gorm:"foriegnKey:ShipmentID"` // ตารางหลาย

	CustomerID *uint
	Customer   Customer `gorm:"foriegnKey:CustomerID"` // ตารางหลาย
}
