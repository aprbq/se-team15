package entity

import (
	"gorm.io/gorm"
)

type ShipStatus struct {
	gorm.Model
	ShipName string `json:"ship_name"`

	Shipment []Shipment `gorm:"foreignKey:ShipStatusID"`
}
