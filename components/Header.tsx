
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-dark-card shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
            Autonomous Status Reporting
            </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
