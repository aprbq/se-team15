package entity

import "gorm.io/gorm"

type Location struct {
	gorm.Model

	Shelf int 
	Block int 

	WarehouseID *uint     
	Warehouse   Warehouses `gorm:"foreignKey:WarehouseID"`

	ZoneID *uint 
	Zone   Zone  `gorm:"foreignKey:ZoneID"`

	LocationStatusID *uint          
	LocationStatus   LocationStatus `gorm:"foreignKey:LocationStatusID"`

	// CreateByID *uint    
	// CreateBy   Employee `gorm:"foreignKey:CreateByID"`

	// UpdateByID *uint    
	// UpdateBy   Employee `gorm:"foreignKey:UpdateByID"`

}
