package controller

import (
	"net/http"

	"github.com/aprbq/se-team15/config"
	"github.com/aprbq/se-team15/entity"
	"github.com/gin-gonic/gin"
)

func GetAllWarehouses(c *gin.Context) {
	var warehouses []entity.Warehouses
	db := config.DB()
	results := db.Preload("Province").Preload("WarehouseType").Preload("WarehouseStatus").Find(&warehouses)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, warehouses)

}

func GetWarehouses(c *gin.Context) {
	ID := c.Param("id")
	var warehouse entity.Warehouses
	db := config.DB()
	results := db.Preload("Province").Preload("WarehouseType").First(&warehouse, ID)

	if results.Error != nil {
		// ถ้ามีข้อผิดพลาดในการดึงข้อมูลจากฐานข้อมูล
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	// เช็คถ้าไม่พบข้อมูล
	if warehouse.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	// ส่งข้อมูล Warehouse พร้อมสถานะ
	c.JSON(http.StatusOK, gin.H{})
}

func UpdateWarehouses(c *gin.Context) {
	var warehouse entity.Warehouses
	WarehouseID := c.Param("id")
	db := config.DB()
	result := db.First(&warehouse, WarehouseID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}
	if err := c.ShouldBindJSON(&warehouse); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}
	result = db.Save(&warehouse)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}

func DeleteWarehouses(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM warehouses WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})
}

func CreateWarehouses(c *gin.Context) {
	var warehouse entity.Warehouses

	// Bind the JSON payload to the warehouse struct
	if err := c.ShouldBindJSON(&warehouse); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}
	// Save the warehouse to the database
	db := config.DB()
	if result := db.Create(&warehouse); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	// Return success response with the created warehouse object
	c.JSON(http.StatusOK, gin.H{"message": "Warehouse created successfully", "data": warehouse})
}
