import { Router } from 'express';
import { validation } from '../middleware/validation.middleware.js';
import methods from '../controllers/counter.controller.js';
import counterValidation from '../validations/counter.validation.js';

const router = Router();

router.get('/', methods.getCounter);
router.post('/', validation(counterValidation.createCounterSchemaYUP), methods.createCounter);

export default router;
