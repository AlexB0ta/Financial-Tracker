# Financial Tracker

A web application that allows users to track their financial transactions, including income, expenses, and cryptocurrency exchange rates. The app provides real-time analytics and helps users better understand their financial situation over time.

## Features

- **Track Transactions**: Record and categorize transactions as income or expenses.
- **Stock Market Data**: View the best performing stocks and make the best invesment decision in the current market.
- **Cryptocurrency Exchange Rates**: View live cryptocurrency exchange rates for popular coins such as Bitcoin (BTC), Ethereum (ETH), and Solana (SOL) in various currencies.
- **Responsive Design**: A mobile-friendly, responsive UI built using Tailwind CSS.
- **Interactive Charts**: Bar and line charts for visualizing income, expenses, and net profit over time, built with Chart.js.
- **Data Persistence**: Transactions and data stored in a Supabase database.
- **API Integration**: Fetch live data from external APIs (AlphaVantage) for real-time currency exchange rates.

## Tech Stack

- **Frontend**: 
  - React.js
  - Vite
  - Tailwind CSS
  - Daisy UI
  - Chart.js
  - Axios
- **Backend**:
  - Node.js
  - Express.js
  - Supabase (for database)
  - AlphaVantage API (for cryptocurrency/stocks exchange rates)
- **Deployment**:
  - Render (for both frontend and backend deployment)

## Running the Project Locally

To set up and run the project locally, follow these steps:

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v14 or later)
- **npm** (v6 or later)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/financial-tracker.git
cd financial-tracker
```

### 2. Set Up Environment Variables

### 3. Install Dependencies
Install the dependencies for both the frontend and backend:
```bash
npm install
```

### 4. Start the Backend Server
```bash
cd server
node server.js
```

### 5. Start the Frontend Development Server
In another terminal run:
```bash
cd client
npm run dev
```

### 6. Access the Application
Open your web browser and go to http://localhost:your_port to start using the Financial Tracker application.








