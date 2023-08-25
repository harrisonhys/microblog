const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const jwt_auth = require('../middleware/jwt');

router.post('/api/auth/login', authController.login);
router.post('/api/auth/registers', authController.register)
router.get('/api/auth/confirmation-email/:uuid', authController.confirmation_email)
router.post('/api/auth/forgot-password', authController.forgot_password)
router.post('/api/auth/reset-password', authController.reset_password)
router.post('/api/auth/change-password', [jwt_auth], authController.change_password)

router.get('/api/profile', [jwt_auth], (req, res) => {
    res.json({ message: 'This is a protected route' });
});

module.exports = router;