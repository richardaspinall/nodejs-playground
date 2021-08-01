const express = require('express');
const usersController = express.Router();
const users = new Map();

users.set('raspinall', {
  username: 'raspinall',
  firstname: 'Richard',
  lastname: 'Aspinall',
});

users.set('jsmith', {
  username: 'jsmith',
  firstname: 'James',
  lastname: 'Smith',
});

usersController.get('/', (req, res) => {
  const allUsers = {};
  users.forEach((value, key) => {
    allUsers[key] = value;
  });

  res.send([allUsers]);
});

usersController.post('/', (req, res) => {
  const body = req.body;

  users.set(body.username, {
    username: body.username,
    firstname: body.firstname,
    lastname: body.lastname,
  });
  res.send(users.get(body.username));
});

module.exports = usersController;
