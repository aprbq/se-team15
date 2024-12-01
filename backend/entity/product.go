package entity

import (
	"gorm.io/gorm"
)

type Product struct {
	gorm.Model

	ProductName string
	OrderItem   []OrderItem `gorm:"foreignKey:ProductID"`

	EmployeeID *uint
	Employee   Employee `gorm:"foriegnKey:EmployeeID"`
}
