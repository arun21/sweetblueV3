const express = require('express');
const router = express.Router();
const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.route");
const productRoutes = require("./routes/product.route");
const cartRoutes = require("./routes/cart.route");
const authMiddleware = require('./middleware/auth.middleware');

// Routes without authentication
router.use('/auth', authRoutes);
router.use('/product', productRoutes);
router.use('/user', userRoutes);

// All routes with authentication
router.use('/cart', authMiddleware, cartRoutes);


// API route not found handler
router.use('*', (req, res) => res.status(404).json({ message: 'Route not found' }));

module.exports = router;
