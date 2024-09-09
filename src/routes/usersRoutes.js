const express = require('express');
const { getAutomaticSubscriptions, getUserPaymentHistory, getPaymentReceipt, unsubscribeAutomaticPayment } = require('../controllers/userController');
const router = express.Router();

router.get('/:user_id/automatics', getAutomaticSubscriptions);
router.get('/:user_id/history', getUserPaymentHistory);
router.get('/:user_id/history/:payment_id', getPaymentReceipt);
router.delete('/:user_id/automatics/:aut_id', unsubscribeAutomaticPayment);

module.exports = router;
