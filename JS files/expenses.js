// Import updateResult from main.js
import { updateResult } from "./main.js";

// Elements from HTML doc
const inputExpensesName = document.querySelector("#expenses-name");
const inputExpensesAmount = document.querySelector("#expenses-amount");
const expensesBtn = document.querySelector("#expenses-btn");
const expensesList = document.querySelector("#expenses-list");
const expensesSum = document.querySelector("#expenses-sum");
let sum = 0;
const expensesInputContainer = document.querySelector(
  ".input-expenses-container"
);

// Functions
const addingExpensesListElement = () => {
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edytuj";
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Usuń";
  const expensesListElementButtonsContainer = document.createElement("div");
  expensesListElementButtonsContainer.id = "list-elements-button-container";
  const expensesListElement = document.createElement("li");
  expensesListElement.id = "list-element";
  let inputExpensesNameValue = inputExpensesName.value;
  let inputExpensesAmountValue = inputExpensesAmount.value;

  expensesListElement.textContent = `${inputExpensesNameValue} - ${inputExpensesAmountValue} zł`;
  expensesListElementButtonsContainer.appendChild(editBtn);
  expensesListElementButtonsContainer.appendChild(deleteBtn);
  expensesListElement.appendChild(expensesListElementButtonsContainer);
  expensesList.appendChild(expensesListElement);

  sum += Number(inputExpensesAmountValue);
  expensesSum.textContent = sum.toString();

  // Update result after adding expenses
  updateResult();

  // Editing list element function
  const editingListElement = () => {
    editBtn.disabled = true;
    expensesBtn.style.display = "none";
    const confirmChangeButton = document.createElement("button");
    confirmChangeButton.textContent = "Potwierdź";
    expensesInputContainer.appendChild(confirmChangeButton);

    // Store the old values before editing
    const oldExpensesAmountValue = inputExpensesAmountValue;

    inputExpensesName.value = inputExpensesNameValue;
    inputExpensesAmount.value = inputExpensesAmountValue;

    const confirmChange = () => {
      // Update the values with the new ones from the input fields
      inputExpensesNameValue = inputExpensesName.value;
      inputExpensesAmountValue = inputExpensesAmount.value;

      expensesListElement.textContent = `${inputExpensesNameValue} - ${inputExpensesAmountValue} zł`;

      // Adjust the sum by removing the old amount and adding the new one
      sum =
        sum - Number(oldExpensesAmountValue) + Number(inputExpensesAmountValue);
      expensesSum.textContent = sum.toString();

      // Clean up and restore state
      expensesListElementButtonsContainer.appendChild(editBtn);
      expensesListElementButtonsContainer.appendChild(deleteBtn);
      expensesListElement.appendChild(expensesListElementButtonsContainer);
      confirmChangeButton.remove();
      expensesBtn.style.display = "inline";
      editBtn.disabled = false;
      inputExpensesName.value = "";
      inputExpensesAmount.value = "";

      // Update result after editing expenses
      updateResult();
    };

    confirmChangeButton.addEventListener("click", confirmChange);
  };

  editBtn.addEventListener("click", editingListElement);

  // Delete button function
  const deleteListElement = () => {
    sum -= Number(inputExpensesAmountValue);
    expensesSum.textContent = sum.toString();
    expensesList.removeChild(expensesListElement);

    // Update result after deleting expenses
    updateResult();
  };

  deleteBtn.addEventListener("click", deleteListElement);

  // Reset the inputs after adding the expenses
  inputExpensesName.value = "";
  inputExpensesAmount.value = "";
};

expensesBtn.addEventListener("click", addingExpensesListElement);
