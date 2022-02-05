/**
 * On this module you should write your answer to question #1.
 * This file would be executed with the following command (N=100):
 * $ node scritp.js 100
 */
 const fs = require('fs')

const args = process.argv.slice(-1);
console.log(`Running question #1 with args ${args}`)
const result = howManySteps(args)
writeFile(result)
console.log(`The result for question #1 is ${result}`)

function writeFile(result){

    answer = `The result for question #1 is ${result}`;
    
    fs.writeFile('./output.txt', answer, err => {
        if (err) {
          console.error(err)
          return
        }
      })
    
}

function howManySteps(n){
    let a = 1, b = 2, result;
    if(n == 1){
        return 1;
    }
    if(n == 2){
        return 2;
    }

    for (let i = 2; i < n; i++) {
        result = a + b;
        a = b;
        b = result;
    }
    return result;
}

