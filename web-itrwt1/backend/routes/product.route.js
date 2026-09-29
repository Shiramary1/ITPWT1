const express = require('express')
const router = express.Router()
const controller = require('../controllers/product.controller')

router.get('/:id', controller.getProductById)

module.exports = router
