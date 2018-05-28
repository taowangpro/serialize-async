# serialize-async

> Serialize execution of javascript asynchronous functions. Typically those functions have their own async callback where either next(mem) can start  the next function, or if error, fail() to abort. The variable "mem" is accessible all the way through 


## Install

```
$ npm install --save serialize-async
```


## Usage

```js
const serialize = require('serialize-async');

serialize( {init mem} , [
    function (mem, next, fail) {
      // receive the init mem, and start the first job
      asyncFun1(
        ..., 
        function cb(result){
          mem.result = result // update mem in place ...
          next(mem);          // start the next job
        }
      );
    },
    function (mem, next, fail) {
      // job2 started by the previous next(mem), certainly receive the updated mem
      asyncFun2(
        ..., 
        function cb(err, result){
          if (err) {
            fail(err); // if anything wrong, cancel the rest of jobs
            return;
          }
          ...
          next(mem);   // move on
        }
      );
    },
    ...
]).then((mem)=>{
  // when all job call next(mem), the latest mem get here
  ...
}).catch((err)=>{
  // as long as one fail() call
  ...
}).finally(()=>{
  // Thanks bluebird. Yes, serialize() return bluebird promise
  ...
})

```

## API

serialize(init, [fn1, fn2 ...]): Promise

## License

MIT ©
