const express = require('express');
const router = express.Router();
const userController = require('../controllers/admin/userControllers');
const jwt_auth = require('../middleware/jwt');

router.post('/api/user/create', [jwt_auth], userController.createUser);
router.get('/api/user', [jwt_auth], userController.getAllUsers);
router.put('/api/user/update/:id', [jwt_auth], userController.updateUser);
router.delete('/api/user/delete/:id', [jwt_auth], userController.deleteUser);

module.exports = router;