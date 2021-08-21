import UserService from '~api/user/user.service';
import TokenService from '~api/token/token.service';

import AuthService from './auth.service';

const authService = new AuthService();
const userService = new UserService();
const tokenService = new TokenService();

class AuthController {
  constructor() {
    this._service = authService;
    this.userService = userService;
    this.tokenService = tokenService;

    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.signOutAll = this.signOutAll.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.me = this.me.bind(this);
  }

  async signUp(req, res, next) {
    try {
      const { username, email, password } = req.body;

      const createdUser = await this.userService.create({
        username,
        email,
        password,
      });

      res.locals.data = createdUser;

      next();
    } catch (err) {
      next(err);
    }
  }

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;

      const response = await this._service.signIn({ email, password });

      res.locals.data = response;

      next();
    } catch (err) {
      next(err);
    }
  }

  async signOut(req, res, next) {
    try {
      const { token } = res.locals;

      const response = await this.tokenService.deleteByToken(token);

      res.locals.data = response;

      next();
    } catch (err) {
      next(err);
    }
  }

  async signOutAll(req, res, next) {
    try {
      const { user } = res.locals;

      const response = await this.tokenService.deleteByUserId(user.id);

      res.locals.data = response;

      next();
    } catch (err) {
      next(err);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { token } = res.locals;
      const { refreshToken } = req.body;

      const response = await this._service.refreshToken(token, refreshToken);

      res.locals.data = response;

      next();
    } catch (err) {
      next(err);
    }
  }

  async me(req, res, next) {
    try {
      const { user } = res.locals;

      const currentUser = await this.userService.findById(user.id);

      res.locals.data = currentUser;

      next();
    } catch (err) {
      next(err);
    }
  }
}

export default AuthController;
