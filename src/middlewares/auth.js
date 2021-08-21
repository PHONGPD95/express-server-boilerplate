import jwt from 'jsonwebtoken';

import TokenService from '~api/token/token.service';
import { ForbiddenError, UnauthorizedError } from '~utils/errors';

const tokenService = new TokenService();

const auth =
  (role, shouldCheckExpired = true) =>
  async (req, res, next) => {
    try {
      const baererToken = req.headers.authorization || '';

      const token = baererToken.split(' ')[1];
      if (!token) {
        next(new ForbiddenError());
      }

      const existedToken = await tokenService.findByToken(token);
      if (!existedToken) {
        next(new ForbiddenError());
      }

      const decoded = jwt.verify(token, process.env.TOKEN_SECRET, {
        ignoreExpiration: !shouldCheckExpired,
      });
      if (role && decoded.role !== role) {
        next(new UnauthorizedError());
      }

      res.locals.user = decoded;
      res.locals.token = token;

      next();
    } catch (err) {
      next(new ForbiddenError(err.message));
    }
  };

export default auth;
