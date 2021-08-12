const testMap = new Map();

testMap.set(1, 'A');
testMap.set(2, 'B');
testMap.set(4, 'C');
testMap.set(3, 'D');

console.log(testMap);

testMap.forEach((value, key) => {
  console.log(value, key);
});

for (const [key, value] of testMap.entries()) {
  console.log(key, value);
}

console.log(testMap.get(4));
