const { parentPort, workerData, threadId } = require("worker_threads");

Math.randInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const beginTime = Date.now();

let solved = false;

while (solved === false) {
    let num = Math.randInt((992299*85281), (48325*952281));
    if (workerData === num) solved = true;
    if (workerData === num) parentPort.postMessage({ number: num, time: (Date.now() - beginTime) / 1000 });
    else parentPort.postMessage({ number: num });
};
