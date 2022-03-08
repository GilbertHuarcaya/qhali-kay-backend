import jsonwebtoken from 'jsonwebtoken';
const compose = require('composable-middleware');
import { Request, Response, NextFunction } from 'express';
import config from '../config';
import { getUserByEmail } from '../api/user/user.service';
import { getHospitalByEmail } from '../api/hospital/hospital.service';

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
export function isAuthenticated() {
  return compose().use(async (req: any, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers?.authorization;
      if (authHeader) {
        const [, token] = authHeader.split(' ');

        // Validate token
        const payload: any = await validateToken(token);

        if (!payload) {
          return res.status(401).end();
        }

        // Attach user to request
        const user = await getUserByEmail(payload.email);

        if (!user) {
          return res.status(401).end();
        }

        req.user = user;
        next();
        return null;
      } else {
        return res.status(401).end();
      }
    } catch (error) {
      return next(error);
    }
  });
}

export function isHospitalAuthenticated() {
  return compose().use(async (req: any, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers?.authorization;
      if (authHeader) {
        const [, token] = authHeader.split(' ');

        // Validate token
        const payload: any = await validateToken(token);

        if (!payload) {
          return res.status(401).end();
        }

        // Attach user to request
        const user: any = await getHospitalByEmail(payload.email);

        if (!user) {
          return res.status(401).end();
        }

        req.user = user;
        next();
        return null;
      } else {
        return res.status(401).end();
      }
    } catch (error) {
      return next(error);
    }
  });
}
/**
 * Checks if the user role meets the minimum requirements of the route
 */
export function hasRole(rolesRequired: any = []) {
  if (!rolesRequired.length) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use((req: any, res: Response, next: NextFunction) => {
      const { role } = req.user;
      if (rolesRequired.includes(role)) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
    });
}

/**
 * Validate JWT
 * @param {String} token
 * @returns {Object} payload
 */
export async function validateToken(token: any) {
  try {
    const payload = await jsonwebtoken.verify(token, config.secrets.session);
    return payload;
  } catch (error) {
    return null;
  }
}

/**
 * Returns a jwt token signed by the app secret
 * @param {String} payload
 * @returns {String} token
 */

export function signToken(payload: any) {
  const token = jsonwebtoken.sign(payload, config.secrets.session, {
    expiresIn: config.expiresIn,
  });

  return token;
}
