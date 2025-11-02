import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavigationBar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-4">
          <Link to="/flights" className="hover:underline">Search Flight</Link>
          <Link to="/booking" className="hover:underline">Booking</Link>
          <Link to="/tickets" className="hover:underline">Search Ticket</Link>
          <Link to="/customers" className="hover:underline">Customer</Link>
        </div>
        <div className="flex items-center gap-4">
          <span>{user.firstName} {user.lastName} ({user.empId})</span>
          <button onClick={handleLogout} className="hover:underline">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;

