# Expense Tracker — Coding Rules

## General
- Prefer readable, consistent, maintainable code.
- Use descriptive variable and function names.
- Keep functions focused on one responsibility.
- Avoid duplicated calculations and rendering logic.
- Add dependencies only when justified.

## HTML
- Keep exactly one valid document structure.
- Do not nest a second HTML document inside the page.
- Use semantic elements where appropriate.
- Connect labels to form controls.
- Keep IDs unique and buttons clearly named.

## CSS
- Keep styling in `style.css` where practical.
- Use consistent spacing, typography, colors, and component styles.
- Support narrow screens and browser zoom.
- Provide visible keyboard-focus states.
- Prefer meaningful classes over brittle selectors.

## JavaScript
- Use `const` by default and `let` when reassignment is needed.
- Use strict comparisons (`===`, `!==`).
- Validate inputs before changing data.
- Maintain one source of truth for transactions.
- Recalculate dependent totals and charts after changes.
- Handle missing or malformed local-storage data safely.
- Avoid inserting user-provided text through unsafe `innerHTML`; prefer `textContent` or safe DOM construction.
- Avoid creating duplicate chart instances during rerendering.
- Keep date parsing and display consistent.
- Provide clear error and success feedback.

## Storage
- Document the local-storage key and record structure.
- Do not store passwords, bank credentials, or secret API keys.
- Explain that browser data can be cleared and is not synced automatically.

## Git
- Use clear commit messages, e.g. `Fix dashboard totals`.
- Commit related changes together.
- Do not commit secrets or unrelated personal data.
- Test before pushing.

## Test Checklist
- Add income and expense.
- Validate empty/invalid amounts.
- Edit and delete transactions.
- Test search and filters.
- Verify totals and charts.
- Refresh and confirm local persistence.
- Export and inspect CSV.
- Test mobile layout.
