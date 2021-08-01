const usersJSON = require('./users.json');
const UserNotFoundError = require('../errors');

// Map of users
const db = new Map();

// Initializing from users.json
for (let i = 0; i < usersJSON.length; i++) {
  db.set(usersJSON[i].username, {
    username: usersJSON[i].username,
    firstname: usersJSON[i].firstname,
    lastname: usersJSON[i].lastname,
  });
}

const insertOne = function (user) {
  db.set(user.username, {
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
  });
  return user;
};

const findOne = function (username) {
  const user = db.get(username);
  if (user == undefined) {
    throw new UserNotFoundError('User not found!!!');
  }
  return user;
};

const findAll = function () {
  const allUsers = {};

  db.forEach((value, key) => {
    allUsers[key] = value;
  });

  return allUsers;
};

module.exports = { insertOne, findOne, findAll };
