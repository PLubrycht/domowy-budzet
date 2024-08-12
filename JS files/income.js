const inputIncomeName = document.querySelector("#income-name");
const inputIncomeAmount = document.querySelector("#income-amount");
const incomeBtn = document.querySelector("#income-btn");
const incomeList = document.querySelector("#income-list");
export const incomeSum = document.querySelector("#income-sum");

const addingIncomeListPosition = () => {
  const incomeListPosition = document.createElement("li");
  incomeListPosition.id = incomeListPosition;
  incomeListPosition.textContent =
    inputIncomeName.value + "-" + inputIncomeAmount.value;
  incomeList.appendChild(incomeListPosition);
  inputIncomeName.value = "";
  inputIncomeAmount.value = "";
};

incomeBtn.addEventListener("click", addingIncomeListPosition);
