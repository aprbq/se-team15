// SignUp SignIn
package controller

import (
	"errors"

	"net/http"

	"time"

	"github.com/gin-gonic/gin"

	"golang.org/x/crypto/bcrypt"

	"gorm.io/gorm"

	"github.com/aprbq/se-team15/config"

	"github.com/aprbq/se-team15/entity"

	"github.com/aprbq/se-team15/services"
)

type (
	Authen struct {
		Email    string
		Password string
	}

	signUp struct {
		E_FirstName string
		E_LastName  string
		Avatar      string
		Number      string
		Email       string
		Password    string
		Address     string
		StartDate   time.Time
		AccessLevel string

		GenderID    uint
		PositionID  uint
		WarehouseID uint
	}
)

func SignUpEmployees(c *gin.Context) {

	var payload signUp

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	var userCheck entity.Employee

	result := db.Where("email = ?", payload.Email).First(&userCheck)
	if result.Error != nil && !errors.Is(result.Error, gorm.ErrRecordNotFound) {

		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return

	}

	if userCheck.ID != 0 {

		c.JSON(http.StatusConflict, gin.H{"error": "Email is already registered"})
		return

	}

	hashedPassword, _ := config.HashPassword(payload.Password)
	user := entity.Employee{

		E_FirstName: payload.E_FirstName,
		E_LastName:  payload.E_LastName,
		Avatar:      payload.Avatar,
		Number:      payload.Number,
		Email:       payload.Email,
		Password:    hashedPassword,
		Address:     payload.Address,
		StartDate:   payload.StartDate,
		AccessLevel: payload.AccessLevel,

		GenderID:    payload.GenderID,
		PositionID:  payload.PositionID,
		WarehouseID: payload.WarehouseID,
	}
	if err := db.Create(&user).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return

	}
	c.JSON(http.StatusCreated, gin.H{"message": "Sign-up successful"})

}

func SignInEmployees(c *gin.Context) {
	var payload Authen
	var user entity.Employee

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB().Raw("SELECT * FROM employees WHERE email = ?", payload.Email).Scan(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password is incorrect"})
		return
	}

	jwtWrapper := services.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(user.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token_type":   "Bearer",
		"token":        signedToken,
		"id":           user.ID,
		"access_level": user.AccessLevel, // ส่งค่า AccessLevel หรือ Position
		"avatar":       user.Avatar, // ส่ง Avatar ไปด้วย
		"e_firstname":       user.E_FirstName,
		"e_lastname":       user.E_LastName,
	})
}
	