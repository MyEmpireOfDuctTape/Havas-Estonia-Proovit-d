// Recursive
const fiboRec = n => {
  let t0 = performance.now();
  if (n == 0) return [0]
  if (n == 1) return [0, 1]
  const arr = fiboRec(n - 1)
  let t1 = performance.now();
  return   console.log("Call to calculate recursive fibonacci sequence took " + (t1 - t0) + " milliseconds."), [...arr, arr[n-1] + arr[n-2]];
};

// Iteration
const fiboItr = n => {
    let t0 = performance.now();
    let arr = [0, 1];
    for (let i = 2; i < n + 1; i++){
      arr.push(arr[i - 2] + arr[i -1])
    }
  let t1 = performance.now();
  console.log(("Call to calculate iterative fibonacci sequence took " + (t1 - t0) + " milliseconds."));
  return arr;
};
console.log(fiboItr(15).join()); // returns array of fibonacci
console.log(fiboRec(15).join());

// Iterative is better for computing because it uses less memory, recursive without memoization is much slower. Issue comes from function calling itself once condition is met and with large number stack overflow error is easy to come.