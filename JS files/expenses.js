const inputExpensesName = document.querySelector("#expenses-name");
const inputExpensesAmount = document.querySelector("#expenses-amount");
const expensesBtn = document.querySelector("#expenses-btn");
const expensesList = document.querySelector("#expenses-list");
const expensesSum = document.querySelector("#expenses-sum");

const addingExpensesListPosition = () => {
  const expensesListPosition = document.createElement("li");
  expensesListPosition.id = expensesListPosition;
  expensesListPosition.textContent =
    inputExpensesName.value + "-" + inputExpensesAmount.value;
  expensesList.appendChild(expensesListPosition);
  inputExpensesName.value = "";
  inputExpensesAmount.value = "";
};

expensesBtn.addEventListener("click", addingExpensesListPosition);
