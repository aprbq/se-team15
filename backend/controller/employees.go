package controller

import (
	"net/http"

	"github.com/aprbq/se-team15/config"
	"github.com/aprbq/se-team15/entity"
	"github.com/gin-gonic/gin"
)

func GetListEmployees(c *gin.Context) {

	var employees []entity.Employee
	db := config.DB()

	results := db.Preload("Gender").Preload("Positions").Find(&employees)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, employees)

}

func GetEmployees(c *gin.Context) {

	ID := c.Param("id")

	var employees entity.Employee
	db := config.DB()

	results := db.Preload("Gender").Preload("Positions").First(&employees, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if employees.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, employees)

}

func UpdateEmployees(c *gin.Context) {

	ID := c.Param("id")

	var employees entity.Employee
	db := config.DB()

	result := db.First(&employees, ID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}
	if err := c.ShouldBindJSON(&employees); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&employees)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})

}

func DeleteEmployees(c *gin.Context) {

	ID := c.Param("id")

	db := config.DB()
	if tx := db.Exec("DELETE FROM users WHERE id = ?", ID); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}