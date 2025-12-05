const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { createTask, updateTask, getTask } = require('../validators/task');

// protect all task routes
router.use(auth);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Add a new task
 *     tags:
 *       - Tasks
 * 
 *     security:
 *      - bearerAuth: []
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTask'
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Bad request (e.g., missing title)
 *       401:
 *         description: Unauthorized
 */
router.post('/', validate(createTask), taskController.createTask);

/**
 * @swagger
 * /tasks/:
 * 
 *  get:
 *    summary: Get listing
 * 
 *    tags:
 *      - Tasks
 * 
 *    security:
 *      - bearerAuth: []
 * 
 *    parameters:
 * 
 *      - in: query
 *        name: status
 *        required: false
 *        description: The status text to filter the list.
 *        schema:
 *          type: string
 *          example: "pending"
 * 
 *      - in: query
 *        name: priority
 *        required: false
 *        description: The priority text to search or filter the list.
 *        schema:
 *          type: string
 *          example: "pending"
 * 
 *      - in: query
 *        name: sort
 *        required: false
 *        description: The field to sort the data in the list.
 *        schema:
 *          type: string
 *          example: "createdAt:desc"
 * 
 *      - in: query
 *        name: page
 *        required: false
 *        description: The page number for pagination.
 *        schema:
 *          type: integer
 *          default: 1
 * 
 *      - in: query
 *        name: limit
 *        required: false
 *        description: The number of items per page.
 *        schema:
 *          type: integer
 *          default: 10
 * 
 *    responses:
 *      200:
 *        description: Success
 * 
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */
router.get('/', validate(getTask, 'query'), taskController.getTasks);

/**
 * @swagger
 * /tasks/{id}:
 * 
 *  get:
 *    summary: Get by id
 * 
 *    tags:
 *      - Tasks
 * 
 *    security:
 *      - bearerAuth: []
 * 
 *    parameters:
 * 
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 * 
 *    responses:
 *      200:
 *        description: Success
 * 
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */
router.get('/:id', taskController.getTask);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update the task by id
 *     tags:
 *       - Tasks
 * 
 *     security:
 *      - bearerAuth: []
 * 
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTask'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', validate(updateTask), taskController.updateTask);

/**
 * @swagger
 * /tasks/{id}:
 * 
 *  delete:
 *    summary: Delete by id
 * 
 *    tags:
 *      - Tasks
 * 
 *    security:
 *      - bearerAuth: [] 
 * 
 *    parameters:
 * 
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 * 
 *    responses:
 *      200:
 *        description: Success
 * 
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */
router.delete('/:id', taskController.deleteTask);

module.exports = router;
