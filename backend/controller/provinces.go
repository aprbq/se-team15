package controller

import (
	"net/http"

	"github.com/aprbq/se-team15/config"
	"github.com/aprbq/se-team15/entity"
	"github.com/gin-gonic/gin"
)

func GetAllProvinces(c *gin.Context) {
	db := config.DB()
	var provinces []entity.Provinces
	db.Find(&provinces)
	c.JSON(http.StatusOK, &provinces)
}
