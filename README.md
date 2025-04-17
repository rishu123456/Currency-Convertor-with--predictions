#  Currency Converter with Predictions

A modern currency converter web application built with **React**, featuring:

-   Real-time currency conversion using ExchangeRate API - Where any currecny can be converted to any other dynamically based on exchange rates.
-  Live exchange rates dynamically based on the selections, via [ExchangeRate.host](https://exchangerate.host)
-  7-day exchange rate trend graph dynamically based on selection (Chart.js)
-  Offline mode with persisted data (Redux + Redux Persist)
- 📉 Error handling with auto-retry mechanism for API calls
-  Built using Vite + React + TailwindCSS + Redux Toolkit

---

## 🚀 Features

- Convert between popular currencies like USD, EUR, INR, JPY, etc.
- View **live exchange rates** in a table format dynamically taking base as selected From currency in the App.
- Display a **7-day trend chart** for any currency pair dynamically as we select From and To in the App.
- Auto-refresh on currency switch
- Offline support: app shows **last known exchange rates** if offline
- API request **retry mechanism** (up to 3 times) before showing an error

---

## 🛠️ Installation & Setup

1. **Clone the repository **
```bash
git clone https://github.com/rishu123456/Currency-Convertor-with--predictions
cd currency-converter-app

2. **Install dependencies**
npm install
3. Run the app
npm run dev

## Tech Stack

- React
- JavaScript
- Redux Toolkit
- Redux Persist
- Chart.js (via `react-chartjs-2`)
- Vite (for blazing fast dev environment)
- Tailwind CSS.
