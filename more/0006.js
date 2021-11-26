/*
https://github.com/davidflanagan/jstdg7
2020 Javascript - The Definitive Guide
Chapter 9 Classes
Section 9.5.3 Delegation Instead of Inheritance
Histogram.js

*/

class Histogram {
  constructor() { this.map = new Map(); }
  count(key) { return this.map.get(key) || 0; }
  has(key) { return this.count(key) > 0; }
  get size() { return this.map.size; }
  add(key) {
    this.map.set(key, this.count(key) + 1);
    return this;
  }
  delete(key) {
    let count = this.count(key);
    if (count === 1) {
      this.map.delete(key);
    } else if (count > 1) {
      this.map.set(key, count - 1);
    }
  }
  [Symbol.iterator]() { return this.map.keys(); }
  keys() { return this.map.keys(); }
  values() { return this.map.values(); }
  entries() { return this.map.entries(); }
}
const hist = new Histogram();
hist.add(1).add(2).add(1).add(2);
hist.add(3);
console.log(hist.size);

/*
https://github.com/JoyOfJavaScript/joj/tree/master/src/chapter-listings/src/ch02
2021 The Joy of JavaScript
Chapter 2 Inheritance-based object modeling
*/
// How the hash method works:
function calcHash() {
  let data = ["abc", "xyz", 123].join('');
  let hash = 0;
  let i = 0;
  console.log(hash);
  while (i < data.length) {
    let part1 = hash << 5;
    let part2 = data.charCodeAt(i) << 0;
    let part3 = data.charAt(i);
    i++;
    hash = (part1 - hash + part2);
    console.log(`hash before i=${i}:
      ${part1} - hash + (${part3}) ${part2}
      = ${hash}`);
  }
  return hash ** 2;
}
// console.log(calcHash());

// https://levelup.gitconnected.com/using-prototype-vs-this-in-a-javascript-class-can-help-save-memory-816636418c3e
// This code emulates Listing 2.6 in the book.
// This code shows the effects of the `new` keyword
// if it's missing.
// It also shows `HashTransaction.prototype` reduces
// the duplicating caused by the `this` keyword.
// The duplicating happens to the function
// `calculateHash` with the creation of each new
// object instance.
function Transaction(sender, recipient) {
  this.sender = sender
  this.recipient = recipient
}
function HashTransaction(sender, recipient) {
  if (!new.target) {
    return new HashTransaction(sender, recipient)
  }
  Transaction.call(this, sender, recipient)
}
// This line of code must be positionally
// before
// `HashTransaction.prototype.calculateHash`
HashTransaction.prototype =
  Object.create(Transaction.prototype);
// This line of code seems unnecessary in terms
// of effects, but gives the Transaction object
// a constructor.
HashTransaction.prototype.constructor =
  HashTransaction;
HashTransaction.prototype.calculateHash =
  function calculateHash() {
  const data = [this.sender, this.recipient].join('');
  let hash = 0;
  let i = 0;
  while (i < data.length) {
    hash = ((hash << 5) - hash
    + data.charCodeAt(i++)) << 0;
  }
  return hash ** 2;
}
const tx1 = new HashTransaction("abc", "abc");
const tx2 = new HashTransaction("abc", "abc");
console.log(tx1.calculateHash === tx2.calculateHash);
console.log(tx1.calculateHash());
console.log(Transaction.prototype.isPrototypeOf(tx1));
console.log(tx1.__proto__);
console.log(tx1.__proto__.__proto__);
console.log(tx1.__proto__.__proto__.__proto__);
console.log(tx1.__proto__.__proto__
  .__proto__.__proto__);

/*
https://github.com/davidflanagan/jstdg7
https://github.com/davidflanagan/jstdg7/blob/master/ch12/Range.js
2020 Javascript - The Definitive Guide
Chapter 12 Iterators and Generators
*/
console.log(Array.of(7));
console.log(Array(7));
console.log(Uint8Array.of(255, 0, 255, 128));
console.log([Symbol.iterator]);
// I created an iterator without a generator
// based on the book's example further below:
class SayHi {
  constructor (hi, repeat) {
    this.hi = hi;
    this.repeat = repeat;
  }
  [Symbol.iterator]() {
    let next = 1;
    let last = this.repeat;
    let hi = this.hi;
    return {
      next() {
        if (next<=last) {
          let now = next;
          next++;
          return { value: hi+now };
        }
        else {
          return { done: true };
        }
      },
      // What's the use of this??
      [Symbol.iterator]() {return this;}
    };
  }
}
let sayHi = new SayHi("HI", 3);
for(let x of sayHi) console.log(x);
let data1 = [...sayHi];
console.log(data1);
let data2 = [...sayHi[Symbol.iterator]()];
console.log(data2);

// Example from book:
class Range {
  constructor (from, to) {
      this.from = from;
      this.to = to;
  }
  has(x) { return typeof x === "number" && this.from <= x && x <= this.to; }
  toString() { return `{ x | ${this.from} ≤ x ≤ ${this.to} }`; }
  // Make a Range iterable by returning an iterator object.
  // Note that the name of this method is a special symbol, not a string.
  [Symbol.iterator]() {
      // Each iterator instance must iterate the range independently of
      // others. So we need a state variable to track our location in the
      // iteration. We start at the first integer >= from.
      let next = Math.ceil(this.from);  // This is the next value we return
      let last = this.to;               // We won't return anything > this
      return {                          // This is the iterator object
          // This next() method is what makes this an iterator object.
          // It must return an iterator result object.
          next() {
              return (next <= last)   // If we haven't returned last value yet
                  ? { value: next++ } // return next value and increment it
                  : { done: true };   // otherwise indicate that we're done.
          },
          // As a convenience, we make the iterator itself iterable. (???)
          [Symbol.iterator]() { return this; }
      };
  }
}

let testRange = new Range(1,5);
console.log(testRange.toString());
// for(let x of testRange) console.log(x);

// https://stackoverflow.com/questions/13218472/calling-a-function-defined-inside-another-function-in-javascript
// function to test the return of 2 functions,
// and to confirm that nested functions are not
// exposed to outside calling, unless returned:
const testPair = function() {
  // return0 cannot be called from outside:
  /*function return0() {
    console.log("000");
  }*/
  return {
    return1() {
      console.log(111);
    },
    ["return2"]() {
      console.log(222);
    }
  };
}
testPair().return1();
testPair().return2();
// testPair().return0();

// https://stackoverflow.com/questions/812961/getters-setters-for-dummies
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
// testing getter and setter
let foo = {
  _bar : 123,
  get bar(){ return this._bar; },
  set bar( value ){ this._bar = value; }
};
console.log(foo.bar);
foo.bar = 456;
console.log(foo.bar);

