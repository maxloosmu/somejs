/*
2020 Javascript - The Definitive Guide
Chapter 8 Functions
Section 8.3.4 The Spread Operator for Function Calls
Section 8.7.4 The call() and apply() Methods
*/
function timed(f) {
  return function(...args) {
    console.log(`Entering function ${f.name}`);
    let startTime = Date.now();
    try {
      return f(...args);
    }
    finally {
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
timed(benchmark)(1000000);

function trace(o, m) {
  let original = o[m];
  o[m] = function(...args) {
    console.log(new Date(), "Entering:", m);
    let result = original.apply(this, args);
    console.log(new Date(), "Exiting:", m);
    return result;
  };
}
// These are wrong:
// trace(benchmark)(1000000);
// benchmark.call(trace, 1000000);
// trace.benchmark(1000000);
// trace(benchmark, 1000000);

console.log(typeof trace);

// This works, except for the call
// and apply methods.  Those lead to:
// Uncaught TypeError: Cannot read properties
// of undefined (reading 'apply')
// at Object.o.<computed> [as benchmark].
// This happens after 'Entering:' 'benchmark'.
// The reason is likely that call and apply
// methods invoke benchmark on obj at that
// particular point in time only.  They don't
// associate obj with the benchmark function.
// The error likely shows that js has difficulty
// reading the original obj["benchmark"]
// to 'apply' to, because it is non-existent
// due to a lack of association.
    obj = {};
    // benchmark.call(obj);
    // benchmark.apply(obj);
    obj.benchmark = benchmark;
    trace(obj, "benchmark");
    obj.benchmark(1000000);
    obj["benchmark"](1000000);

// This totally doesn't work,
// requires name string inside []:
// obj[benchmark.call(obj, 1000000)];

// This works:
const myObject = {
  benchmark: function(n){
    let sum = 0;
    for(let i = 1; i <= n; i++) sum += i;
    return sum;
  }
}
trace(myObject,"benchmark");
myObject.benchmark(1000000);

