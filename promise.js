let newPromise1 = new Promise(function(resolve, reject) {
  setTimeout(function(){
    resolve(1)
  }, 1000);
});

let newPromise2 = new Promise(function(resolve, reject) {
  setTimeout(function(){
    resolve(2)
  }, 1000);
});

let newPromise3 = new Promise(function(resolve, reject) {
  setTimeout(function(){
    resolve(3)
  }, 1000);
});

async function getResult() {
  // let result = await newPromise1;
  // let result2 = await newPromise2;
  // let result3 = await newPromise3;
  let result = await Promise.all([newPromise1, newPromise2, newPromise3]);
  return result;
}

getResult().then(function(data){
  console.log(data);
});

// console.log(total);