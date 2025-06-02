import React from 'react';

interface BudgetCardProps {
  category: string;
  spent: number;
  budget: number;
}

const BudgetCard: React.FC<BudgetCardProps> = ({ category, spent, budget }) => {
  // Calculate percentage
  const percentage = Math.min(Math.round((spent / budget) * 100), 100);
  
  // Determine color based on percentage
  let progressColor = 'bg-green-500';
  if (percentage > 75) progressColor = 'bg-red-500';
  else if (percentage > 50) progressColor = 'bg-yellow-500';

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-700">{category}</h3>
        <span className="text-xs font-medium text-gray-500">
          ${spent.toFixed(2)} / ${budget.toFixed(2)}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${progressColor}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-end mt-1">
        <span className="text-xs font-medium text-gray-500">
          {percentage}%
        </span>
      </div>
    </div>
  );
};

export default BudgetCard;