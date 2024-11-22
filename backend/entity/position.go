
package entity

import (
	"gorm.io/gorm"
)

type Positions struct {
	gorm.Model
	Position string

	Employees []Employee `gorm:"foreignKey:PositionID"`
}