import { BadRequestError, NotFoundError } from '~utils/errors';

class BaseService {
  constructor(model) {
    this._model = model;

    this.verifyId = this.verifyId.bind(this);
    this.find = this.find.bind(this);
    this.create = this.create.bind(this);
    this.findById = this.findById.bind(this);
    this.updateById = this.updateById.bind(this);
    this.deleteById = this.deleteById.bind(this);
  }

  async verifyId(id) {
    if (!id) {
      throw new NotFoundError();
    }

    let record;

    try {
      record = await this._model.findById(id);
    } catch (err) {
      throw new BadRequestError('id is invalid.');
    }

    if (!record) {
      throw new NotFoundError(`Record not found.`);
    }

    return record;
  }

  async find(options) {
    const data = await this._model.paginate({}, options);

    return data;
  }

  async create(data) {
    const record = await this._model.create(data);

    return record;
  }

  async findById(id) {
    const record = await this._model.findById(id);

    return record;
  }

  async updateById(id, data) {
    const record = await this._model.findById(id);

    Object.assign(record, data);

    await record.save();

    return record;
  }

  async deleteById(id) {
    const record = await this._model.findById(id);

    await record.remove();

    return record;
  }
}

export default BaseService;
