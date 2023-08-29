require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const app = express();
const { specs, swaggerUi } = require('./swagger/swaggerDef');
const trackRoutes = require('./routes/trackRoutes');
const db = require('./models/index');

app.use(express.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/tracks', trackRoutes);

module.exports = app;


db.sequelize
  .sync()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });