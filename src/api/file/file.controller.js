import { parse } from 'json2csv';

import BaseController from '~api/base.controller';
import File from '~models/file';
import { BadRequestError } from '~utils/errors';

import FileService from './file.service';

const fileService = new FileService();

class FileController extends BaseController {
  constructor() {
    super(fileService);

    this._service = fileService;

    this.exportCSV = this.exportCSV.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  async exportCSV(req, res, next) {
    try {
      const options = {
        limit: null,
      };

      const data = await this._service.getAll(options);

      const fields = Object.keys(File.rawAttributes);

      const csvData = parse(data, { fields });

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=files.csv');

      return res.status(200).end(csvData);
    } catch (err) {
      next(err);
    }
  }

  async uploadFile(req, res, next) {
    try {
      const { user } = res.locals;

      if (!req.files || Object.keys(req.files).length === 0) {
        return next(new BadRequestError('No files were uploaded.'));
      }

      const data = req.files.file;

      const records = await this._service.uploadFileById(user.id, data);

      res.locals.data = records;
      next();
    } catch (err) {
      next(err);
    }
  }
}

export default FileController;
