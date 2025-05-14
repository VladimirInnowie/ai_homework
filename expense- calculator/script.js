// Store expenses in an array
let expenses = [];

// Function to add a new expense
function addExpense() {
    const category = document.getElementById('category').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);

    if (!category || isNaN(amount) || amount <= 0) {
        alert('Please enter valid category and amount');
        return;
    }

    // Add expense to array
    expenses.push({ category, amount });

    // Clear input fields
    document.getElementById('category').value = '';
    document.getElementById('amount').value = '';

    // Update the table
    updateExpensesTable();
}

// Function to delete an expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    updateExpensesTable();
}

// Function to update the expenses table
function updateExpensesTable() {
    const tbody = document.getElementById('expensesList');
    tbody.innerHTML = '';

    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.category}</td>
            <td>$${expense.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td>
                <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Function to calculate all expense metrics
function calculateExpenses() {
    if (expenses.length === 0) {
        alert('Please add some expenses first');
        return;
    }

    // Calculate total expenses
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    // Calculate average daily expense (assuming 30 days per month)
    const averageDaily = total / 30;

    // Get top 3 expenses
    const top3 = [...expenses]
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 3);

    // Update the UI
    document.getElementById('totalExpenses').textContent = 
        `$${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    
    document.getElementById('averageExpense').textContent = 
        `$${averageDaily.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const topExpensesList = document.getElementById('topExpenses');
    topExpensesList.innerHTML = top3
        .map(expense => `<li>${expense.category}: $${expense.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</li>`)
        .join('');

    // If less than 3 expenses, fill with placeholder
    for (let i = top3.length; i < 3; i++) {
        topExpensesList.innerHTML += '<li>-</li>';
    }
}

// Add event listeners for enter key
document.getElementById('category').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('amount').focus();
    }
});

document.getElementById('amount').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addExpense();
    }
}); 