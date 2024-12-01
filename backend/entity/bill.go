package entity

import (
	"gorm.io/gorm"
)

type Bill struct {
	gorm.Model
	Amount float32 `json:"amount"`

	OrderID *uint
	Order   Order `gorm:"foriegnKey:OrderID"`

	CustomerID *uint
	Customer   Customer `gorm:"foriegnKey:CustomerID"`
}
