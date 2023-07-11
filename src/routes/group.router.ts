import { Router } from 'express';
import { validation } from '../middleware/validation.middleware.js';
import methods from '../controllers/group.controller.js';
import groupValidation from '../validations/group.validation.js';

const router = Router();

router.get('/', methods.getGroups);

router.get('/:id', methods.getGroupById);

router.post('/', validation(groupValidation.createGroupSchemaYUP), methods.createGroup);

router.patch('/:id', validation(groupValidation.patchGroupSchemaYUP), methods.patchGroup);

router.delete('/:id', methods.deleteGroup);

export default router;
