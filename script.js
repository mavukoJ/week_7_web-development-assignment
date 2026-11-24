
// =======================================
// SPENDWISE - INTERACTIVE BUDGET TRACKER
// =======================================

// 1. APPLICATION DATA

let totalBudget = 0;
let expenses = [];

const currency = "KES";

// 2. SELECT HTML ELEMENTS

const budgetForm = document.getElementById("budgetForm");
const expenseForm = document.getElementById("expenseForm");

const budgetInput = document.getElementById("budgetInput");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");

const budgetDisplay = document.getElementById("budget");
const expensesDisplay = document.getElementById("expenses");
const balanceDisplay = document.getElementById("balance");

const budgetStatus = document.getElementById("budgetStatus");
const expenseList = document.getElementById("expenseList");

const clearExpensesButton =
    document.getElementById("clearExpenses");

// 3. FORMAT CURRENCY

function formatCurrency(amount) {
    return currency + " " + amount.toFixed(2);
}

// 4. CALCULATE TOTAL EXPENSES

function calculateTotalExpenses() {
    let total = 0;

    expenses.forEach(function(expense) {
        total += expense.amount;
    });

    return total;
}

// 5. CALCULATE REMAINING BALANCE

function calculateBalance() {
    return totalBudget - calculateTotalExpenses();
}

// 6. UPDATE DASHBOARD

function updateDashboard() {
    const total = calculateTotalExpenses();
    const remaining = calculateBalance();

    budgetDisplay.textContent = formatCurrency(totalBudget);
    expensesDisplay.textContent = formatCurrency(total);
    balanceDisplay.textContent = formatCurrency(remaining);

    // CONDITIONAL STATEMENTS

    if (totalBudget <= 0) {
        budgetStatus.textContent =
            "Please set your budget to get started.";

        budgetStatus.className = "";

    } else if (remaining < 0) {
        budgetStatus.textContent =
            "Warning! You have exceeded your budget.";

        budgetStatus.className = "danger";

    } else if (remaining === 0) {
        budgetStatus.textContent =
            "You have used your entire budget.";

        budgetStatus.className = "warning";

    } else {
        budgetStatus.textContent =
            "Great! You are within your budget.";

        budgetStatus.className = "";
    }

    console.log("===== SPENDWISE REPORT =====");
    console.log("Budget:", totalBudget);
    console.log("Expenses:", total);
    console.log("Remaining:", remaining);
}

// 7. DISPLAY EXPENSES

function displayExpenses() {
    expenseList.innerHTML = "";

    if (expenses.length === 0) {
        const emptyMessage = document.createElement("li");

        emptyMessage.className = "empty";
        emptyMessage.textContent = "No expenses recorded yet.";

        expenseList.appendChild(emptyMessage);
        return;
    }

    expenses.forEach(function(expense, index) {
        const item = document.createElement("li");

        const details = document.createElement("span");

        details.className = "expense-details";

        details.textContent =
            expense.name + " - " + formatCurrency(expense.amount);

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.type = "button";

        deleteButton.addEventListener("click", function() {
            deleteExpense(index);
        });

        item.appendChild(details);
        item.appendChild(deleteButton);

        expenseList.appendChild(item);
    });
}

// 8. ADD EXPENSE

function addExpense(name, amount) {
    const newExpense = {
        name: name,
        amount: amount
    };

    expenses.push(newExpense);

    displayExpenses();
    updateDashboard();
}

// 9. DELETE EXPENSE

function deleteExpense(index) {
    expenses.splice(index, 1);

    displayExpenses();
    updateDashboard();
}

// 10. SET BUDGET EVENT

budgetForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const value = Number(budgetInput.value);

    if (!Number.isFinite(value) || value <= 0) {
        alert("Please enter a valid budget greater than zero.");
        return;
    }

    totalBudget = value;

    updateDashboard();

    budgetForm.reset();

    alert("Budget saved successfully!");
});

// 11. ADD EXPENSE EVENT

expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);

    if (name === "") {
        alert("Please enter an expense name.");
        return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
        alert("Please enter a valid expense amount.");
        return;
    }

    addExpense(name, amount);

    expenseForm.reset();
});

// 12. CLEAR ALL EXPENSES EVENT

clearExpensesButton.addEventListener("click", function() {
    if (expenses.length === 0) {
        alert("There are no expenses to clear.");
        return;
    }

    const confirmation = confirm(
        "Are you sure you want to clear all expenses?"
    );

    if (confirmation) {
        expenses = [];

        displayExpenses();
        updateDashboard();

        alert("All expenses cleared successfully!");
    }
});

// 13. INITIALIZE APPLICATION

displayExpenses();
updateDashboard();

console.log("SpendWise application loaded successfully.");
