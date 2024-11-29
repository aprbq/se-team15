package entity


import "gorm.io/gorm"


type LocationStatus struct {

   gorm.Model

   StatusName string 
   
   Location  []Location `gorm:"foreignKey:LocationStatusID"`

}