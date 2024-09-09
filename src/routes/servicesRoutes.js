const express = require('express');
const { getAvailableServices, getServiceById, payService, subscribeToAutomaticPayment } = require('../controllers/servicesController');
const router = express.Router();

router.get('/', getAvailableServices);
router.get('/:service_id', getServiceById);
router.post('/:service_id', payService);
router.post('/:service_id/automatic', subscribeToAutomaticPayment);

module.exports = router;
