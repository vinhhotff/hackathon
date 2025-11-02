import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import FlightSearchPage from './pages/FlightSearchPage';
import BookingPage from './pages/BookingPage';
import TicketSearchPage from './pages/TicketSearchPage';
import CustomerManagementPage from './pages/CustomerManagementPage';
import ProtectedRoute from './components/ProtectedRoute';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <NavigationBar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/flights"
              element={
                <ProtectedRoute>
                  <FlightSearchPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tickets"
              element={
                <ProtectedRoute>
                  <TicketSearchPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customers"
              element={
                <ProtectedRoute>
                  <CustomerManagementPage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

