

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".button");

let currentInput = "";
let previousInput = "";
let operator = null;
let resultDisplayed = false;

function updateDisplay(value) {
    display.innerText = value;
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const buttonText = button.innerText;

        if (button.classList.contains("clear")) {   
            currentInput = "";   
            previousInput = "";
            operator = null;
            resultDisplayed = false;
            updateDisplay("0");
        } else if (button.classList.contains("operator")) {
            if (currentInput === "" && previousInput === "") return;
            if (operator && !resultDisplayed) calculate();
            operator = buttonText;
            previousInput = currentInput;
            currentInput = "";
            resultDisplayed = false;
        } else if (button.classList.contains("equals")) {
            if (!operator || !currentInput || !previousInput) return;
            calculate();
            operator = null;
            resultDisplayed = true;
        } else {
            if (buttonText === "." && currentInput.includes(".")) return;
            if (resultDisplayed) {
                currentInput = buttonText;
                resultDisplayed = false;
            } else {
                currentInput += buttonText;
            }
            updateDisplay(currentInput);
        }
    });
});

function calculate() {
    let result;
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            result = num2 !== 0 ? num1 / num2 : "Error";
            break;
        default:
            return;
    }

    currentInput = result.toString();
    updateDisplay(currentInput);
    previousInput = "";
}
