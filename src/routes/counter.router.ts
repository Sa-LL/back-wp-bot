import { Router } from 'express';
import { validation } from '../middleware/validation.middleware.js';
import methods from '../controllers/counter.controller.js';
import counterValidation from '../validations/counter.validation.js';

const router = Router();

router.get('/', methods.getCounter);
router.get('/:id', methods.getCounterByID);
router.post('/', validation(counterValidation.createCounterSchemaYUP), methods.createCounter);
router.patch('/:id', validation(counterValidation.patchCounterSchemaYUP), methods.patchCounter);
router.delete('/:id', methods.deleteCounter);

export default router;
