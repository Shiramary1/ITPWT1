const express = require('express')
const router = express.Router()
const controller = require('../controllers/cart.controller')

router.get('/', controller.getCartItems)
router.post('/', controller.addToCart)
router.put('/:id', controller.updateCartItem)
router.delete('/:id', controller.removeCartItem)
router.delete('/', controller.clearCart)

module.exports = router
