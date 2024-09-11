var express = require("express");
var { createHandler } = require("graphql-http/lib/use/express");
var { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Service {
    id: String
    name: String
    mount: Int
  }

  type Query {
    services: [Service]
    service(id: String!): Service
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  services() {
    return [
      { id: "001", name: "UTE" },
      { id: "002", name: "OSE" },
      { id: "003", name: "ANTEL" },
      { id: "004", name: "MontevideoGas" },
      { id: "005", name: "Banco República" },
      { id: "006", name: "DGI" },
      { id: "007", name: "IMM" },
      { id: "008", name: "ANV" },
      { id: "009", name: "BPS" },
      { id: "010", name: "Correo Uruguayo" },
      { id: "011", name: "Ministerio de Salud Pública" },
      { id: "012", name: "Ministerio del Interior" },
      { id: "013", name: "Ministerio de Trabajo y Seguridad Social" },
      { id: "014", name: "Ministerio de Turismo" },
      { id: "015", name: "Ministerio de Economía y Finanzas" },
      { id: "016", name: "Ministerio de Transporte y Obras Públicas" },
      { id: "017", name: "Agencia Nacional de Vivienda" },
      { id: "018", name: "Banco Central del Uruguay" },
      { id: "019", name: "Dirección Nacional de Aduanas" },
      { id: "020", name: "Plan Ceibal" },
      { id: "021", name: "Aduanas Uruguay" },
      { id: "022", name: "Policía Nacional" },
      { id: "023", name: "Bomberos Uruguay" },
      { id: "024", name: "Canelones Intendencia" },
    ];
  },
  service({ id }) {
    const services = [
      { id: "001", name: "UTE", mount: 1000 },
      { id: "002", name: "OSE", mount: 800 },
      { id: "003", name: "ANTEL", mount: 950 },
      { id: "004", name: "MontevideoGas", mount: 500 },
      { id: "005", name: "Banco República", mount: 1200 },
      { id: "006", name: "DGI", mount: 1100 },
      { id: "007", name: "IMM", mount: 850 },
      { id: "008", name: "ANV", mount: 600 },
      { id: "009", name: "BPS", mount: 750 },
      { id: "010", name: "Correo Uruguayo", mount: 400 },
      { id: "011", name: "Ministerio de Salud Pública", mount: 950 },
      { id: "012", name: "Ministerio del Interior", mount: 1100 },
      {
        id: "013",
        name: "Ministerio de Trabajo y Seguridad Social",
        mount: 700,
      },
      { id: "014", name: "Ministerio de Turismo", mount: 650 },
      { id: "015", name: "Ministerio de Economía y Finanzas", mount: 1300 },
      {
        id: "016",
        name: "Ministerio de Transporte y Obras Públicas",
        mount: 900,
      },
      { id: "017", name: "Agencia Nacional de Vivienda", mount: 600 },
      { id: "018", name: "Banco Central del Uruguay", mount: 1400 },
      { id: "019", name: "Dirección Nacional de Aduanas", mount: 800 },
      { id: "020", name: "Plan Ceibal", mount: 500 },
      { id: "021", name: "Aduanas Uruguay", mount: 700 },
      { id: "022", name: "Policía Nacional", mount: 1000 },
      { id: "023", name: "Bomberos Uruguay", mount: 900 },
      { id: "024", name: "Canelones Intendencia", mount: 850 },
    ];

    // Find and return the service that matches the provided id
    return services.find((service) => service.id === id);
  },
};

var app = express();

// Create and use the GraphQL handler.
app.all(
  "/",
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

// Start the server at port
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000");
