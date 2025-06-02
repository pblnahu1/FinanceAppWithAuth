import React, { useState, useEffect } from 'react';
import BudgetCard from '../components/Dashboard/BudgetCard';
import ChartComponent from '../components/Dashboard/ChartComponent';
import { useTransactions } from '../context/TransactionContext';

// This would ideally come from a budget API endpoint
const DEFAULT_BUDGETS = {
  'Food': 500,
  'Transportation': 300,
  'Housing': 1200,
  'Entertainment': 200,
  'Utilities': 250,
  'Healthcare': 300,
  'Clothing': 150,
  'Education': 400,
  'Other': 200
};

const Budget = () => {
  const { transactions } = useTransactions();
  const [budgets, setBudgets] = useState<{[key: string]: number}>(DEFAULT_BUDGETS);
  const [editMode, setEditMode] = useState(false);
  const [editBudgets, setEditBudgets] = useState<{[key: string]: string}>({});
  
  useEffect(() => {
    // Initialize edit budgets from the current budgets
    const initialEditBudgets: {[key: string]: string} = {};
    Object.keys(budgets).forEach(category => {
      initialEditBudgets[category] = budgets[category].toString();
    });
    setEditBudgets(initialEditBudgets);
  }, [budgets]);

  // Calculate current spending per category
  const calculateSpending = () => {
    const spending: {[key: string]: number} = {};
    transactions.forEach(transaction => {
      if (transaction.type === 'expense') {
        spending[transaction.category] = (spending[transaction.category] || 0) + transaction.amount;
      }
    });
    return spending;
  };

  const spending = calculateSpending();

  // Prepare chart data
  const chartData = Object.keys(budgets).map(category => ({
    name: category,
    value: spending[category] || 0,
    budget: budgets[category]
  }));

  const chartDataFormatted = chartData.map(item => ({
    name: item.name,
    value: item.value,
    color: item.value > item.budget ? '#EF4444' : '#10B981'
  }));

  const handleBudgetChange = (category: string, value: string) => {
    setEditBudgets({
      ...editBudgets,
      [category]: value
    });
  };

  const saveBudgets = () => {
    const newBudgets: {[key: string]: number} = {};
    Object.keys(editBudgets).forEach(category => {
      newBudgets[category] = parseFloat(editBudgets[category]) || 0;
    });
    setBudgets(newBudgets);
    setEditMode(false);
    
    // In a real application, you would save these to the backend
    // saveBudgetsToAPI(newBudgets);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Budget Tracker</h1>
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit Budgets
          </button>
        ) : (
          <button
            onClick={saveBudgets}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Save Budgets
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartComponent 
          type="bar" 
          data={chartDataFormatted} 
          title="Spending vs Budget" 
        />
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            {editMode ? 'Edit Budget Allocations' : 'Budget Allocations'}
          </h3>
          <div className="space-y-3">
            {Object.keys(budgets).map(category => (
              editMode ? (
                <div key={category} className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700" htmlFor={`budget-${category}`}>
                    {category}
                  </label>
                  <div className="relative rounded-md shadow-sm w-24">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="text"
                      id={`budget-${category}`}
                      value={editBudgets[category]}
                      onChange={(e) => handleBudgetChange(category, e.target.value)}
                      className="block w-full rounded-md border border-gray-300 pl-7 pr-3 py-1 text-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ) : (
                <BudgetCard 
                  key={category}
                  category={category}
                  spent={spending[category] || 0}
                  budget={budgets[category]}
                />
              )
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Budget Tips</h3>
        <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
          <li>Consider using the 50/30/20 rule - 50% for needs, 30% for wants, and 20% for savings.</li>
          <li>Review your subscriptions regularly to cut unnecessary expenses.</li>
          <li>Set up automatic transfers to your savings account on payday.</li>
          <li>Try using cash for discretionary spending to make your budget more tangible.</li>
          <li>Consider using a zero-based budgeting method where every dollar is assigned a purpose.</li>
        </ul>
      </div>
    </div>
  );
};

export default Budget;