const express = require('express');
const app = express();
app.use(express.json());

/* 

How Async Await works

- Each request is still independently handled by Node. 

- The timeout doesn't block the main thread from processing subsequent requests. 

*/

// Asynchronous function
app.post('/', async function (req, res) {
  console.log(req.body);

  // When notimeout === true, we immediately respond
  if (req.body.notimeout === true) {
    res.send('Hello World');
    return;
  }

  // When notimeout !== true, we delay the response
  setTimeout(() => {
    res.send('Delayed Hello World');
  }, 10000);
});

app.listen(3000);
