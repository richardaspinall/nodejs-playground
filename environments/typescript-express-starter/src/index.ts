import express from 'express';
import fruitController from './fruitController';
const app = express();
const PORT = 3000;

app.get('/', fruitController);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
