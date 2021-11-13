/*
2020 Javascript - The Definitive Guide
Chapter 8 Functions
Section 8.6 Closures
*/
function addPrivateProperty(o, name, predicate) {
  // This is the property value
  let value;
  // The getter method simply returns the value.
  o[`get${name}`] = function() { return value; };
  // The setter method stores the value or throws an exception if
  // the predicate rejects the value.
  o[`set${name}`] = function(v) {
    if (predicate && !predicate(v)) {
      throw new TypeError(`set${name}: invalid value ${v}`);
    } else {
    value = v;
    }
  };
}
// The following code demonstrates the addPrivateProperty() method.
let o = {}; // Here is an empty object
// Add property accessor methods getName and setName()
// Ensure that only string values are allowed
addPrivateProperty(o, "Name", x => typeof x === "string");
// Set the property value
console.log(o.setName("Frank"));
console.log(o.getName()); // => "Frank"
console.log(o.setName("Mark"));
console.log(o.getName());
// !TypeError: try to set a value of the wrong type
console.log(o.setName(0));



