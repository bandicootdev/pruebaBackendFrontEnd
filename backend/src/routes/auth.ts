import express, { Request, Response, NextFunction } from 'express';
import { registerAccount } from '../controllers/auth/auth.service';

const router = express.Router();

router.post('/register', async (req:Request, res:Response, next:NextFunction) => {
  const { entity } = req.body;
  try {
    const newUser = await registerAccount(entity);
    res.status(200).json({
      status: 200,
      user: newUser,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
