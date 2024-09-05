const express = require('express');
const app = express();

app.use(express.json());

const userRoutes = require('./routes/usersRoutes.js');
const serviceRoutes = require('./routes/servicesRoutes.js');

app.use('/payments/users', userRoutes);  
app.use('/payments/services', serviceRoutes); 


app.get('/', (req, res) => {
  res.send('Bienvenido a la API');
});

app.use((req, res, next) => {
  res.status(404).send('Ruta no encontrada');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

module.exports = app;
