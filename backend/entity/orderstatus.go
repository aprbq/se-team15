package entity

import (
	"gorm.io/gorm"
)

type OrderStatus struct {
	gorm.Model
	OrderName string `json:"order_name"`

	Order []Order `gorm:"foreignKey:OrderStatusID"`
}
