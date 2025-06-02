import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  PieChart, 
  Settings, 
  LogOut 
} from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="hidden md:flex md:w-64 flex-col bg-white border-r border-gray-200">
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800">FinTrack</h1>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          <NavLink 
            to="/api/homedashboard" 
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'text-white bg-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
            end
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </NavLink>
          <NavLink 
            to="transactions" 
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'text-white bg-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <Receipt className="mr-3 h-5 w-5" />
            Transactions
          </NavLink>
          <NavLink 
            to="budget" 
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'text-white bg-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <PieChart className="mr-3 h-5 w-5" />
            Budget
          </NavLink>
        </nav>
      </div>
      <div className="border-t border-gray-200 p-4">
        <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 w-full">
          <Settings className="mr-3 h-5 w-5" />
          Settings
        </button>
        <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 w-full">
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;