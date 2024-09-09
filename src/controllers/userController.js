const users = [
    { id: 1, name: 'Juan Pérez', automatics: [1, 2], payments: [{ id: 101, service: 'ANTEL', amount: 1000 }, { id: 102, service: 'UTE', amount: 1200 }] },
    { id: 2, name: 'Ana Gómez', automatics: [3], payments: [{ id: 201, service: 'OSE', amount: 800 }] },
  ];
  
  const getAutomaticSubscriptions = (req, res) => {
    const userId = parseInt(req.params.user_id, 10);
    const user = users.find(user => user.id === userId);
  
    if (user) {
      res.json({ automatics: user.automatics });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  };
  
  const getUserPaymentHistory = (req, res) => {
    const userId = parseInt(req.params.user_id, 10);
    const user = users.find(user => user.id === userId);
  
    if (user) {
      res.json({ payments: user.payments });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  };
  
  const getPaymentReceipt = (req, res) => {
    const userId = parseInt(req.params.user_id, 10);
    const paymentId = parseInt(req.params.payment_id, 10);
    const user = users.find(user => user.id === userId);
  
    if (user) {
      const payment = user.payments.find(payment => payment.id === paymentId);
  
      if (payment) {
        res.json(payment);
      } else {
        res.status(404).json({ message: 'Pago no encontrado' });
      }
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  };
  
  const unsubscribeAutomaticPayment = (req, res) => {
    const userId = parseInt(req.params.user_id, 10);
    const autId = parseInt(req.params.aut_id, 10);
    const user = users.find(user => user.id === userId);
  
    if (user) {
      const index = user.automatics.indexOf(autId);
  
      if (index > -1) {
        user.automatics.splice(index, 1);
        res.status(200).json({ message: 'Suscripción cancelada con éxito', automatics: user.automatics });
      } else {
        res.status(404).json({ message: 'Suscripción automática no encontrada' });
      }
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  };
  
  module.exports = { getAutomaticSubscriptions, getUserPaymentHistory, getPaymentReceipt, unsubscribeAutomaticPayment };
  