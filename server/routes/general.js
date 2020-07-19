const express = require('express');
const router = express.Router();
const PersonController = require('../controllers/PersonController');
const ProductController = require('../controllers/ProductController');
const AuthController = require('../controllers/AuthController');
const ChatController = require('../controllers/ChatController');

router.use(AuthController.authorization);

router.get('/people', PersonController.all);
router.get('/products', ProductController.all);
router.get('/chat', ChatController.connection);

module.exports = router;