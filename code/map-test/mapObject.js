const objs = new Map();

class Thing {
  constructor(channelName, channelID) {
    (this.name = channelName), (this.channelID = channelID);
  }
  getName() {
    return this.name;
  }
}

const c1 = new Thing('bob', 12345);
const c2 = new Thing('squiggle', 12345);

console.log(c1);
console.log(c2);

objs.set(12345, c1);
objs.set(123456, c1);

const c3 = objs.get(12345);

console.log(c3);

console.log(c3 === c2);

console.log(c1.getName());
