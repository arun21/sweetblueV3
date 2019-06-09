const express = require('express');
const router = express.Router();
const CartController = require("../controllers/cart.controller");
const CartService = require("../services/cart.service");
const cartValidators = require("../validators/cart.validator");


const cartService = new CartService();
const cartController = new CartController(cartService);


// Base url is /cart
router.get('/favourites/:userId', cartController.getFavourites);

router.get('/:userId', cartController.getCartItems);

router.put('/:userId', cartValidators.validateCartItems, cartController.putProductsInCart);

router.delete('/:userId/:itemId', cartController.removeProductFromCart);

module.exports = router