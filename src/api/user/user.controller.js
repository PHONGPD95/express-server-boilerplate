import { parse } from 'json2csv';

import BaseController from '~api/base.controller';
import User from '~models/user';

import UserService from './user.service';

const userService = new UserService();

class UserController extends BaseController {
  constructor() {
    super(userService);

    this._service = userService;

    this.create = this.create.bind(this);
    this.exportCSV = this.exportCSV.bind(this);
  }

  async create(req, res, next) {
    try {
      const { username, email, password } = req.body;

      const createdUser = this._service.create({ username, email, password });

      res.locals.data = createdUser;

      next();
    } catch (err) {
      next(err);
    }
  }

  async exportCSV(req, res, next) {
    try {
      const options = {
        limit: null,
      };

      const data = await this._service.getAll(options);

      const fields = Object.keys(User.rawAttributes);

      const csvData = parse(data, { fields });

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=users.csv');

      return res.status(200).end(csvData);
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
