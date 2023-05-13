let firstNumber = "", secondNumber = "", operator = "", result;
let numberFlag = 1;

const numButtons = document.querySelectorAll('.numButton');
const operatorButtons = document.querySelectorAll('.opButton');
const equal = document.querySelector('#equalButton');
const display = document.querySelector('#display');
const clear = document.querySelector('#clearButton');

numButtons.forEach( (button) => {
  button.addEventListener('click', () => {
    if(numberFlag === 2){
      firstNumber = '';
      secondNumber = '';
      while (display.firstChild) {
        display.firstChild.remove();
      }
      firstNumber = firstNumber.concat(button.textContent);
      display.appendChild(document.createTextNode(button.textContent));
      console.log(firstNumber);
      numberFlag = 1;
    }
    else if(numberFlag === 1){
      firstNumber = firstNumber.concat(button.textContent);
      display.appendChild(document.createTextNode(button.textContent));
      console.log(firstNumber);
    }
    else if (numberFlag === 0){
      secondNumber = secondNumber.concat(button.textContent);
      display.appendChild(document.createTextNode(button.textContent));
      console.log(secondNumber);
    }
  });
});

operatorButtons.forEach( (button) => {
  button.addEventListener('click', () => {
    if(numberFlag === 1 || numberFlag === 2){
      operator = button.textContent;
      display.appendChild(document.createTextNode(button.textContent));
      numberFlag = 0;
      console.log(operator);
    }
    else if(numberFlag === 0){
      console.log(`${firstNumber}${operator}${secondNumber}`);
      operate(operator, parseInt(firstNumber), parseInt(secondNumber));
      operator = button.textContent;
      display.appendChild(document.createTextNode(button.textContent));
      numberFlag = 0;
      console.log(operator);
    }
  })
});

equal.addEventListener('click', () => {
  if(firstNumber && secondNumber){
    console.log(`${firstNumber}${operator}${secondNumber}`);
    operate(operator, parseInt(firstNumber), parseInt(secondNumber));
  }
  else{
    while (display.firstChild) {
      display.firstChild.remove();
    }
    display.appendChild(document.createTextNode("ERRO"));
    firstNumber = "";
    secondNumber = "";
    operator = "";
    result = 0;
    numberFlag = 2;
  }
});

function operate(operator, num1,  num2){
  switch(operator){
    case '+': result = add(num1, num2);
              break;
    case '-': result = subtract(num1, num2);
              break;
    case 'x': result = multiply(num1, num2);
              break;
    case '/': result = divide(num1, num2);
              break;  
  }
  if(operator === '/' && num2 === 0){
    while (display.firstChild) {
      display.firstChild.remove();
    }
    display.appendChild(document.createTextNode("ERRO"));
    firstNumber = "";
    secondNumber = "";
    operator = "";
    result = 0;
    numberFlag = 2;
    return;
  }
  while (display.firstChild) {
    display.firstChild.remove();
  }
  display.appendChild(document.createTextNode(result));
  firstNumber = String(result);
  secondNumber = '';
  numberFlag = 2;
  console.log(result);
}

clear.addEventListener('click', () => {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  result = 0;
  numberFlag = 1;
  while (display.firstChild) {
    display.firstChild.remove();
  }
});


function add(num1, num2){
  return num1 + num2;
}
function subtract(num1, num2){
  return num1 - num2;
}
function multiply(num1, num2){
  return num1 * num2;
}
function divide(num1, num2){
  return Math.floor(num1 / num2);
}