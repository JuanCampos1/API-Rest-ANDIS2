const express = require('express');
const router = express.Router();

router.get('/:user_id/automatics', (req, res) => {
  res.send('Lista de usuarios');
});

router.get('/:user_id/history', (req, res) => {
  const userId = req.params.id;
  res.send(`Detalles del usuario con ID: ${userId}`);
});

router.get('/:user_id/history/:payment_id', (req, res) => {
  const newUser = req.body;
  res.send(`Usuario creado: ${JSON.stringify(newUser)}`);
});

router.delete('/:user_id/automatics/:automatic_id', (req, res) => {
    const newUser = req.body;
    res.send(`Usuario creado: ${JSON.stringify(newUser)}`);
  });

module.exports = router;