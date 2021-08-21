import BaseService from '~api/base.servcie';

import Token from '~models/token';

class TokenService extends BaseService {
  constructor() {
    super(Token);

    this.findByToken = this.findByToken.bind(this);
    this.deleteByToken = this.deleteByToken.bind(this);
    this.deleteByUserId = this.deleteByUserId.bind(this);
  }

  async findByToken(token) {
    const existedToken = await this._model.findOne({ token });

    return existedToken;
  }

  async deleteByToken(token) {
    await this._model.deleteOne({ token });

    return {};
  }

  async deleteByUserId(userId) {
    await this._model.deleteOne({ userId });

    return {};
  }
}

export default TokenService;
