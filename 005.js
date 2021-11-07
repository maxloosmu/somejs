let newObject = {};
newObject.A = 1;
newObject.B = 2;
newObject.C = 3;
let keys = [];
for (let k of Object.keys(newObject)) {
  keys.push(k);
}
console.log(keys);
console.log(Object.keys(newObject));
console.log(Object.getOwnPropertyNames(Object));
console.log(Object.getOwnPropertyNames(Array));
