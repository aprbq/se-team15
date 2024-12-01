package entity

import (
	"gorm.io/gorm"
)

type OrderItem struct {
	gorm.Model
	Quantity int     `json:"quantity"`
	Price    float32 `json:"price"`

	OrderID *uint
	Order   Order `gorm:"foriegnKey:OrderID"`

	ProductID *uint
	Product   Product `gorm:"foriegnKey:ProductID"`
}
