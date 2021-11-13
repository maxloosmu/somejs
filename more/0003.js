/*
2020 Javascript - The Definitive Guide
Chapter 8 Functions
Section 8.6 Closures
*/
// This function returns a function that always returns v
function constfunc(v) { return () => v; }
// Create an array of constant functions:
let funcs = [];
for(var i = 0; i < 10; i++) {
  funcs[i] = constfunc(i);
  // console.log(`funcs[${i}]() = ${funcs[i]()}`);
  // console.log(`funcs[${i}] = ${funcs[i]}`);
}
// The function at array element 5 returns the value 5.
console.log(`funcs[5]() = ${funcs[5]()}`);

// Return an array of functions that return the values 0-9
function constfuncs() {
  let funcs = [];
  for(var i = 0; i < 10; i++) { // using var
    funcs[i] = () => i;
    console.log(`funcs[${i}]() = ${funcs[i]()}`);
  }
  console.log(`funcs[3]() = ${funcs[3]()}`); // => 10;
  return funcs;
}
let funcs2 = constfuncs();
console.log(`funcs2 = ${funcs2}`);
console.log(`funcs2[5] = ${funcs2[5]}`);
console.log(`funcs2[5]() = ${funcs2[5]()}`);
// => 10 because i is defined and retains value
// throughout constfuncs()
// console.log(`funcs2() = ${funcs2()}`); // doesn't work

function constfuncs2() {
 let funcs = [];
 for(let i = 0; i < 10; i++) { // using let
   funcs[i] = () => i;
   console.log(`funcs[${i}]() = ${funcs[i]()}`);
 }
 return funcs;
}
let funcs3 = constfuncs2();
console.log(`funcs3 = ${funcs3}`);
console.log(`funcs3[5] = ${funcs3[5]}`);
console.log(`funcs3[5]() = ${funcs3[5]()}`); // => 5;


