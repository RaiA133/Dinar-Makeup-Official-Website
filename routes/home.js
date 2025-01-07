const route = require('express').Router()
const mainController = require('../controllers/mainController')
const middlewares = require('../middlewares')

route.get('/health-check', mainController.healthCheck)
route.get('/test-session', middlewares.verifyToken, mainController.testSession)

module.exports = route
