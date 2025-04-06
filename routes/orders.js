const express = require('express');
const router = express.Router();
const pool = require('../database/db');
const { 
        getAllOrders,
        getOrderById,
        getOrdersByUser,
        getOrderByUserAndOrderId,
        createOrder,
        updateOrder,
        deleteOrder,
      } = require('../controllers/ordersController');

// GET /api/orders
/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get('/', getAllOrders);

// GET /api/orders/user/:user_id/:order_id
// View details of a specific order that belongs to a user
/**
 * @swagger
 * /api/orders/user/{user_id}/{order_id}:
 *   get:
 *     summary: Get specific order details for a user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the order
 *     responses:
 *       200:
 *         description: Order details returned successfully
 *       404:
 *         description: Order not found for this user
 *       500:
 *         description: Server error
 */
router.get('/user/:user_id/:order_id', getOrderByUserAndOrderId);

// GET /api/orders/user/:user_id
// View all orders for a user
/**
 * @swagger
 * /api/orders/user/{user_id}:
 *   get:
 *     summary: Get all orders by user ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Orders by user
 */
router.get('/user/:user_id', getOrdersByUser);

// GET /api/orders/:id
/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order found
 */
router.get('/:id', getOrderById);

// POST /api/orders
/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: [user_id, total]
 *             properties:
 *               user_id:
 *                 type: integer
 *               total:
 *                 type: number
 *               status:
 *                 type: string
 *                 default: pending
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post('/', createOrder);

// PUT /api/orders/:id
/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Update an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the order to update
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               user_id:
 *                 type: integer
 *               total:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.put('/:id', updateOrder);

// DELETE /api/orders/:id
/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the order to delete
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', deleteOrder);
  
module.exports = router;
