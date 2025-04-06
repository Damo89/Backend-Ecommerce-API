const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const { 
        registerUser, 
        loginUser,
        logoutUser,
        getProfile
    } = require('../controllers/authController');

//Register user
router.post('/register', registerUser);

//Login user
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', passport.authenticate('local'), loginUser);

//Get user profile
/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get authenticated user profile
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User profile returned
 *       401:
 *         description: Unauthorized
 */
router.get('/profile', ensureAuthenticated, getProfile);

//Logout user
/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Logout current user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post('/logout', logoutUser);

module.exports = router;