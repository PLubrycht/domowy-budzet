import { updateResult } from "./main.js";

// Elements from HTML doc
const form = document.querySelector("#income-form");
const inputIncomeName = document.querySelector("#income-name");
const inputIncomeAmount = document.querySelector("#income-amount");

const incomeList = document.querySelector("#income-list");
const incomeSum = document.querySelector("#income-sum");
let sum = 0;

// Functions
const addingIncomeListElement = (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edytuj";
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Usuń";
  const incomeListElementButtonsContainer = document.createElement("div");
  incomeListElementButtonsContainer.className =
    "list-elements-button-container";
  const incomeListElement = document.createElement("li");
  incomeListElement.className = "list-element";
  let inputIncomeNameValue = inputIncomeName.value;
  let inputIncomeAmountValue = inputIncomeAmount.value;

  incomeListElement.textContent = `${inputIncomeNameValue} - ${inputIncomeAmountValue} zł`;
  incomeListElementButtonsContainer.appendChild(editBtn);
  incomeListElementButtonsContainer.appendChild(deleteBtn);
  incomeListElement.appendChild(incomeListElementButtonsContainer);
  incomeList.appendChild(incomeListElement);

  sum += Number(inputIncomeAmountValue);
  incomeSum.textContent = sum.toString();

  updateResult();

  // Editing list element function
  const editingListElement = () => {
    editBtn.disabled = true;
    incomeListElement.textContent = "";

    const editForm = document.createElement("form");

    const editNameInput = document.createElement("input");
    editNameInput.type = "text";
    editNameInput.value = inputIncomeNameValue;
    editNameInput.required = true;

    const editAmountInput = document.createElement("input");
    editAmountInput.type = "number";
    editAmountInput.value = inputIncomeAmountValue;
    editAmountInput.required = true;
    editAmountInput.min = "0.01";
    editAmountInput.step = "0.01";

    const confirmChangeButton = document.createElement("button");
    confirmChangeButton.textContent = "Zatwierdź";
    confirmChangeButton.type = "submit";

    editForm.appendChild(editNameInput);
    editForm.appendChild(editAmountInput);
    editForm.appendChild(confirmChangeButton);

    incomeListElement.appendChild(editForm);

    editForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const newIncomeNameValue = editNameInput.value;
      const newIncomeAmountValue = editAmountInput.value;
      sum = sum - Number(inputIncomeAmountValue) + Number(newIncomeAmountValue);
      incomeSum.textContent = sum.toString();
      inputIncomeNameValue = newIncomeNameValue;
      inputIncomeAmountValue = newIncomeAmountValue;
      incomeListElement.textContent = `${inputIncomeNameValue} - ${inputIncomeAmountValue} zł`;
      incomeListElementButtonsContainer.appendChild(editBtn);
      incomeListElementButtonsContainer.appendChild(deleteBtn);
      incomeListElement.appendChild(incomeListElementButtonsContainer);
      editBtn.disabled = false;
      updateResult();
    });
  };

  editBtn.addEventListener("click", editingListElement);

  const deleteListElement = () => {
    sum -= Number(inputIncomeAmountValue);
    incomeSum.textContent = sum.toString();
    incomeList.removeChild(incomeListElement);

    updateResult();
  };
  deleteBtn.addEventListener("click", deleteListElement);

  inputIncomeName.value = "";
  inputIncomeAmount.value = "";
};

form.addEventListener("submit", addingIncomeListElement);
