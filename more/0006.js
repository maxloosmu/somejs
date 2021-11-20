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



