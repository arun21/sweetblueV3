const express = require('express');
const router = express.Router();
const ProductController = require("../controllers/product.controller");
const ProductService = require("../services/product.service");


const productService = new ProductService();
const productController = new ProductController(productService);


// Base url is /product
router.get('/', productController.getProducts);

router.get('/newarrivals', productController.getNewArrivals);

router.get('/:id', productController.getProductById);

module.exports = router