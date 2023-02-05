function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operator(op, a, b) {
  switch (op) {
    case "+":
      return add(a, b);
      break;
    case "-":
      return subtract(a, b);
      break;
    case "*":
      return multiply(a, b);
      break;
    case "/":
      return divide(a, b);
      break;
  }
}

let displayValue = "";

const button = document.querySelectorAll(".button-input");
const displayLower = document.querySelector(".screen-lower");
const displayUpper = document.querySelector(".screen-upper");

button.forEach((button) =>
  button.addEventListener("click", () => {
    displayValue += button.textContent;
    displayLower.textContent = displayValue;
    console.log(button.textContent);
  })
);
