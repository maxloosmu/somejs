/*
https://github.com/davidflanagan/jstdg7
2020 Javascript - The Definitive Guide
Chapter 8 Functions
Section 8.3.1 Optional Parameters and Defaults
*/

// Append the names of the enumerable
// properties of object o to the
// array a, and return a. If a is omitted,
// create and return a new array.
function getPropertyNames(o, a) {
  // If undefined, use a new array
  // if (a === undefined) a = [];
  // Alternate method:
  a = a || [];
  for(let property in o) a.push(property);
  return a;
}
// getPropertyNames() can be invoked with
// one or two arguments:
// Two objects for testing
let o = {x: 1}, p = {y: 2, z: 3};
// a == ["x"]; get o's properties in a new array
let a = getPropertyNames(o);
// a == ["x","y","z"];
// add p's properties to it
console.log(getPropertyNames(p, a));

// Alternate function
function getPropertyNames2(o, a = []) {
  for(let property in o) a.push(property);
  return a;
}
let b = getPropertyNames2(o);
console.log(getPropertyNames(p, b));

/*
2020 Javascript - The Definitive Guide
Chapter 8 Functions
Section 8.3.4 The Spread Operator for Function Calls
*/

// This function takes a function and
// returns a wrapped version
function timed(f) {
// Collect args into a rest parameter array
  return function(...args) {
    console.log(`Entering function ${f.name}`);
    let startTime = Date.now();
    try {
      // Pass all of our arguments
      // to the wrapped function
      // Spread the args back out again
      return f(...args);
    }
    finally {
      // Before we return the wrapped return value,
      // print elapsed time.
      console.log(`Exiting ${f.name} after
        ${Date.now()-startTime}ms`);
    }
  };
}

function benchmark(n) {
  let sum = 0;
  for(let i = 1; i <= n; i++) sum += i;
  return sum;
}

// Compute the sum of the numbers
// between 1 and n by brute force
function benchmark2(...n) {
  let sum = [];
  for(let j = 0; j < n.length; j++) {
    sum[j] = 0;
    for(let i = 1; i <= n[j]; i++) sum[j] += i;
  }
  console.log(`sum = ${sum}`);
  return sum;
}
// Now invoke the timed version of that test function
// => 500000500000, 500000500000;
// this are the sums for each set of numbers
timed(benchmark)(1000000)

/*
2020 Javascript - The Definitive Guide
Chapter 8 Functions
Section 8.4.1 Defining Your Own Function Properties
*/

// Compute factorials and cache results
// as properties of the function itself.
// factorial(n) is a function and object
// with array properties at the same time.
function factorial(n) {
  // Positive integers only
  if (Number.isInteger(n) && n > 0) {
    // If no cached result
    if (!(n in factorial)) {
      // Compute and cache it
      factorial[n] = n * factorial(n-1);
      console.log(`factorial[${n}] = ${factorial[n]}`);
    }
    // cannot log factorial or only display
    // the code of entire factorial function.
    // console.log(`factorial = ${factorial}`);
    // Return the cached result
    return factorial[n];
  } else {
    return NaN; // If input was bad
  }
}
// Initialize the cache to hold this base case.
// function factorial as array object stores
// this for the duration of runtime.
factorial[1] = 1;
// => 720
console.log(`factorial(6) = ${factorial(6)}`);
// => 120, recalled from cached object property
console.log(`factorial(5) = ${factorial(5)}`);

/*
2020 Javascript - The Definitive Guide
Chapter 8 Functions
Section 8.7.4 The call() and apply() Methods
*/

// Replace the method named m of the
// object o with a version that logs
// messages before and after invoking
// the original method.
function trace(o, m) {
  let original = o[m]; // Remember original method in the closure.
  o[m] = function(...args) { // Now define the new method.
    console.log(new Date(), "Entering:", m); // Log message.
    let result = original.apply(this, args); // Invoke original.
    console.log(new Date(), "Exiting:", m); // Log message.
    return result; // Return result.
  };
}
obj = {};
obj.bmk = benchmark;
trace(obj, "bmk");
obj.bmk(1000000);
obj["bmk"](1000000);

/*
2020 Javascript - The Definitive Guide
Chapter 8 Functions
Section 8.7.5 The bind() Method
*/

// Arrow functions don't work, cannot bind x later:
// f1 = y => (this.x + y);
// This function needs to be bound:
function f1(y) { return this.x + y; }
let o1 = { x: 1 }; // An object we'll bind to
let g1 = f1.bind(o1); // Calling g1(x) invokes f1() on o1
console.log(`g1(2) = ${g1(2)}`); // => 3
let p1 = { x: 10, g1 }; // Invoke g1() as a method of this object
console.log(`p1.g1(3) = ${p1.g1(3)}`); // => 4: g1 is still bound to o1, not p1.

