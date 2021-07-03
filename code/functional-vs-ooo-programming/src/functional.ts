// Pure functions

/*
The function always returns the same result if the same arguments are passed in. It does not depend on any state, or data, change during a program’s execution. It must only depend on its input arguments.
The function does not produce any observable side effects such as network requests, input and output devices, or data mutation.
*/

let num = 123;

function toString(val: number) {
  return val.toString();
}

const str = toString(num);

console.log(str);

// Impure functions

var tax = 20;
function calculateTax(productPrice: number) {
  return productPrice * (tax / 100) + productPrice;
}

console.log(calculateTax(3));

// Immutable Data

const data = Object.freeze([1, 2, 3, 4, 5, 6]);

// Functions as Arguments
const addEmoji = (val: number) => toString(val) + ' 😀';

// Map: https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d
const emojiData = data.map(addEmoji);
console.log(emojiData);

// Functions as return value
// WTF is this: https://stackoverflow.com/questions/32782922/what-do-multiple-arrow-functions-mean-in-javascript

const appendEmoji = (fixed: string) => (dynamic: string) =>
  `${fixed} ${dynamic}`;

const rain = appendEmoji('🌧');

const sun = appendEmoji('☀️');

console.log(rain(' today'));
console.log(sun(' today'));
