# Expense Tracker — Product Requirements

## Overview
A responsive browser-based application for recording income and expenses, reviewing balances, understanding spending patterns, and exporting transactions.

## Goals
- Record and manage income and expenses.
- Show income, expenses, balance, and saving rate.
- Visualize income versus expenses and expenses by category.
- Search and filter transactions.
- Export transaction records to CSV.
- Preserve data in the same browser using local storage.

## Functional Requirements
- Add, edit, and delete transactions.
- Capture transaction details supported by the interface, such as date, category, amount, and description.
- Validate required fields and amounts.
- Recalculate dashboard summaries after transaction changes.
- Display charts based on transaction data.
- Search and filter transactions by available type, category, date, or period controls.
- Export transaction data as CSV.
- Restore saved transactions from browser local storage.

## Non-Functional Requirements
- Responsive desktop and mobile layout.
- Readable text, consistent styling, and clear feedback.
- Keyboard-friendly controls where practical.
- No backend or account system in the current version.
- Chart.js CDN access is required for chart rendering.

## Out of Scope
- Cross-device synchronization.
- User authentication.
- Bank integrations.
- Server-side database or API.
- Financial advice.

## Acceptance Criteria
- Adding, editing, and deleting transactions updates the interface and summaries.
- Search and filters work as intended.
- Charts reflect available transaction data.
- Refreshing the same browser restores locally saved data.
- CSV export downloads transaction data.
- The layout remains usable on mobile screens.

## Notes
Verify features against the exact code version before claiming they are fully implemented.
