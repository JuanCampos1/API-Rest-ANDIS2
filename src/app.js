const express = require('express');
const servicesRoutes = require('./routes/servicesRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.use('/payment/user', userRoutes);
app.use('/payment/services', servicesRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
