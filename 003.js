let anObject0 = {};
console.log(anObject0.a);

let anObject1 = {a:1, b:2, c:3};
console.log(anObject1['a']);

let anObject2 = {'a':1, 'b':2, 'c':3};
console.log(anObject2.a);

let anObject3 = {"a":1, "b":2, "c":3};
console.log(anObject3['a']);

let anObject4 = {"a key":"cat", "b key":"dog", "c key":"bird"};
console.log(anObject4["c key"]);

const newMap = new Map();
newMap.set("cat", "cat house");
newMap.set("dog", "dog house");
newMap.set("bird", "bird house");
console.log(newMap.size) // 3
console.log(newMap.has('dog')); // true
console.log(newMap.get('cat')); // cat house
console.log(newMap.delete('tiger')); // false
console.log(newMap.delete('dog')); // true
console.log(newMap.size) // 2
newMap.forEach((value, key) =>
  console.log(`newMap[${key}] = ${value}`));

const mapObject4 = new Map(Object.entries(anObject4));
console.log(mapObject4.get('a key')); // cat
