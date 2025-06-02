import React from 'react';
import DashboardCard from '../components/Dashboard/DashboardCard';
import ChartComponent from '../components/Dashboard/ChartComponent';
import { useTransactions } from '../context/TransactionContext';
import { Wallet, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const { transactions, loading } = useTransactions();

  // Calculate summary statistics
  const calculateSummary = () => {
    if (!Array.isArray(transactions) || !transactions.length) {
      return { balance: 0, income: 0, expenses: 0 };
    }
    
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
      
    return {
      balance: income - expenses,
      income,
      expenses
    };
  };

  const { balance, income, expenses } = calculateSummary();

  // Prepare chart data
  const categoryData = React.useMemo(() => {
    if (!Array.isArray(transactions)) return [];
    
    const expensesByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc: { [key: string]: number }, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});
    
    return Object.keys(expensesByCategory).map(category => ({
      name: category,
      value: expensesByCategory[category]
    }));
  }, [transactions]);

  // Prepare monthly spending data
  const monthlyData = React.useMemo(() => {
    if (!Array.isArray(transactions)) return [];
    
    const months: { [key: string]: number } = {};
    transactions.forEach(t => {
      const date = new Date(t.date);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      if (t.type === 'expense') {
        months[monthYear] = (months[monthYear] || 0) + t.amount;
      }
    });
    
    return Object.keys(months).map(month => ({
      name: month,
      value: months[month]
    }));
  }, [transactions]);

  // Recent transactions for dashboard
  const recentTransactions = React.useMemo(() => {
    if (!Array.isArray(transactions)) return [];
    
    return [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [transactions]);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Current Balance"
          value={`$${balance.toFixed(2)}`}
          icon={<Wallet className="h-6 w-6 text-blue-600" />}
          trend={{ value: 5.2, isPositive: true }}
        />
        <DashboardCard
          title="Total Income"
          value={`$${income.toFixed(2)}`}
          icon={<TrendingUp className="h-6 w-6 text-green-600" />}
          trend={{ value: 8.1, isPositive: true }}
        />
        <DashboardCard
          title="Total Expenses"
          value={`$${expenses.toFixed(2)}`}
          icon={<TrendingDown className="h-6 w-6 text-red-600" />}
          trend={{ value: 3.4, isPositive: false }}
        />
        <DashboardCard
          title="Savings Rate"
          value={income > 0 ? `${Math.round((1 - expenses / income) * 100)}%` : '0%'}
          icon={<DollarSign className="h-6 w-6 text-purple-600" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartComponent 
          type="pie" 
          data={categoryData} 
          title="Expense Categories" 
        />
        <ChartComponent 
          type="line" 
          data={monthlyData} 
          title="Monthly Spending" 
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium">Recent Transactions</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentTransactions.length > 0 ? (
            recentTransactions.map(transaction => (
              <div key={transaction._id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.category} • {new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                  <p className={`font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="p-4 text-gray-500">No recent transactions</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;