// import endpoints (api)
const qhalikay = require('./api/qhalikay');
const user = require('./api/user');
const hospital = require('./api/hospital');
const review = require('./api/review');
const authLocal = require('./auth/local');
const upload = require('./api/upload');

// defining routes
function routes(app) {
  app.use('/api/qhalikay', qhalikay);
  app.use('/api/users', user);
  app.use('/api/hospitals', hospital);
  app.use('/api/reviews', review);
  app.use('/api/uploads', upload);

  // auth routes
  app.use('/auth/local', authLocal);
}

module.exports = routes;
