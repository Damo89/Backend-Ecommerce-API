const express = require('express');
const router = express.Router();
const pool = require('../database/db');
const { 
        getCartByUserId, 
        addToCart, 
        updateCartItem,
        deleteCartItem 
      } = require('../controllers/cartsController');

//Fetch all cart items for a user
/**
 * @swagger
 * /api/carts/{userId}:
 *   get:
 *     summary: Get all cart items for a user
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cart items
 */
router.get('/:userId', getCartByUserId);

//Add product to cart
/**
 * @swagger
 * /api/carts:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             required: [user_id, product_id, quantity]
 *             properties:
 *               user_id:
 *                 type: integer
 *               product_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product added to cart
 */
router.post('/', addToCart);

//Update quantity of a cart item
/**
 * @swagger
 * /api/carts/{cartId}:
 *   put:
 *     summary: Update quantity of a cart item
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the cart item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: [quantity]
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Server error
 */
router.put('/:cartId', updateCartItem);

//Remove item from cart
/**
 * @swagger
 * /api/carts/{cartId}:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the cart item to delete
 *     responses:
 *       200:
 *         description: Item removed from cart
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Server error
 */
router.delete('/:cartId', deleteCartItem);

module.exports = router;
