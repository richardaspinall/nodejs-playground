const db = require('../db/db');
const UserNotFoundError = require('../errors');

// Find and return a single user
const user = function (req, res) {
  try {
    const result = db.findOne(req.params.username);
    res.send(result);
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      console.log(error.message);
      console.log(error.name);
      console.log(error.stack);
      res.send({ error: 'User not found' });
    } else if (error instanceof SyntaxError) {
      // (*)
      console.log('JSON Syntax Error: ' + error.message);
    } else {
      throw error; // unknown error, rethrow it (**)
    }
  }
};

// Create a new user and return on success
const create = function (req, res) {
  const body = req.body;

  const result = db.insertOne(body);

  res.send(result);
};

// Return all users from DB
const users = function (req, res) {
  const result = db.findAll();

  res.send(result);
};

module.exports = { create, users, user };
