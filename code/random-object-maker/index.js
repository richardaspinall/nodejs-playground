// Load our random people to pick from
const data = require('./MOCK_DATA.json');

// Class Person has two private members #name and #age and a greet function that greets someone if they are provided
class Person {
  #name;
  #age;

  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }
  greet(someone) {
    console.log(`Hi${someone ? ' ' + someone.#name : ''}! My name is ${this.#name} and I'm ${this.#age} years old`);
  }
}

const people = []; // Create our array of people to add to

// Run every second
setInterval(() => {
  const randomIndex = Math.floor(Math.random() * data.length); // Generate a random person from the data

  const person = new Person(data[randomIndex].name, data[randomIndex].age); // Create a new instance of a Person

  person.greet(); // Have this person say hello

  people.push(person); // Add this person to our array of people

  let greeter = people[Math.floor(Math.random() * people.length)]; // Find a random person to greet the new arrival

  // Check that the person generated is not themself
  if (greeter === person) {
    console.log("I'm sorry but I can't greet myself!!!");
    console.log('--------------------------------------------');
    return;
  }
  greeter.greet(person); // Greet the new person
  console.log('--------------------------------------------');
}, 1000);
