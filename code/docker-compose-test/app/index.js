require('dotenv').config();
const express = require('express');

// Databases
require('./db/sequelize');

const app = express();

const { user: UserModel } = require('./db/sequelize');

app.route('/info').get(async (req, res) => {
  try {
    const users = await UserModel.findAll({ logging: console.log });
    res.send(users);
  } catch (error) {
    throw error;
  }
});

app.route('/').get(async (req, res) => {
  res.send('Hello World');
});

app.route('/create').post(async (req, res) => {
  try {
    const jane = await UserModel.create({
      id: '123',
      fullname: 'janedoe',
    });
    res.send(jane.toJSON());
  } catch (error) {
    throw error;
  }
});

const port = process.env.NODEJS_LOCAL_PORT || 3000;
app.listen(port, () => {
  console.log(`Worker: process ${process.pid} is up on port ${port}`);
});
