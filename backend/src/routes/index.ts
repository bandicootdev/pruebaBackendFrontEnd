import express, { Request, Response, NextFunction } from 'express';
import auth from './auth';

const router = express.Router();

router.use('/auth', auth);

router.get('/', (req:Request, res:Response, next:NextFunction) => {
  res.status(200).json({
    ok: true,
    message: 'test api for practices',
  });
});

export default router;
