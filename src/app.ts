import express from 'express';

import expressConfig from './config/express';

import connectDB from './config/database';
import routes from './routes';

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
