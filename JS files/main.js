// main.js

// Function to get the text content of an element and convert it to a number
const getNumberFromElement = (selector) => {
  const element = document.querySelector(selector);
  return element ? Number(element.textContent) : 0;
};

// Function to update the result
const updateResult = () => {
  // Get the sums from the respective elements
  const incomeSum = getNumberFromElement("#income-sum");
  const expensesSum = getNumberFromElement("#expenses-sum");

  // Calculate the difference
  const result = incomeSum - expensesSum;

  // Update the result in the <h1> element
  const resultElement = document.querySelector("#result");
  if (resultElement) {
    resultElement.textContent = result.toString();
  }
};

// Expose the updateResult function to be used in other scripts
export { updateResult };
