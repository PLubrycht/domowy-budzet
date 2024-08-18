import { updateResult } from "./main.js";

// Elements from HTML doc
const form = document.querySelector("#expenses-form");
const inputExpensesName = document.querySelector("#expenses-name");
const inputExpensesAmount = document.querySelector("#expenses-amount");

const expensesList = document.querySelector("#expenses-list");
const expensesSum = document.querySelector("#expenses-sum");
let sum = 0;

// Functions
const addingExpensesListElement = (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edytuj";
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Usuń";
  const expensesListElementButtonsContainer = document.createElement("div");
  expensesListElementButtonsContainer.className =
    "list-elements-button-container";
  const expensesListElement = document.createElement("li");
  expensesListElement.className = "list-element";
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
    expensesListElement.textContent = "";
    const editNameInput = document.createElement("input");
    editNameInput.type = "text";
    editNameInput.value = inputExpensesNameValue;
    const editAmountInput = document.createElement("input");
    editAmountInput.type = "number";
    editAmountInput.value = inputExpensesAmountValue;
    const confirmChangeButton = document.createElement("button");
    confirmChangeButton.textContent = "Confirm";
    expensesListElement.appendChild(editNameInput);
    expensesListElement.appendChild(editAmountInput);
    expensesListElement.appendChild(confirmChangeButton);

    const confirmChange = () => {
      const newExpensesNameValue = editNameInput.value;
      const newExpensesAmountValue = editAmountInput.value;
      sum =
        sum - Number(inputExpensesAmountValue) + Number(newExpensesAmountValue);
      expensesSum.textContent = sum.toString();
      inputExpensesNameValue = newExpensesNameValue;
      inputExpensesAmountValue = newExpensesAmountValue;
      expensesListElement.textContent = `${inputExpensesNameValue} - ${inputExpensesAmountValue} zł`;
      expensesListElementButtonsContainer.appendChild(editBtn);
      expensesListElementButtonsContainer.appendChild(deleteBtn);
      expensesListElement.appendChild(expensesListElementButtonsContainer);
      editBtn.disabled = false;
      updateResult();
    };

    confirmChangeButton.addEventListener("click", confirmChange);
  };

  editBtn.addEventListener("click", editingListElement);

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

form.addEventListener("submit", addingExpensesListElement);
