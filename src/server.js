const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const userService = require('./services/userService');
const serviceService = require('./services/servicesService');

const PROTO_PATH = path.join(__dirname, '../protos/user_service.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).payments;

function main() {
  const server = new grpc.Server();
  
  server.addService(proto.UserService.service, userService);
  server.addService(proto.ServiceService.service, serviceService);

  server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
      console.error(`Error al iniciar el servidor: ${error.message}`);
      return;
    }
    console.log(`Servidor gRPC corriendo en puerto ${port}`);
  });
}

main();
