import { Router } from 'express';
import counterRoute from './counter.router.js';
import groupRoute from './group.router.js';

const router = Router();

router.use('/counter', counterRoute);
router.use('/group', groupRoute);

export default router;
