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
    case "/":
      return a / b;
      break;
  }
}

let displayValue = 0;
let shouldReset = false;
let shouldClear = false;
let firstOperand;
let secondOperand;
let operation;
let result;

const numberButtons = document.querySelectorAll(".number-input");
const operatorButtons = document.querySelectorAll(".operator-input");
const deleteButton = document.querySelector("#DEL");
const clearButton = document.querySelector("#AC");
const equalButton = document.querySelector("#equal");
const displayLower = document.querySelector(".screen-lower");
const displayUpper = document.querySelector(".screen-upper");

function resetDisplay() {
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

numberButtons.forEach((button) =>
  button.addEventListener("click", () => {
    if (shouldClear) {
      clear();
      shouldClear = false;
    }
    if (displayValue === 0 || shouldReset) {
      resetDisplay();
      shouldReset = false;
    }

    displayValue += button.textContent;
    displayLower.textContent = displayValue;
  })
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => {
    if (!firstOperand || !operation) {
      operation = button.textContent;
      firstOperand = displayValue;
      displayUpper.textContent = displayValue + " " + operation + " ";
      shouldReset = true;
    }
  })
);

equalButton.addEventListener("click", () => {
  if (!secondOperand) {
    secondOperand = displayValue;
  }
  result = calculate(operation, firstOperand, secondOperand);
  displayValue = result;
  displayLower.textContent = displayValue;
  displayUpper.textContent =
    firstOperand + " " + operation + " " + secondOperand + " =";
  firstOperand = result;
  shouldClear = true;
});

clearButton.addEventListener("click", () => clear());

deleteButton.addEventListener("click", () => {
  // Removes one digit an updates the display
  displayValue = Math.floor(displayValue / 10);
  displayLower.textContent = displayValue;
});
