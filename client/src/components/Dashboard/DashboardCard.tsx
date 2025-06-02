import React, { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  className = '' 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow p-5 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-2xl font-semibold mt-2">{value}</p>
          
          {trend && (
            <div className="flex items-center mt-2">
              <span className={trend.isPositive ? 'text-green-500' : 'text-red-500'}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-gray-500 text-xs ml-1">from last month</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;