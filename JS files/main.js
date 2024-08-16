const getNumberFromElement = (selector) => {
  const element = document.querySelector(selector);
  return element ? Number(element.textContent) : 0;
};

const updateResult = () => {
  const incomeSum = getNumberFromElement("#income-sum");
  const expensesSum = getNumberFromElement("#expenses-sum");

  const result = incomeSum - expensesSum;

  const resultElement = document.querySelector("#result");
  if (resultElement) {
    resultElement.textContent = result.toString();
  }
};

// Expose the updateResult function to be used in other scripts
export { updateResult };
