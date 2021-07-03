class Human {
  constructor(public name: string) {}

  sayHi() {
    return `Hello, ${this.name}`;
  }
}

const patrick = new Human('Patrick Mullot');

console.log(patrick.sayHi());

class SuperHuman extends Human {
  heroName: string;
  constructor(name: string) {
    super(name);
    this.heroName = `HERO ${name}`;
  }

  superpower() {
    return `${this.heroName} pops treys 🔥🏀`;
  }
}

const steph = new SuperHuman('Steph Curry');

console.log(steph.superpower());
