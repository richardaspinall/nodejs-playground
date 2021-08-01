require('dotenv').config();
const express = require('express');
const app = express();

const usersController = require('./controllers/users');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.use('/users', usersController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
