import { Router } from 'express';
import methods from './controller.js';

const router = Router();

router.get('/', methods.getCounter);
router.post('/', methods.createCounter);

export default Router().use('/counter', router);
