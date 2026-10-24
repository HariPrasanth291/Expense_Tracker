# Expense Tracker — Project Context

## Summary
**Name:** Expense Tracker  
**Type:** Frontend web application  
**Purpose:** Record income and expenses, summarize finances, review spending categories, and export records.

## Stack
- HTML5
- CSS3
- JavaScript
- Chart.js via CDN
- Browser local storage

## Intended Current Features
- Add, edit, and delete transactions.
- Income, expense, balance, and saving-rate summaries.
- Income-versus-expense and category charts.
- Search and filter transactions.
- Date or time-period filtering.
- CSV export.
- Local persistence.
- Responsive layout and user feedback.

Verify the exact code before claiming every feature is complete.

## Architecture and Data
This is a client-side application. Transactions are saved in browser local storage. There is no backend database, account-based storage, or cross-device synchronization in the current version. Charts depend on Chart.js being available from its CDN.

## Repository
- Suggested repository: `expense-tracker`
- Entry point: `index.html`
- Styles: `style.css`
- Logic: `script.js`
- General overview: `README.md`
- Project documents: `docs/`

## Deployment
GitHub Pages can host this static app. Publish the `main` branch root when the application files are in the repository root.

## Portfolio / Interview Description
“I built a frontend Expense Tracker using HTML, CSS, and JavaScript. It helps users manage income and expenses, view summary cards and charts, filter transactions, and export data to CSV. I used browser local storage to persist data, so the current version does not include a backend database or cross-device synchronization.”

## Limitations
- No backend API or database.
- No user login or authentication.
- No automatic cross-device sync.
- Browser storage may be cleared.
- Chart.js requires CDN access unless bundled locally.

## Maintenance Rules
- Update this file when the stack, architecture, or scope changes.
- Update `05-tasks-and-progress.md` when tasks change status.
- Update product requirements before adding substantial behavior.
- Keep README claims aligned with the deployed code.
