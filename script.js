const STORAGE_KEY = "hari-expense-tracker-v2";

const incomeCategories = [
  "Salary",
  "Freelance",
  "Business",
  "Investment",
  "Other",
];
const expenseCategories = [
  "Food & Health",
  "Entertainment",
  "Shopping",
  "Investment",
  "Transport",
  "Utilities",
  "Other",
];
const allCategories = [...new Set([...incomeCategories, ...expenseCategories])];

const seedTransactions = [
  {
    id: crypto.randomUUID(),
    date: "2026-09-14",
    description: "Monthly salary",
    category: "Salary",
    amount: 2645,
    type: "income",
  },
  {
    id: crypto.randomUUID(),
    date: "2026-09-12",
    description: "Grocery shopping",
    category: "Food & Health",
    amount: 440,
    type: "expense",
  },
  {
    id: crypto.randomUUID(),
    date: "2026-09-10",
    description: "Online subscription",
    category: "Entertainment",
    amount: 199,
    type: "expense",
  },
  {
    id: crypto.randomUUID(),
    date: "2026-09-08",
    description: "Bus / travel",
    category: "Transport",
    amount: 200,
    type: "expense",
  },
  {
    id: crypto.randomUUID(),
    date: "2026-08-28",
    description: "Freelance work",
    category: "Freelance",
    amount: 12000,
    type: "income",
  },
];

let transactions = loadTransactions();
let cashFlowChart;
let categoryChart;

const $ = (id) => document.getElementById(id);
const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

function loadTransactions() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : seedTransactions;
  } catch {
    return seedTransactions;
  }
}

function saveTransactions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function currentMonthTransactions() {
  const now = new Date();
  return transactions.filter((t) => {
    const d = new Date(`${t.date}T00:00:00`);
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  });
}

function selectedTransactions() {
  const period = $("periodSelect").value;
  const dateFilter = $("dateFilter").value;
  const now = new Date();

  return transactions.filter((t) => {
    if (dateFilter && t.date !== dateFilter) return false;

    const d = new Date(`${t.date}T00:00:00`);
    if (period === "month")
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    if (period === "year") return d.getFullYear() === now.getFullYear();
    return true;
  });
}

function totals(list) {
  const income = list
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + Number(t.amount), 0);
  const expense = list
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + Number(t.amount), 0);
  return { income, expense, balance: income - expense };
}

function renderStats() {
  const list = selectedTransactions();
  const { income, expense, balance } = totals(list);
  const rate = income > 0 ? Math.max(0, (balance / income) * 100) : 0;

  $("incomeTotal").textContent = money(income);
  $("expenseTotal").textContent = money(expense);
  $("balanceTotal").textContent = money(balance);
  $("balanceTotal").className = balance >= 0 ? "" : "negative";
  $("savingRate").textContent = `${rate.toFixed(1)}%`;
  $("incomeChange").textContent =
    `${list.filter((t) => t.type === "income").length} income transaction(s)`;
  $("expenseChange").textContent =
    `${list.filter((t) => t.type === "expense").length} expense transaction(s)`;
  $("balanceChange").textContent =
    balance >= 0 ? "You are within your income" : "Expenses are above income";
  $("savingText").textContent = "Income saved after expenses";
}

function lastSixMonths() {
  const result = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    result.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: d.toLocaleDateString("en-IN", { month: "short" }),
    });
  }
  return result;
}

