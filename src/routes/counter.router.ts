import { Router } from 'express';
import methods from '../controllers/counter.controller.js';

const router = Router();

router.get('/', methods.getCounter);
router.post('/', methods.createCounter);

export default router;
