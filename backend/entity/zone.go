package entity


import "gorm.io/gorm"


type Zone struct {

   	gorm.Model

   	ZoneName string 
   
	Location  []Location `gorm:"foreignKey:ZoneID"`
}