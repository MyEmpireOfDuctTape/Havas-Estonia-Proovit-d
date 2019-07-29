
var num = 30;

function fibRecursive(n) {
  return n <= 1 ? n : fibRecursive(n - 1) + fibRecursive(n - 2);
}

function fibIterative(n) {
  var a = 1,
    b = 1;
  for (var i = 3; i <= n; i++) {
    var c = a + b;
    a = b;
    b = c;
  }
  return b;
}

var t0 = performance.now();
console.log(fibRecursive(num));   
var t1 = performance.now();
console.log("Call to fib Recursive took " + (t1 - t0) + " ms.")


var t2 = performance.now();
console.log(fibIterative(num));  
var t3 = performance.now();
console.log("Call to fib Iterative took " + (t3 - t2) + " ms.")


// The iterative function is much faster than recursion, because numbers are not calculated twice.