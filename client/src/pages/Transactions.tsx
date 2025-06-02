import React, { useState } from 'react';
import TransactionItem from '../components/Dashboard/TransactionItem';
import TransactionForm from '../components/Dashboard/TransactionForm';
import { useTransactions } from '../context/TransactionContext';

interface Transaction {
  amount: number;
    description: string;
    category: string;
    type: 'income' | 'expense';
    date: string;
}

export const Transactions = () => {
  const { transactions, loading, error, addTransaction, deleteTransaction } = useTransactions();
  const [showForm, setShowForm] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  
  const filteredTransactions = Array.isArray(transactions) 
    ? transactions.filter(transaction => {
        if (filterType === 'all') return true;
        return transaction.type === filterType;
      })
    : [];

  const handleAddTransaction = async (transactionData: Transaction) => {
    await addTransaction({
      ...transactionData,
      date: new Date(transactionData.date).toISOString()
    });
    setShowForm(false);
  };

  const handleDeleteTransaction = async (id: string) => {
    await deleteTransaction(id);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading transactions...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {showForm ? 'Cancel' : 'Add Transaction'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {showForm && (
        <TransactionForm onAddTransaction={handleAddTransaction} />
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                filterType === 'all' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('income')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                filterType === 'income' ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Income
            </button>
            <button
              onClick={() => setFilterType('expense')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                filterType === 'expense' ? 'bg-red-100 text-red-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Expenses
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map(transaction => (
              <TransactionItem 
                key={transaction._id}
                id={transaction._id}
                amount={transaction.amount}
                description={transaction.description}
                category={transaction.category}
                type={transaction.type}
                date={transaction.date}
                onDelete={handleDeleteTransaction}
              />
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">No transactions found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;