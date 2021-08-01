const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');

router.get('/', function (req, res) {
  res.send('Hello World');
});

// GET request for getting all users
router.get('/user/:username', userController.user);

// POST request for creating a user
router.post('/user/create', userController.create);

// GET request for getting all users
router.get('/users/', userController.users);

module.exports = router;