function renderCharts() {
  const months = lastSixMonths();
  const incomeData = months.map((m) =>
    transactions
      .filter((t) => t.type === "income" && t.date.startsWith(m.key))
      .reduce((s, t) => s + Number(t.amount), 0),
  );
  const expenseData = months.map((m) =>
    transactions
      .filter((t) => t.type === "expense" && t.date.startsWith(m.key))
      .reduce((s, t) => s + Number(t.amount), 0),
  );

  if (cashFlowChart) cashFlowChart.destroy();
  cashFlowChart = new Chart($("cashFlowChart"), {
    type: "bar",
    data: {
      labels: months.map((m) => m.label),
      datasets: [
        {
          label: "Income",
          data: incomeData,
          backgroundColor: "#10b981",
          borderRadius: 6,
        },
        {
          label: "Expenses",
          data: expenseData,
          backgroundColor: "#f97316",
          borderRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "top" } },
      scales: { y: { beginAtZero: true, ticks: { callback: (v) => `₹${v}` } } },
    },
  });

  const expenseList = transactions.filter((t) => t.type === "expense");
  const categoryMap = {};
  expenseList.forEach(
    (t) =>
      (categoryMap[t.category] =
        (categoryMap[t.category] || 0) + Number(t.amount)),
  );
  const categories = Object.keys(categoryMap);
  const values = Object.values(categoryMap);

  if (categoryChart) categoryChart.destroy();
  categoryChart = new Chart($("categoryChart"), {
    type: "doughnut",
    data: {
      labels: categories.length ? categories : ["No expenses"],
      datasets: [
        {
          data: values.length ? values : [1],
          backgroundColor: [
            "#f97316",
            "#f59e0b",
            "#eab308",
            "#10b981",
            "#3b82f6",
            "#8b5cf6",
            "#ef4444",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "65%",
      plugins: { legend: { display: false } },
    },
  });

  const total = values.reduce((a, b) => a + b, 0);
  $("categoryLegend").innerHTML = categories.length
    ? categories
        .map(
          (c, i) =>
            `<div class="legend-row"><span><i style="background:${["#f97316", "#f59e0b", "#eab308", "#10b981", "#3b82f6", "#8b5cf6", "#ef4444"][i % 7]}"></i>${escapeHtml(c)}</span><strong>${money(categoryMap[c])}</strong></div>`,
        )
        .join("")
    : `<div class="muted">No expense data yet.</div>`;
}

function renderTable() {
  const search = $("searchInput").value.trim().toLowerCase();
  const type = $("typeFilter").value;
  const category = $("categoryFilter").value;

  const list = [...selectedTransactions()]
    .filter((t) => type === "all" || t.type === type)
    .filter((t) => category === "all" || t.category === category)
    .filter(
      (t) =>
        !search ||
        `${t.description} ${t.category}`.toLowerCase().includes(search),
    )
    .sort((a, b) => b.date.localeCompare(a.date));

  $("transactionCount").textContent =
    `${list.length} transaction${list.length === 1 ? "" : "s"}`;
  $("transactionsBody").innerHTML = list
    .map(
      (t) => `
    <tr>
      <td>${formatDate(t.date)}</td>
      <td><strong>${escapeHtml(t.description)}</strong></td>
      <td><span class="category-pill">${escapeHtml(t.category)}</span></td>
      <td><span class="type-pill ${t.type}">${t.type === "income" ? "Income" : "Expense"}</span></td>
      <td class="${t.type === "income" ? "amount-income" : "amount-expense"}">${t.type === "income" ? "+" : "-"}${money(t.amount)}</td>
      <td class="actions">
        <button onclick="editTransaction('${t.id}')" aria-label="Edit">✎</button>
        <button onclick="deleteTransaction('${t.id}')" aria-label="Delete">×</button>
      </td>
    </tr>
  `,
    )
    .join("");

  $("emptyState").classList.toggle("hidden", list.length !== 0);
}

function updateCategoryFilter() {
  const current = $("categoryFilter").value || "all";
  $("categoryFilter").innerHTML =
    `<option value="all">All categories</option>` +
    allCategories
      .map((c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`)
      .join("");
  $("categoryFilter").value = allCategories.includes(current) ? current : "all";
}

function updateCategoryOptions(type) {
  const categories = type === "income" ? incomeCategories : expenseCategories;
  $("categoryInput").innerHTML = categories
    .map((c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`)
    .join("");
}

function openModal(type, transaction = null) {
  $("transactionModal").classList.remove("hidden");
  $("transactionModal").setAttribute("aria-hidden", "false");
  $("transactionType").value = type;
  $("transactionId").value = transaction?.id || "";
  $("modalTitle").textContent = transaction
    ? "Edit Transaction"
    : `Add ${type === "income" ? "Income" : "Expense"}`;
  $("amountInput").value = transaction?.amount ?? "";
  $("transactionDate").value = transaction?.date || todayString();
  $("descriptionInput").value = transaction?.description || "";
  updateCategoryOptions(type);
  if (transaction) $("categoryInput").value = transaction.category;
  $("amountInput").focus();
}

function closeModal() {
  $("transactionModal").classList.add("hidden");
  $("transactionModal").setAttribute("aria-hidden", "true");
  $("transactionForm").reset();
}

function editTransaction(id) {
  const transaction = transactions.find((t) => t.id === id);
  if (transaction) openModal(transaction.type, transaction);
}

function deleteTransaction(id) {
  const transaction = transactions.find((t) => t.id === id);
  if (!transaction) return;
  if (!confirm(`Delete "${transaction.description}"?`)) return;
  transactions = transactions.filter((t) => t.id !== id);
  saveTransactions();
  renderAll();
  showToast("Transaction deleted.");
}

function renderAll() {
  updateCategoryFilter();
  renderStats();
  renderCharts();
  renderTable();
}

$("transactionForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = $("transactionId").value;
  const type = $("transactionType").value;
  const data = {
    id: id || crypto.randomUUID(),
    amount: Number($("amountInput").value),
    date: $("transactionDate").value,
    description: $("descriptionInput").value.trim(),
    category: $("categoryInput").value,
    type,
  };

  if (!data.amount || data.amount <= 0 || !data.description || !data.date) {
    showToast("Please complete all fields.", true);
    return;
  }

  if (id) {
    transactions = transactions.map((t) => (t.id === id ? data : t));
    showToast("Transaction updated.");
  } else {
    transactions.push(data);
    showToast("Transaction added.");
  }

  saveTransactions();
  closeModal();
  renderAll();
});

$("addIncomeBtn").onclick = () => openModal("income");
$("addExpenseBtn").onclick = () => openModal("expense");
$("closeModal").onclick = closeModal;
$("cancelModal").onclick = closeModal;

$("transactionModal").addEventListener("click", (e) => {
  if (e.target === $("transactionModal")) closeModal();
});

["periodSelect", "dateFilter", "typeFilter", "categoryFilter"].forEach((id) =>
  $(id).addEventListener("change", renderAll),
);
$("searchInput").addEventListener("input", renderTable);

$("exportBtn").addEventListener("click", () => {
  const rows = [["Date", "Description", "Category", "Type", "Amount"]];
  transactions.forEach((t) =>
    rows.push([t.date, t.description, t.category, t.type, t.amount]),
  );
  const csv = rows
    .map((row) =>
      row.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(","),
    )
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `expense-tracker-${todayString()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("CSV exported.");
});

function showToast(message, error = false) {
  const toast = $("toast");
  toast.textContent = message;
  toast.className = `toast show ${error ? "error" : ""}`;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2500);
}

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[c],
  );
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !$("transactionModal").classList.contains("hidden"))
    closeModal();
  if (e.ctrlKey && e.key.toLowerCase() === "i") {
    e.preventDefault();
    openModal("income");
  }
  if (e.ctrlKey && e.key.toLowerCase() === "e") {
    e.preventDefault();
    openModal("expense");
  }
});

renderAll();
