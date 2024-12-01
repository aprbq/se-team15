package entity

import (
	"time"

	"gorm.io/gorm"
)

type Shipment struct {
	gorm.Model
	Number       string    `gorm:"varchar(10)" json:"shipment_number"`
	ShipDate     time.Time `json:"ship_date"`
	DeliveryDate time.Time `json:"delivery_date"`
	Quantity     int       `json:"quantity"`

	ShipStatusID *uint
	ShipStatus   ShipStatus `gorm:"foriegnKey:ShipStatusID"`

	EmployeeID *uint
	Employee   Employee `gorm:"foriegnKey:EmployeeID"`

	Order []Order `gorm:"foreignKey:ShipmentID"`
}
