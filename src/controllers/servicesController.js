const services = [
  { id: 1, name: 'ANTEL', description: 'Pago de servicios de telefonía e internet' },
  { id: 2, name: 'UTE', description: 'Pago de facturas de energía eléctrica' },
  { id: 3, name: 'OSE', description: 'Pago de agua potable y saneamiento' },
  { id: 4, name: 'BPS', description: 'Pago de aportes jubilatorios' },
];

const getAvailableServices = (req, res) => {
  res.json(services);
};

const getServiceById = (req, res) => {
  const serviceId = parseInt(req.params.service_id, 10);
  const service = services.find(service => service.id === serviceId);

  if (service) {
    res.json(service);
  } else {
    res.status(404).json({ message: 'Servicio no encontrado' });
  }
};

const payService = (req, res) => {
  const serviceId = parseInt(req.params.service_id, 10);
  const service = services.find(service => service.id === serviceId);

  if (service) {
    const { amount, paymentMethod } = req.body;
    const paymentDetails = {
      serviceId: service.id,
      serviceName: service.name,
      amount,
      paymentMethod: paymentMethod || 'Tarjeta de crédito',
      paymentDate: new Date().toISOString(),
    };

    res.status(201).json({
      message: 'Pago realizado exitosamente',
      paymentDetails,
    });
  } else {
    res.status(404).json({ message: 'Servicio no encontrado' });
  }
};

const subscribeToAutomaticPayment = (req, res) => {
  const serviceId = parseInt(req.params.service_id, 10);
  const service = services.find(service => service.id === serviceId);

  if (service) {
    const { paymentMethod, frequency } = req.body;
    const automaticPaymentDetails = {
      serviceId: service.id,
      serviceName: service.name,
      paymentMethod: paymentMethod || 'Tarjeta de crédito',
      frequency: frequency || 'Mensual',  
      subscribedAt: new Date().toISOString(),
    };

    res.status(201).json({
      message: 'Suscripción a pago automático realizada exitosamente',
      automaticPaymentDetails,
    });
  } else {
    res.status(404).json({ message: 'Servicio no encontrado' });
  }
};

module.exports = { getAvailableServices, getServiceById, payService, subscribeToAutomaticPayment };
