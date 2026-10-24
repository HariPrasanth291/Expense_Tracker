# Expense Tracker — Project Architecture

## Architecture
Static client-side web application. It runs in the browser and does not require a server.

## Technology Stack
- HTML5 — page structure (`index.html`)
- CSS3 — layout and responsive styling (`style.css`)
- JavaScript — application behavior (`script.js`)
- Chart.js — charts, loaded from a CDN
- Browser Local Storage — local persistence

## Project Structure
```text
expense-tracker/
├── index.html
├── style.css
├── script.js
├── README.md
└── docs/
    ├── 01-product-requirements.md
    ├── 02-project-architecture.md
    ├── 03-coding-rules.md
    ├── 04-ui-ux-directions.md
    ├── 05-tasks-and-progress.md
    └── 06-project-context.md
```

## Data Flow
1. User interacts with the HTML interface.
2. JavaScript validates input.
3. The transaction collection is updated.
4. Data is saved to local storage.
5. Dashboard totals, charts, and transaction list are refreshed.
6. Search and filters determine visible transactions.
7. CSV export generates a downloadable file.

## Logical Components
- Transaction management
- Local persistence
- Dashboard calculations
- Chart rendering
- Transaction search and filters
- CSV export
- Validation and user feedback

## Deployment
Use GitHub Pages for static hosting. Publish the `main` branch root when `index.html` is located at the repository root.

## Limitations
Local storage is browser-specific, is not synced between devices, and can be cleared. Chart rendering depends on CDN availability.
