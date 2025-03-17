// Catches the request and sends it to AuthController

const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;
