'use strict';
const Promise = require("bluebird");

module.exports = function(mem, jobs) {

  function doJobs(resolve, reject) {
    var job = jobs.shift();

    if (!job) {
      resolve(mem);
      return;
    }

    new Promise(function (res, rej) {
          job(mem, res, rej);
        }).then((value)=>{
          mem = value;
          doJobs(resolve, reject);
        }).catch(e => {
          reject(e);
        });

  }

  return new Promise(doJobs);
};