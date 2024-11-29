package entity


import "gorm.io/gorm"


type ProductLocation struct {

   gorm.Model

   Quantity int 
   
   ProductID *uint          
   Product   Product `gorm:"foreignKey:ProductID"`

   LocationID *uint          
   Location   Location `gorm:"foreignKey:LocationID"`
}