const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, '../../protos/user_service.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const userProto = grpc.loadPackageDefinition(packageDefinition).payments;

const users = [
    { id: 1, name: 'Juan Pérez', automatics: [1, 2], payments: [{ id: 101, service: 'ANTEL', amount: 1000 }, { id: 102, service: 'UTE', amount: 1200 }] },
    { id: 2, name: 'Ana Gómez', automatics: [3], payments: [{ id: 201, service: 'OSE', amount: 800 }] },
];

const getAutomaticSubscriptions = (call, callback) => {
  const user = users.find(user => user.id === call.request.userId);
  if (user) {
    callback(null, { automatics: user.automatics });
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: 'Usuario no encontrado'
    });
  }
};

const getUserPaymentHistory = (call, callback) => {
  const user = users.find(user => user.id === call.request.userId);
  if (user) {
    callback(null, { payments: user.payments });
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: 'Usuario no encontrado'
    });
  }
};

const getPaymentReceipt = (call, callback) => {
  const user = users.find(user => user.id === call.request.userId);
  if (user) {
    const payment = user.payments.find(payment => payment.id === call.request.paymentId);
    if (payment) {
      callback(null, payment);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: 'Pago no encontrado'
      });
    }
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: 'Usuario no encontrado'
    });
  }
};

const unsubscribeAutomaticPayment = (call, callback) => {
  const user = users.find(user => user.id === call.request.userId);
  if (user) {
    const index = user.automatics.indexOf(call.request.autId);
    if (index > -1) {
      user.automatics.splice(index, 1);
      callback(null, { message: 'Suscripción cancelada con éxito', automatics: user.automatics });
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: 'Suscripción automática no encontrada'
      });
    }
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: 'Usuario no encontrado'
    });
  }
};

module.exports = {
  getAutomaticSubscriptions,
  getUserPaymentHistory,
  getPaymentReceipt,
  unsubscribeAutomaticPayment
};
