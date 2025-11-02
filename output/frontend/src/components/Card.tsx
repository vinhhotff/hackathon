import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, icon }) => {
  return (
    <div className={`bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden ${className} animate-slide-up`}>
      {title && (
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            {icon && <span className="text-blue-600">{icon}</span>}
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          </div>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

