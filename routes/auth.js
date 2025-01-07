const route = require('express').Router()
const authController = require('../controllers/authController')
const middlewares = require('../middlewares') 

route.post('/register', authController.register)
route.post('/login', authController.login)
route.post('/verify-email', authController.verifyEmail)
route.post('/verify-email/resend', authController.resendVerification)
route.post('/logout', middlewares.verifyToken, authController.logout)

module.exports = route
