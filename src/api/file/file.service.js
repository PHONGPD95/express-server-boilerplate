import BaseService from '~api/base.servcie';

import File from '~models/file';

class FileService extends BaseService {
  constructor() {
    super(File);

    this.uploadFileById = this.uploadFileById.bind(this);
  }

  async uploadFileById(userId, data) {
    let files = [];

    if (Array.isArray(data)) files.push(...data);
    else files.push(data);

    files = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.mimetype,
      userId,
    }));

    const insertedFiles = this._model.insertMany(files);

    return insertedFiles;
  }
}

export default FileService;
