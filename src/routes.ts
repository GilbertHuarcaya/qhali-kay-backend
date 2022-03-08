// import endpoints (api)
import { Application } from 'express';
import qhalikay from './api/qhalikay';
import user from './api/user';
import hospital from './api/hospital';
import review from './api/review';
import authLocal from './auth/local';
import upload from './api/upload';

// defining routes
function routes(app: Application) {
  app.use('/api/qhalikay', qhalikay);
  app.use('/api/users', user);
  app.use('/api/hospitals', hospital);
  app.use('/api/reviews', review);
  app.use('/api/uploads', upload);

  // auth routes
  app.use('/auth/local', authLocal);
}

export default routes;
