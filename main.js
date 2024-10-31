function calculate(value) {
  const inputValue = value;
  const expression = /\+|\*|\-|\//;
  const numbers = inputValue.split(expression);
  let operator = null;
  const parsedOperatorObject = inputValue.match(expression);
  const numA = Number(numbers[0]);
  const numB = Number(numbers[1]);
  if (!parsedOperatorObject || isNaN(numA) || isNaN(numB)) {
    updateResult("Expression not recognized");
    return;
  }

  operator = parsedOperatorObject[0];
  const calculatator = new Calculator();
  calculatator.add(numA);
  let result = null;
  switch (operator) {
    case "+":
      result = calculatator.add(numB);
      break;
    case "-":
      result = calculatator.subtract(numB);
      break;
    case "*":
      result = calculatator.multiply(numB);
      break;
    case "/":
      result = calculatator.divide(numB);
      break;
    default:
      result = "Operation not recognized";
  }

  updateResult(result);
}

function updateResult(result) {
  let resElement = document.getElementById("result");
  if (resElement) {
    resElement.innerText = result;
  }
}

function showVersion() {
  const calculatator = new Calculator();
  const element = document.getElementById("version");
  if (element) {
    calculatator.version.then(function (v) {
      debugger;
      element.innerText = v;
    });
  }
}

document.getElementById("inputValue") &&
  document
    .getElementById("inputValue")
    .addEventListener("change", function (event) {
      calculate(event.target.value);
    });
