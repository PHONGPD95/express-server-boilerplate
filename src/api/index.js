import express from 'express';

import authRouter from './auth/auth.router';
import fileRouter from './file/file.router';
import userRouter from './user/user.router';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/file', fileRouter);
router.use('/user', userRouter);

export default router;
