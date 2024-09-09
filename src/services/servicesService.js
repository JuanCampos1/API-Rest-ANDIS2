const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, '../../protos/user_service.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const serviceProto = grpc.loadPackageDefinition(packageDefinition).payments;

const services = [
  { id: 1, name: 'ANTEL', description: 'Pago de servicios de telefonía e internet' },
  { id: 2, name: 'UTE', description: 'Pago de facturas de energía eléctrica' },
  { id: 3, name: 'OSE', description: 'Pago de agua potable y saneamiento' },
  { id: 4, name: 'BPS', description: 'Pago de aportes jubilatorios' },
];

const getServices = (call, callback) => {
  callback(null, { services });
};

const getService = (call, callback) => {
  const service = services.find(service => service.id === call.request.serviceId);
  if (service) {
    callback(null, service);
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: 'Servicio no encontrado'
    });
  }
};

const payService = (call, callback) => {
  const service = services.find(service => service.id === call.request.serviceId);
  if (service) {
    callback(null, { message: 'Pago realizado con éxito' });
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: 'Servicio no encontrado'
    });
  }
};

const subscribeToAutomaticPayment = (call, callback) => {
  const user = users.find(user => user.id === call.request.userId);
  if (user) {
    if (!user.automatics.includes(call.request.serviceId)) {
      user.automatics.push(call.request.serviceId);
    }
    callback(null, { message: 'Suscripción automática realizada con éxito' });
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: 'Usuario no encontrado'
    });
  }
};

module.exports = {
  getServices,
  getService,
  payService,
  subscribeToAutomaticPayment
};
