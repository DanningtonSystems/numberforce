const chalk = require("chalk");
const path = require("path");
const { Worker } = require("worker_threads");

Math.randInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const finalNumber = Math.randInt((992299*85281), (48325*952281));

let solved = false;

console.time();

const worker = new Worker(path.join(__dirname, "worker.js"), {
    workerData: finalNumber
});

worker.on("message", r => {
    if (r.number === finalNumber) {
        solved = true;
        worker.terminate();
        // console.log(`${chalk["bold"].blue(r.number)}: Number ${chalk["green"].bold("is")} ${chalk.bold(finalNumber)}`);
        console.log(`${chalk["bold"].green("✔")} ${chalk["bold"].blue(r.number)}`);
        console.log(`NUMBER TO FIND: ${chalk["bold"].blue(r.number)}`);
        console.log(`ELAPSED TIME TO FIND: ${chalk["bold"].blue(`${r.time}s`)}`);
    } else {
        // if (r.number !== undefined) return console.log(`${chalk["bold"].blue(r.number)}: Number ${chalk["red"].bold("is not")} ${chalk.bold(finalNumber)}`);
        console.log(`${chalk["bold"].red("✘")} ${chalk["bold"].blue(r.number)}`);
    };
});