
const { faker } = require('@faker-js/faker');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const services = servicesJSON;

  res.json(services);
});

router.get('/:service_id', (req, res) => {
  const userId = req.params.id;
  res.send(`Detalles del usuario con ID: ${userId}`);
});

router.post('/:service_id', (req, res) => {
  const newUser = req.body;
  res.send(`Usuario creado: ${JSON.stringify(newUser)}`);
});

router.post('/:service_id/automatic', (req, res) => {
    const newUser = req.body;
    res.send(`Usuario creado: ${JSON.stringify(newUser)}`);
  });

const servicesJSON= [
    {
      "id": 667052,
      "name": "Schoen Inc"
    },
    {
      "id": 527154,
      "name": "Kub Inc"
    },
    {
      "id": 687419,
      "name": "Konopelski, Jaskolski and Hodkiewicz"
    },
    {
      "id": 466253,
      "name": "Pagac - Abernathy"
    },
    {
      "id": 720309,
      "name": "Bruen Inc"
    },
    {
      "id": 678190,
      "name": "Konopelski Inc"
    },
    {
      "id": 268998,
      "name": "Johnson LLC"
    },
    {
      "id": 678431,
      "name": "Casper Group"
    },
    {
      "id": 753234,
      "name": "Heathcote Group"
    },
    {
      "id": 696595,
      "name": "Jacobi, Kohler and Yundt"
    }
  ]

module.exports = router;


