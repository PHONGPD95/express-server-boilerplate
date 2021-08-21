import express from 'express';

import auth from '~middlewares/auth';
import respond from '~middlewares/respond';

import FileController from './file.controller';

const fileController = new FileController();

const router = express.Router();

router.get('/', auth('USER'), fileController.find, respond);

router.post('/upload', auth('USER'), fileController.uploadFile, respond);

router.get('/export', auth('USER'), fileController.exportCSV);

router.get(
  '/:id',
  auth('USER'),
  fileController.verifyId,
  fileController.findById,
  respond
);

router.put(
  '/:id',
  auth('USER'),
  fileController.verifyId,
  fileController.updateById,
  respond
);

router.delete(
  '/:id',
  auth('USER'),
  fileController.verifyId,
  fileController.deleteById,
  respond
);

export default router;
