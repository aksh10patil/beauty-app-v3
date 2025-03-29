const express = require('express');
const router = express.Router();



const { createOrder, verifyPayment } = require('../controllers/payment.controllers');


router.post('/create-order', createOrder)
router.post('/verifyPayment', verifyPayment);

module.exports = router;