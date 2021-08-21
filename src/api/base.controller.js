class BaseController {
  constructor(service) {
    this._service = service;

    this.verifyId = this.verifyId.bind(this);
    this.find = this.find.bind(this);
    this.create = this.create.bind(this);
    this.findById = this.findById.bind(this);
    this.updateById = this.updateById.bind(this);
    this.deleteById = this.deleteById.bind(this);
  }

  async verifyId(req, res, next) {
    try {
      const { id } = req.params;

      const record = await this._service.verifyId(id);

      res.locals.record = record;

      next();
    } catch (err) {
      next(err);
    }
  }

  async find(req, res, next) {
    try {
      const options = req.query;

      const data = await this._service.find(options);

      res.locals.data = data;

      next();
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const data = req.body;

      const record = await this._service.create(data);

      res.locals.data = record;

      next();
    } catch (err) {
      next(err);
    }
  }

  async findById(req, res, next) {
    try {
      const { record } = res.locals;

      res.locals.data = record;

      next();
    } catch (err) {
      next(err);
    }
  }

  async updateById(req, res, next) {
    try {
      const data = req.body;

      let { record } = res.locals;

      record = await this._service.updateById(record.id, data);

      res.locals.data = record;

      next();
    } catch (err) {
      next(err);
    }
  }

  async deleteById(req, res, next) {
    try {
      let { record } = res.locals;

      record = await this._service.deleteById(record.id);

      res.locals.data = record;

      next();
    } catch (err) {
      next(err);
    }
  }
}

export default BaseController;
