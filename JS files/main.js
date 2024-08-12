const incomeSum = document.querySelector("#income-sum");

const expensesSum = document.querySelector("#expenses-sum");
const availableAmount = document.querySelector(".available-amount");

availableAmount.value = incomeSum.value + expensesSum.value;
