import { Router } from 'express';
import counterRoute from './counter.router.js';

const router = Router();

router.use('/counter', counterRoute);

export default router;
