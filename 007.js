let greet = "global hello";
let n = 999;
function layer1Greet() {
  let greet = "layer 1 local hello";
  let n = 0;
  function layer2Greet() {
    let greet = "layer 2 local hello";
    return {
      count: function() {
        n += 1;
        return (`${n} ${greet}`);
      },
      reset: function() {
        n = 0;
        return (`${n} ${greet}`);
      }
    };
  }
  return layer2Greet()
}
greet1 = layer1Greet();
greet2 = layer1Greet();
console.log(greet1.count());	// 1 layer 2 local hello
console.log(greet1.count());	// 2 layer 2 local hello
console.log(greet1.count());	// 3 layer 2 local hello
console.log(greet2.count());	// 1 layer 2 local hello
console.log(greet2.count());	// 2 layer 2 local hello
console.log(greet2.reset());	// 0 layer 2 local hello
console.log(greet1.count());	// 4 layer 2 local hello

