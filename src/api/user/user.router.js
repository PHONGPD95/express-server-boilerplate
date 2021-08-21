import express from 'express';

import auth from '~middlewares/auth';
import respond from '~middlewares/respond';

import UserController from './user.controller';

const userController = new UserController();

const router = express.Router();

router.get('/', auth('ADMIN'), userController.find, respond);

router.post('/', auth('ADMIN'), userController.create, respond);

router.get('/export', auth('ADMIN'), userController.exportCSV);

router.get(
  '/:id',
  auth('ADMIN'),
  userController.verifyId,
  userController.findById,
  respond
);

router.put(
  '/:id',
  auth('ADMIN'),
  userController.verifyId,
  userController.updateById,
  respond
);

router.delete(
  '/:id',
  auth('ADMIN'),
  userController.verifyId,
  userController.deleteById,
  respond
);

export default router;
