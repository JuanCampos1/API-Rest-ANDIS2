const amqp = require('amqplib');

async function sendToQueue(queue, message) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
  console.log(`Message sent to ${queue}:`, message);
  await channel.close();
  await connection.close();
}

const services = [
  { id: 1, name: 'ANTEL', description: 'Pago de servicios de telefonía e internet' },
  { id: 2, name: 'UTE', description: 'Pago de facturas de energía eléctrica' },
  { id: 3, name: 'OSE', description: 'Pago de agua potable y saneamiento' },
  { id: 4, name: 'BPS', description: 'Pago de aportes jubilatorios' },
];

const getAvailableServices = (req, res) => {
  res.json(services);
};

const payService = async (req, res) => {
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

    // Send the payment request to the "payment_queue"
    await sendToQueue('payment_queue', paymentDetails);

    res.status(201).json({
      message: 'Pago en proceso, revisa más tarde para ver el estado.',
      paymentDetails,
    });
  } else {
    res.status(404).json({ message: 'Servicio no encontrado' });
  }
};

const subscribeToAutomaticPayment = async (req, res) => {
  const serviceId = parseInt(req.params.service_id, 10);
  const service = services.find(service => service.id === serviceId);

  if (service) {
    const { paymentMethod, frequency } = req.body;
    const subscriptionDetails = {
      serviceId: service.id,
      serviceName: service.name,
      paymentMethod: paymentMethod || 'Tarjeta de crédito',
      frequency: frequency || 'Mensual',
      subscribedAt: new Date().toISOString(),
    };

    // Send the subscription request to the "subscription_queue"
    await sendToQueue('subscription_queue', subscriptionDetails);

    res.status(201).json({
      message: 'Suscripción en proceso, revisa más tarde para ver el estado.',
      subscriptionDetails,
    });
  } else {
    res.status(404).json({ message: 'Servicio no encontrado' });
  }
};

module.exports = { getAvailableServices, payService, subscribeToAutomaticPayment };
