import React from 'react';
import { ArrowUpRight, ArrowDownRight, Trash2 } from 'lucide-react';

interface TransactionItemProps {
  id: string;
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense';
  date: string;
  onDelete: (id: string) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  id,
  amount,
  description,
  category,
  type,
  date,
  onDelete
}) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <div className="flex items-center">
        <div className={`p-2 rounded-full mr-4 ${type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
          {type === 'income' ? (
            <ArrowUpRight className="h-5 w-5 text-green-600" />
          ) : (
            <ArrowDownRight className="h-5 w-5 text-red-600" />
          )}
        </div>
        <div>
          <p className="font-medium text-gray-900">{description}</p>
          <p className="text-sm text-gray-500">{category}</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-6 text-right">
          <p className={`font-medium ${type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
            {type === 'income' ? '+' : '-'}${Math.abs(amount).toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
        <button 
          onClick={() => onDelete(id)} 
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;