# Expense Tracker — UI/UX Directions

## Design Goal
Keep the dashboard clear, calm, and easy to scan so users can understand their finances quickly.

## Information Hierarchy
1. Page title and primary action.
2. Summary cards: income, expenses, balance, saving rate.
3. Income-versus-expense and category charts.
4. Search and filter controls.
5. Transaction list and export action.

## Layout
- Use consistent spacing and a readable page width.
- Group summary cards together.
- Use a balanced chart grid on desktop.
- Stack sections on mobile.
- Prevent tables and controls from overflowing the viewport.
- Keep key actions easy to find.

## Visual Design
- Use consistent typography and heading sizes.
- Distinguish income and expense visually, but do not rely on color alone.
- Maintain adequate contrast.
- Keep card padding, border radius, and shadows consistent.
- Keep decoration restrained so financial information remains prominent.

## Interaction
- Label transaction fields clearly.
- Distinguish primary and secondary actions.
- Confirm destructive actions when appropriate.
- Show useful success and validation messages.
- Make edit/delete actions easy to identify.
- Ensure visible keyboard focus and keyboard access.

## Charts
- Use descriptive titles and legends where needed.
- Keep colors and units consistent.
- Avoid misleading scales.
- Show a helpful empty state when there is no data.

## Accessibility and Error States
- Use semantic HTML and labels.
- Provide accessible names for icon-only buttons.
- Do not use color as the only error or status indicator.
- Explain what to do when there are no transactions.
- If the chart CDN fails, keep other app functions usable where possible.
