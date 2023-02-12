let displayValue = 0;
let shouldReset = false;
let shouldClear = false;
let firstOperand;
let secondOperand;
let operation;
let result;
let shouldWait;

const numberButtons = document.querySelectorAll(".number-input");
const operatorButtons = document.querySelectorAll(".operator-input");
const deleteButton = document.querySelector("#DEL");
const clearButton = document.querySelector("#AC");
const equalButton = document.querySelector("#equal");
const dotButton = document.querySelector(".dot-input");
const displayLower = document.querySelector(".screen-lower");
const displayUpper = document.querySelector(".screen-upper");

numberButtons.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);
operatorButtons.forEach((button) =>
  button.addEventListener("click", () => assignOperator(button.textContent))
);
dotButton.addEventListener("click", () => appendDot());
clearButton.addEventListener("click", () => clear());
deleteButton.addEventListener("click", () => deleteValue());
equalButton.addEventListener("click", () => evaluate());

window.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key == "+" || e.key == "-") assignOperator(e.key);
  if (e.key == "*") assignOperator("x");
  if (e.key == "/") assignOperator("÷");
  if (e.key == "Enter") evaluate();
  if (e.key == "Delete") deleteValue();
  if (e.key == "Backspace") deleteValue();
  if (e.key == "Escape") clear();
});

/*-------------------------------------------*/

function appendNumber(button) {
  if (shouldClear) {
    clear();
    shouldClear = false;
  }
  if (displayValue === 0 || shouldReset) {
    resetDisplay();
    shouldReset = false;
  }
  if (displayValue === "" && button.textContent === "0") {
    resetDisplay();
    return;
  }
  displayValue += button;
  displayLower.textContent = displayValue;
  shouldWait = false;
}

function appendDot() {
  if (!displayLower.textContent.includes(".")) {
    displayValue += ".";
    displayLower.textContent = displayValue;
  }
}

function assignOperator(button) {
  if (shouldWait) {
    operation = button;
    displayUpper.textContent = displayValue + " " + operation + " ";
  } else if (firstOperand && operation) {
    secondOperand = displayValue;
    displayValue = roundResult(operation, firstOperand, secondOperand);
    operation = button;
    displayLower.textContent = displayValue;
    displayUpper.textContent = displayValue + " " + operation;
    firstOperand = displayValue;
    secondOperand = null;
    shouldReset = true;
    shouldWait = true;
  }
  if (!firstOperand || !operation) {
    operation = button;
    firstOperand = displayLower.textContent;
    displayUpper.textContent = displayValue + " " + operation + " ";
    shouldReset = true;
    shouldWait = true;
  }
}

function evaluate() {
  if (!operation && !secondOperand) {
  }
  if (!operation) {
    firstOperand = displayValue;
    displayUpper.textContent = firstOperand + " " + " =";
    shouldReset = true;
  }
  if (operation) {
    if (!secondOperand) {
      secondOperand = displayValue;
    }
    displayValue = roundResult(operation, firstOperand, secondOperand);
    displayLower.textContent = displayValue;
    displayUpper.textContent =
      firstOperand + " " + operation + " " + secondOperand + " =";
    firstOperand = displayValue;
    shouldReset = true;
  }
}

function roundResult(operation, firstOperand, secondOperand) {
  result = calculate(operation, firstOperand, secondOperand);
  return Math.floor(result * 1000) / 1000;
}

function deleteValue() {
  // Removes one digit an updates the display
  displayValue = Math.floor(displayValue / 10);
  displayLower.textContent = displayValue;
}

function resetDisplay() {
  // Clear the display before input numbers
  displayValue = "";
}

function clear() {
  // Erases all operands and return the display to the initial state
  firstOperand = null;
  secondOperand = null;
  operation = null;
  displayValue = 0;
  displayUpper.textContent = "";
  displayLower.textContent = displayValue;
}

/*-------------------------------------------*/

function calculate(op, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (op) {
    case "+":
      return a + b;
      break;
    case "-":
      return a - b;
      break;
    case "x":
      return a * b;
      break;
    case "÷":
      console.log(a);
      console.log(b === 0);
      console.log(a / b);
      if (b === 0) {
        shouldClear = true;
        return (displayLower.textContent = "Can't divide by zero");
      }
      return a / b;
      break;
  }
}

/*-------------------------------------------*/
