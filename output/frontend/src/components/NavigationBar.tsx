import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FaSearch, 
  FaPlane, 
  FaTicketAlt, 
  FaUsers, 
  FaSignOutAlt, 
  FaUserCircle 
} from 'react-icons/fa';

const NavigationBar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/flights', label: 'Search Flight', icon: FaSearch },
    { path: '/booking', label: 'Booking', icon: FaPlane },
    { path: '/tickets', label: 'Search Ticket', icon: FaTicketAlt },
    { path: '/customers', label: 'Customer', icon: FaUsers },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-1">
            <FaPlane className="text-2xl mr-2" />
            <span className="text-xl font-bold">COBOL Airlines</span>
          </div>
          
          <div className="flex items-center space-x-1">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive(path)
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'hover:bg-blue-500 hover:shadow-sm'
                }`}
              >
                <Icon className="text-sm" />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-blue-500 px-4 py-2 rounded-lg">
              <FaUserCircle className="text-lg" />
              <div className="flex flex-col">
                <span className="text-xs font-medium">{user.firstName} {user.lastName}</span>
                <span className="text-xs opacity-80">{user.empId}</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <FaSignOutAlt />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;

