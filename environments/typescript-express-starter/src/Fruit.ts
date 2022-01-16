type Fruit = {
  name: string;
  juicy: boolean;
};

class Banana implements Fruit {
  name = 'Banana';
  juicy: boolean;

  constructor(juicy: boolean) {
    this.juicy = juicy;
  }
}

class Apple implements Fruit {
  name = 'Apple';
  juicy: boolean;

  constructor(juicy: boolean) {
    this.juicy = juicy;
  }
}

export { Banana, Apple };
