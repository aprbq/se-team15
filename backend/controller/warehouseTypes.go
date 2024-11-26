package controller

import (
	"net/http"

	"github.com/aprbq/se-team15/config"
	"github.com/aprbq/se-team15/entity"
	"github.com/gin-gonic/gin"
)

func GetAllWarehouseTypes(c *gin.Context) {
	db := config.DB()
	var warehouseTypes []entity.WarehouseTypes
	db.Find(&warehouseTypes)
	c.JSON(http.StatusOK, &warehouseTypes)
}
