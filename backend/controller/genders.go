package controller

import (
	"net/http"

	"github.com/aprbq/se-team15/config"
	"github.com/aprbq/se-team15/entity"
	"github.com/gin-gonic/gin"
)

func GetListGenders(c *gin.Context) {
	var genders []entity.Genders

	db := config.DB()
	db.Find(&genders)
	c.JSON(http.StatusOK, &genders)
}