function testCallbacks(x, callback) {
  console.log(x);
  let req = 'request';
  let res = 'response';
  callback(req, res);
}

testCallbacks('hi', (req, res) => {
  console.log(req + ' ' + res);
});

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (res, request) => {
  request.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
