/**
 * On this module you should write your answer to question #3.
 * This file would be executed with the following command:
 * $ node scritp.js 'a * (b + c)'
 */

const args = process.argv.slice(-1);
console.log(`Running question #3 with args ${args}`)

/**
 * Check if a string has correct use of parenthesis.
 * 
 * @param {String} str - String to be evaluated
 * @returns {Boolean} Returns true if string is valid.
 */
function parenthesisChecker(args) {
  // TODO: Implement validation logic
  
  let str = args[0];
  let stack = [];
  
  for(let i = 0; i < str.length; i++){
    if(str[i] == '[' || str[i] == '(' || str[i] == '{'){
      stack.push(str[i]);
    }
    if(str[i] == ']'){
      if(stack.length == 0){
        return false;
      }
      let parenthesis = stack.pop();
      
      if(parenthesis != '['){
        return false;
      }
    }
    if(str[i] == ')'){
      if(stack.length == 0){
        return false;
      }
      let parenthesis = stack.pop();
      if(parenthesis != '('){
        return false;
      }
    }
    if(str[i] == '}'){
      if(stack.length == 0){
        return false;
      }
      let parenthesis = stack.pop();
      if(parenthesis != '{'){
        return false;
      }
    }
  }

  if(stack.length == 0){
    return true;
  }else{
    return false;
  }
  
}

const isValid = parenthesisChecker(args);
console.log(`parenthesisChecker("${args}") = ${isValid}`);

