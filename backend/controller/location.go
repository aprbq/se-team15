package controller

import (
	"net/http"
	"github.com/aprbq/se-team15/config"
	"github.com/aprbq/se-team15/entity"
	"github.com/gin-gonic/gin"
)


func GetAll(c *gin.Context) {
    var location []entity.Location
    db := config.DB()
    results := db.Preload("LocationStatus").Preload("Zone").Preload("Warehouse").Find(&location)

    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }
    c.JSON(http.StatusOK, location)
}

func Get(c *gin.Context) {
    ID := c.Param("id")
    var location entity.Location
    db := config.DB()
    results := db.Preload("LocationStatus").Preload("Zone").Preload("Warehouse").First(&location, ID)

    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }
    if location.ID == 0 {
        c.JSON(http.StatusNoContent, gin.H{})
        return
    }
    c.JSON(http.StatusOK, location)
}