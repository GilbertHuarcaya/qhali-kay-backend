const express = require('express');

const expressConfig = require('./config/express');
const connectDB = require('./config/database');
const routes = require('./routes');

const app = express();

expressConfig(app);

const PORT = process.env.PORT;

// Start server
app.listen(PORT, () => {
  // connect to database
  connectDB();

  // Routes
  routes(app);
  // cambio de prueba

  console.log(`Server running at http://localhost:${PORT}/`);
});

module.exports = app;
