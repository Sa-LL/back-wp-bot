import { Router } from 'express';
import { validation } from '../middleware/validation.middleware.js';
import methods from '../controllers/counter.controller.js';
import counterValidation from '../validations/counter.validation.js';

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Counter:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          description: counter name
 *        description:
 *          type: string
 *          description: counter description
 *        count:
 *          type: number
 *          description: initial counter
 *        status:
 *          type: number
 *          description: status (IN_PROGRESS = 0, COMPLETED = 1, STOPPED = 2)
 *        completition_date:
 *          type: string
 *          description: completition date when status is 1 (COMPLETED)
 *        reset_counter:
 *          type: number
 *          description: number of times that the counter has been reset
 *      required:
 *        - title
 *        - status
 *      example:
 *        title: Qcho se queja del trabajo
 *        description: cantidad de veces que qcho se ha quejado del trabajo
 *        count: 4
 *        status: 0
 *        reset_counter: 0
 */

/**
 * @swagger
 * /api/counter:
 *  get:
 *    summary: return all counters
 *    tags: [Counter]
 *    responses:
 *      200:
 *        description: all counters
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Counter'
 *     500:
 *       description: internal server error
 */
router.get('/', methods.getCounter);

/**
 * @swagger
 * /api/counter/{id}:
 *  get:
 *    summary: return a counter
 *    tags: [Counter]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the counter id
 *    responses:
 *      200:
 *        description: one counter
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Counter'
 *      404:
 *        description: counter not found
 *      500:
 *        description: internal server error
 */
router.get('/:id', methods.getCounterByID);

/**
 * @swagger
 * /api/counter:
 *  post:
 *    summary: create a new counter
 *    tags: [Counter]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Counter'
 *    responses:
 *      200:
 *        description: new counter created
 *      500:
 *        description: internal server error
 */
router.post('/', validation(counterValidation.createCounterSchemaYUP), methods.createCounter);

/**
 * @swagger
 * /api/counter/{id}:
 *  patch:
 *    summary: update a counter
 *    tags: [Counter]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the counter id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Counter'
 *    responses:
 *      200:
 *        description: counter updated
 *      404:
 *        description: counter not found
 *      500:
 *        description: internal server error
 */
router.patch('/:id', validation(counterValidation.patchCounterSchemaYUP), methods.patchCounter);

/**
 * @swagger
 * /api/counter/{id}:
 *  delete:
 *    summary: delete a counter
 *    tags: [Counter]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the counter id
 *    responses:
 *      200:
 *        description: counter deleted
 *      404:
 *        description: counter not found
 *      500:
 *        description: internal server error
 */
router.delete('/:id', methods.deleteCounter);

export default router;
