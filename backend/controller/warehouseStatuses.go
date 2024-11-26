package controller

import (
	"net/http"

	"github.com/aprbq/se-team15/config"
	"github.com/aprbq/se-team15/entity"
	"github.com/gin-gonic/gin"
)

func GetAllWarehouseStatuses(c *gin.Context) {
	db := config.DB()
	var warehouseStatuses []entity.WarehouseStatuses
	db.Find(&warehouseStatuses)
	c.JSON(http.StatusOK, &warehouseStatuses)
}
