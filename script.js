function calculate(op, a, b) {
  switch (op) {
    case "+":
      return a + b;
      break;
    case "-":
      return a - b;
      break;
    case "*":
      return a * b;
      break;
    case "/":
      return a / b;
      break;
  }
}

let displayValue = 0;
let shouldReset = false;
let firstOperand;
let secondOperand;
let operation;

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

numberButtons.forEach((button) =>
  button.addEventListener("click", () => {
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
      displayUpper.textContent = displayValue + operation;
      shouldReset = true;
    }

    console.log(firstOperand);
    console.log(secondOperand);
    console.log(operation);
  })
);

clearButton.addEventListener("click", () => {
  // Erases all operands and return the display to the initial state
  firstOperand = null;
  secondOperand = null;
  operation = null;
  displayValue = 0;
  displayUpper.textContent = "";
  displayLower.textContent = displayValue;
});

deleteButton.addEventListener("click", () => {
  // Removes one digit an updates the display
  displayValue = Math.floor(displayValue / 10);
  displayLower.textContent = displayValue;
});