// Return the sum of 2 args:
// Arrow function work because no this keyword:
let sum2 = (x,y) => x + y;
let succ = sum2.bind(null, 1); // Bind the first argument to 1
console.log(`succ(2) = ${succ(2)}`); // => 3: x is bound to 1, and we pass 2 for the y argument
function f2(y,z) { return this.x + y + z; }
let g2 = f2.bind({x: 1}, 2); // Bind this and y
console.log(`g2 = ${g2}`);
console.log(`g2(3) = ${g2(3)}`); // => 6: this.x is bound to 1, y is bound to 2 and z is 3

/*
2020 Javascript - The Definitive Guide
Chapter 8 Functions
Section 8.8.1 Processing Arrays with Functions
Section 8.8.2 Higher-Order Functions
*/

// This higher-order function returns a new function that passes its
// arguments to f and returns the logical negation of f's return value;
function not(f) {
  return function(...args) { // Return a new function
    let result = f.apply(this, args); // that calls f
    console.log(`result = ${result}`);
    return !result; // and negates its result.
  };
}
const even = x => x % 2 === 0; // A function to determine if a number is even
const odd = not(even); // A new function that does the opposite
// => true if every element of the array is odd.
// 'every' truncates runtime and return false
// the moment !result = false
console.log(`[1,1,3,6,6].every(odd) = ${[1,1,3,6,6].every(odd)}`);

// mapper() Return a function that expects
// an array argument and applies f to
// each element, returning the array of return values.
// Contrast this with the map() function from earlier.
const map = function(a, ...args) { return a.map(...args); };

function mapper(f) {
  return a => map(a, f);
}
const increment = x => x+1;
const incrementAll = mapper(increment);
// incrementAll returns a.map, so it expects (...args):
console.log(`incrementAll([1,2,3]) = ${incrementAll([1,2,3])}`); // => [2,3,4]

// Return a new function that computes f(g(...)).
// The returned function h passes all of its arguments to g, then passes
// the return value of g to f, then returns the return value of f.
// Both f and g are invoked with the same this value as h was invoked with.
function compose(f, g) {
  return function(...args) {
    // We use call for f because we're passing a single value and
    // apply for g because we're passing an array of values.
    return f.call(this, g.apply(this, args));
  };
}
const sum = (x,y) => x+y;
const square = x => x*x;
// => 25; the square of the sum
console.log(`compose(square, sum)(2,3) =
  ${compose(square, sum)(2,3)}`);

/*
2020 Javascript - The Definitive Guide
Chapter 8 Functions
Section 8.8.3 Partial Application of Functions
https://github.com/davidflanagan/jstdg7/blob/master/ch08/partial.js
*/

// The arguments to this function are passed on the left
function partialLeft(f, ...outerArgs) {
  return function(...innerArgs) { // Return this function
    let args = [...outerArgs, ...innerArgs]; // Build the argument list
    return f.apply(this, args);              // Then invoke f with it
  };
}

const not2 = partialLeft(compose, x => !x);
const even2 = x => x % 2 === 0;
const odd2 = not2(even2);
const isNumber = not2(isNaN);
console.log(`odd2(3) && isNumber(3) =
  ${odd2(3) && isNumber(3)}`); // => true

/*
2020 Javascript - The Definitive Guide
Chapter 8 Functions
Section 8.8.4 Memoization
*/

// Return a memoized version of f.
// It only works if arguments to f all have distinct string representations.
function memoize(f) {
  const cache = new Map();  // Value cache stored in the closure.

  return function(...args) {
    // Create a string version of the arguments to use as a cache key.
    let key = args.length + args.join("+");
    if (cache.has(key)) {
      console.log(`key = ${key}`);
      console.log(`cache.get(key) = ${cache.get(key)}`);
      return cache.get(key);
    } else {
      let result = f.apply(this, args);
      console.log(`result = ${result}`);
      cache.set(key, result);
      console.log(`key = ${key}`);
      console.log(`cache.get(key) = ${cache.get(key)}`);
      return result;
    }
  };
}

// Return the Greatest Common Divisor of two integers using the Euclidian
// algorithm: http://en.wikipedia.org/wiki/Euclidean_algorithm
function gcd(a,b) {  // Type checking for a and b has been omitted
  if (a < b) {           // Ensure that a >= b when we start
    [a, b] = [b, a];   // Destructuring assignment to swap variables
  }
  while(b !== 0) {       // This is Euclid's algorithm for GCD
    console.log(`[a, b] = ${[a, b]}`);
    [a, b] = [b, a%b];
    console.log(`[a, b] = ${[a, b]}`);
  }
  return a;
}

const gcdmemo = memoize(gcd);
console.log(`gcdmemo(87, 186) = ${gcdmemo(87, 186)}`); // => 17

// Note that when we write a recursive function that we will be memoizing,
// we typically want to recurse to the memoized version, not the original.
// memoize takes the factorial function,
// leaving parameter n for factorial function:
const factorial2 = memoize(function(n) {
  return (n <= 1) ? 1 : n * factorial2(n-1);
});
// => 120: also caches values for 4, 3, 2 and 1.
console.log(`factorial2(5) = ${factorial2(5)}`);
console.log(`factorial2(4) = ${factorial2(4)}`);



