/* 2016 Data Visualization with Python and JavaScript
Chapter 2 */
var data = [1, 2, 3, 4, 5];
var sum = 0;

data.forEach(function(d){
  sum += d;
});

console.log('Sum = ' + sum);

function outer(bar){
  this.bar = bar;
  var that = this;
  test = inner(2);
  function inner(baz){
    this.baz = baz * that.bar;
    return this.baz;
  }
  return test;
 }

 console.log('baz * bar = ' + outer(2));