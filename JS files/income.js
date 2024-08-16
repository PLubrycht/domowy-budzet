import { updateResult } from "./main.js";

// Elements from HTML doc
const inputIncomeName = document.querySelector("#income-name");
const inputIncomeAmount = document.querySelector("#income-amount");
const incomeBtn = document.querySelector("#income-btn");
const incomeList = document.querySelector("#income-list");
const incomeSum = document.querySelector("#income-sum");
let sum = 0;
const incomeInputContainer = document.querySelector(".input-income-container");

// Functions
const addingIncomeListElement = () => {
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edytuj";
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Usuń";
  const incomeListElementButtonsContainer = document.createElement("div");
  incomeListElementButtonsContainer.id = "list-elements-button-container";
  const incomeListElement = document.createElement("li");
  incomeListElement.id = "list-element";

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
    incomeBtn.style.display = "none";
    const confirmChangeButton = document.createElement("button");
    confirmChangeButton.textContent = "Potwierdź";
    incomeInputContainer.appendChild(confirmChangeButton);

    // Values before editing
    const oldIncomeAmountValue = inputIncomeAmountValue;

    inputIncomeName.value = inputIncomeNameValue;
    inputIncomeAmount.value = inputIncomeAmountValue;

    const confirmChange = () => {
      inputIncomeNameValue = inputIncomeName.value;
      inputIncomeAmountValue = inputIncomeAmount.value;

      incomeListElement.textContent = `${inputIncomeNameValue} - ${inputIncomeAmountValue} zł`;

      sum = sum - Number(oldIncomeAmountValue) + Number(inputIncomeAmountValue);
      incomeSum.textContent = sum.toString();

      incomeListElementButtonsContainer.appendChild(editBtn);
      incomeListElementButtonsContainer.appendChild(deleteBtn);
      incomeListElement.appendChild(incomeListElementButtonsContainer);
      confirmChangeButton.remove();
      incomeBtn.style.display = "inline";
      editBtn.disabled = false;
      inputIncomeName.value = "";
      inputIncomeAmount.value = "";

      updateResult();
    };

    confirmChangeButton.addEventListener("click", confirmChange);
  };

  editBtn.addEventListener("click", editingListElement);

  // Delete button function
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

incomeBtn.addEventListener("click", addingIncomeListElement);
