package entity

import (
	"time"

	"gorm.io/gorm"
)

type Employee struct {
	gorm.Model
	E_FirstName string    `gorm:"not null"`
	E_LastName  string    `gorm:"not null"`
	Avatar      string    `gorm:"type:longtext"`
	Number      string    `gorm:"not null"`
	Email       string    `gorm:"uniqueIndex;not null"`
	Password    string    `gorm:"not null"`
	Address     string    `gorm:"not null"`
	StartDate   time.Time `gorm:"not null"`
	AccessLevel string    `gorm:"not null"`

	Shipment []Shipment `gorm:"foreignKey:EmployeeID"`
	Order    []Order    `gorm:"foreignKey:EmployeeID"`

	GenderID    uint
	Gender      Genders `gorm:"foriegnKey:GenderID"`
	PositionID  uint
	Position    Positions `gorm:"foreignKey:PositionID"`
	WarehouseID uint
	Warehouse   Warehouses `gorm:"foreignKey:WarehouseID"`
}
