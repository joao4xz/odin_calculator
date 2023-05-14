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
      cleanScreen();
      firstNumber = firstNumber.concat(button.textContent);
      display.appendChild(document.createTextNode(button.textContent));
      numberFlag = 1;
    }
    else if(numberFlag === 1){
      firstNumber = firstNumber.concat(button.textContent);
      display.appendChild(document.createTextNode(button.textContent));
    }
    else if (numberFlag === 0){
      secondNumber = secondNumber.concat(button.textContent);
      display.appendChild(document.createTextNode(button.textContent));
    }
  });
});

operatorButtons.forEach( (button) => {
  button.addEventListener('click', () => {
    if(numberFlag === 1 || numberFlag === 2){
      operator = button.textContent;
      display.appendChild(document.createTextNode(button.textContent));
      numberFlag = 0;
    }
    else if(numberFlag === 0){
      operate(operator, parseInt(firstNumber), parseInt(secondNumber));
      operator = button.textContent;
      display.appendChild(document.createTextNode(button.textContent));
      numberFlag = 0;
    }
  })
});

equal.addEventListener('click', () => {
  if(firstNumber && secondNumber){
    operate(operator, parseInt(firstNumber), parseInt(secondNumber));
  }
  else{
    cleanEverything();
    error();
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
    cleanEverything();
    error();
    numberFlag = 2;
    return;
  }
  cleanScreen();
  display.appendChild(document.createTextNode(result));
  firstNumber = String(result);
  secondNumber = '';
  numberFlag = 2;
}

clear.addEventListener('click', cleanEverything);


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

function cleanScreen(){
  while (display.firstChild) {
    display.firstChild.remove();
  }
}

function cleanEverything(){
  firstNumber = "";
  secondNumber = "";
  operator = "";
  result = 0;
  numberFlag = 1;
  cleanScreen();
}

function error(){
  display.appendChild(document.createTextNode("ERRO"));
}