import express from 'express';

import auth from '~middlewares/auth';
import respond from '~middlewares/respond';

import AuthController from './auth.controller';

const authController = new AuthController();

const router = express.Router();

router.post('/sign-up', authController.signUp, respond);

router.post('/sign-in', authController.signIn, respond);

router.post('/sign-out', auth(), authController.signOut, respond);

router.post('/sign-out-all', auth('ADMIN'), authController.signOutAll, respond);

router.post(
  '/refresh-token',
  auth(null, false),
  authController.refreshToken,
  respond
);

router.get('/me', auth(), authController.me, respond);

export default router;
