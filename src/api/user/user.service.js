import BaseService from '~api/base.servcie';

import User from '~models/user';

class UserService extends BaseService {
  constructor() {
    super(User);

    this.create = this.create.bind(this);
  }

  async create(data) {
    const { username, email, password } = data;

    const existedUser = await this._model.findOne({ email });
    if (existedUser) {
      throw new Error('email is already in use.');
    }

    const createdUser = await this._model.create({
      username,
      email,
      password,
    });

    return createdUser;
  }
}

export default UserService;
