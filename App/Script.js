"use strict";

let money, time;

let startCalculating = document.getElementById("start"),
    //Значения дохода
    budgetValue = document.getElementsByClassName("budget-value")[0],
    dayBudgetValue = document.getElementsByClassName("daybudget-value")[0],
    levelValue = document.getElementsByClassName("level-value")[0],
    expensesValue = document.querySelectorAll(".expenses-value")[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName("income-value")[0],
    monthSavingsValue = document.getElementsByClassName("monthsavings-value")[0],
    yearSavingsValue = document.getElementsByClassName("yearsavings-value")[0],
    //------------------------------------------------------------------------------------
    expensesItems = document.querySelectorAll(".expenses-item"),
    //Кнопка утвердить
    expensesBtn = document.getElementsByTagName("button")[0],
    // Кнопка утвердить для необязательных расходов
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    // Кнопка рассчитать
    countBtn = document.getElementsByTagName("button")[2],

    optExpensesItem = document.querySelectorAll(".optionalexpenses-item"),
    chooseIncome = document.querySelector(".choose-income"),
    checkSavings = document.querySelector("#savings"),
    chooseSum = document.querySelector(".choose-sum"),
    choosePercent = document.querySelector(".choose-percent"),
    chooseYear = document.querySelector(".year-value"),
    chooseMonth = document.querySelector(".month-value"),
    chooseDay = document.querySelector(".day-value");

// Указываем наш месячный бюджет и дату
startCalculating.addEventListener("click", function () {
    startCalculating = true;
    time = prompt("Введите дату в формате YYYY-MM-DD", "");
    money = prompt("Введите ваш месячный бюджет", "");

    while (isNaN(money) || money == "" || money == null) {
        money = prompt("Введите ваш месячный бюджет", "");
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money;
    chooseYear.value = new Date(Date.parse(time)).getFullYear();
    chooseMonth.value = new Date(Date.parse(time)).getMonth() + 1;
    chooseDay.value = new Date(Date.parse(time)).getDate();
});


//Обязательные расходы
expensesBtn.addEventListener("click", function () {
    if (startCalculating == true) {
        let sum = 0;

        for (let i = 0; i < expensesItems.length; i++) {
            let a = expensesItems[i].value,
                b = expensesItems[++i].value;

            if ((typeof (a)) != null && (typeof (b)) != null && a != "" && b != "" &&
                a.length < 20 && b.length < 20) {
                console.log("done");
                appData.expenses[a] = b;
                sum += +b;
            }
        }
        expensesValue.textContent = sum.toFixed();
    }
});


//Необязательные расходы
optionalExpensesBtn.addEventListener("click", function () {
    if (startCalculating == true) {
        for (let i = 0; i < optExpensesItem.length; i++) {
            let opt = optExpensesItem[i].value;
            appData.optionalExpenses[i] = opt;
            optionalExpensesValue.textContent += appData.optionalExpenses[i] + ", ";
        }
    }
});


countBtn.addEventListener("click", function () {
    if (startCalculating == true) {

        if (!isNaN(appData.budget) || appData.budget != undefined) {
            appData.moneyPerDay = (appData.budget / 30).toFixed();
            dayBudgetValue.textContent = appData.moneyPerDay;

            if (appData.moneyPerDay < 100) {
                levelValue.textContent = "Минимальный уровень достатка";
            } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
                levelValue.textContent = "Средний уровень достатка";
            } else if (appData.moneyPerDay > 2000) {
                levelValue.textContent = "Высокий уровень достатка";
            } else {
                levelValue.textContent = "Произошла ошибка";
            }
        } else {
            dayBudgetValue.textContent = "Нажмите начать расчёт";
        }
    }
});


chooseIncome.addEventListener("input", function () {
    if (startCalculating == true) {
        let items = chooseIncome.value;
        appData.income = items.split(",");
        incomeValue.textContent = appData.income;
    }
});


checkSavings.addEventListener("click", function () {
    if (startCalculating == true) {
        if (appData.savings == false) {
            appData.savings = true;
        } else {
            appData.savings = false;
        }
    }
});


chooseSum.addEventListener("input", function () {
    if (startCalculating == true) {
        if (appData.savings == true) {
            let save = +chooseSum.value,
                percent = +choosePercent.value;

            appData.monthIncome = save / 100 / 12 * percent;
            appData.yearIncome = save / 100 * percent;

            monthSavingsValue.textContent = appData.monthIncome.toFixed();
            yearSavingsValue.textContent = appData.yearIncome.toFixed();
        }
    }
});


choosePercent.addEventListener("input", function () {
    if (startCalculating == true) {
        if (appData.savings == true) {
            let save = +chooseSum.value,
                percent = +choosePercent.value;

            appData.monthIncome = save / 100 / 12 * percent;
            appData.yearIncome = save / 100 * percent;

            monthSavingsValue.textContent = appData.monthIncome.toFixed();
            yearSavingsValue.textContent = appData.yearIncome.toFixed();
        }
    }
});

let appData = {
    budget: money,
    expenses: {},
    optionalExpenses: {},
    timeData: time,
    income: [],
    savings: false
};