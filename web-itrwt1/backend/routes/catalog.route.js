const express = require('express')
const router = express.Router()
const controller = require('../controllers/catalog.controller')

router.get('/', controller.getAllCatalogItems)

module.exports = router
