var express = require("express");
var { createHandler } = require("graphql-http/lib/use/express");
var { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Service {
    id: String
    name: String
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
      { id: "001", name: "ute" },
      { id: "002", name: "ose" },
    ];
  },
  service({ id }) {
    const services = [
      { id: "001", name: "ute" },
      { id: "002", name: "ose" },
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
