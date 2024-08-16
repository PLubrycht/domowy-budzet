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

  updateResult();

  // Editing list element function
  const editingListElement = () => {
    editBtn.disabled = true;
    expensesBtn.style.display = "none";
    const confirmChangeButton = document.createElement("button");
    confirmChangeButton.textContent = "Potwierdź";
    expensesInputContainer.appendChild(confirmChangeButton);

    // Values before editing
    const oldExpensesAmountValue = inputExpensesAmountValue;

    inputExpensesName.value = inputExpensesNameValue;
    inputExpensesAmount.value = inputExpensesAmountValue;

    const confirmChange = () => {
      inputExpensesNameValue = inputExpensesName.value;
      inputExpensesAmountValue = inputExpensesAmount.value;

      expensesListElement.textContent = `${inputExpensesNameValue} - ${inputExpensesAmountValue} zł`;

      sum =
        sum - Number(oldExpensesAmountValue) + Number(inputExpensesAmountValue);
      expensesSum.textContent = sum.toString();

      expensesListElementButtonsContainer.appendChild(editBtn);
      expensesListElementButtonsContainer.appendChild(deleteBtn);
      expensesListElement.appendChild(expensesListElementButtonsContainer);
      confirmChangeButton.remove();
      expensesBtn.style.display = "inline";
      editBtn.disabled = false;
      inputExpensesName.value = "";
      inputExpensesAmount.value = "";

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

    updateResult();
  };

  deleteBtn.addEventListener("click", deleteListElement);

  inputExpensesName.value = "";
  inputExpensesAmount.value = "";
};

expensesBtn.addEventListener("click", addingExpensesListElement);
