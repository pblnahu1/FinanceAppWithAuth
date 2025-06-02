import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  return (
    <header className="bg-white border-b border-gray-200 z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
          <div className="flex items-center md:hidden ml-2">
            <h1 className="text-xl font-semibold text-gray-800">Finance App</h1>
          </div>
          <div className="flex items-center">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="p-1 rounded-full text-gray-500 hover:text-gray-600 focus:outline-none">
                <Bell className="h-6 w-6" />
              </button>
              <div className="ml-3 relative">
                <div>
                  <button className="max-w-xs flex items-center text-sm rounded-full text-gray-500 hover:text-gray-600 focus:outline-none">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {showMobileMenu && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a
              href="/"
              className="block pl-3 pr-4 py-2 border-l-4 border-blue-500 text-base font-medium text-blue-700 bg-blue-50"
            >
              Dashboard
            </a>
            <a
              href="/transactions"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            >
              Transactions
            </a>
            <a
              href="/budget"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            >
              Budget
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;