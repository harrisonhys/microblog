const express = require('express');
const router = express.Router();
const generalController = require('../controllers/generalControllers');

router.get('/', generalController.index);

module.exports = router;