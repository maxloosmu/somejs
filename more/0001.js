/*
2020 Javascript - The Definitive Guide
Chapter 8 Functions
Section 8.6 Closures
*/
// Define and invoke
let uniqueInteger = (function() {
  // Private state of function below
  let counter = 0;
  return function() { return counter++; };
}());
console.log(uniqueInteger)
console.log(uniqueInteger()) // => 0
console.log(uniqueInteger()) // => 1

let invokeTwice = (function() {
  let counter = 0;
  return (function() { return counter++; }());
}());
console.log(invokeTwice)
// immediately invoked and stored outcome,
// so counter can't ++
console.log(invokeTwice)


