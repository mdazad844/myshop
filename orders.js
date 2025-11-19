const express = require('express');
const { createOrder } = require('../controllers/orderController');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

router.post('/create', createOrder);

module.exports = router;