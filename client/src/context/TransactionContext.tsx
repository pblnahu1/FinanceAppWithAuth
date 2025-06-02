import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Types
interface Transaction {
  _id: string;
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense';
  date: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  fetchTransactions: () => void;
  addTransaction: (transaction: Omit<Transaction, '_id'>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

// Create context
const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

// Provider component
export const TransactionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/transactions');
      // Ensure we're setting an array, fallback to empty array if response.data is invalid
      setTransactions(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch transactions');
      setTransactions([]); // Reset to empty array on error
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transaction: Omit<Transaction, '_id'>) => {
    try {
      const response = await axios.post('/api/transactions', transaction);
      setTransactions(prev => [...prev, response.data]);
    } catch (err) {
      setError('Failed to add transaction');
      console.error(err);
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await axios.delete(`/api/transactions/${id}`);
      setTransactions(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      setError('Failed to delete transaction');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider 
      value={{ 
        transactions, 
        loading, 
        error, 
        fetchTransactions,
        addTransaction,
        deleteTransaction
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

// Hook for using the context
export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};