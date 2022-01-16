import { Banana, Apple } from './Fruit';
import { Request, Response } from 'express';

let banana = new Banana(false);
let apple = new Apple(true);

function fruitController(req: Request, res: Response) {
  let fruit = req.query.fruit;

  switch (fruit) {
    case 'apple':
      res.send(apple);
      break;
    case 'banana':
      res.send(banana);
      break;
    default:
      res.sendStatus(404);
      break;
  }
}

export default fruitController;
