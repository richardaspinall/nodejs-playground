require('dotenv').config();
const express = require('express');
const app = express();

const router = require('./router');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
