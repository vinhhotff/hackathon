import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateBooking, createBooking, BookingResponse } from '../api/bookingApi';

const BookingPage: React.FC = () => {
  const [clientId, setClientId] = useState('');
  const [flightNum, setFlightNum] = useState('');
  const [flightDate, setFlightDate] = useState('');
  const [passengerCount, setPassengerCount] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [validationData, setValidationData] = useState<BookingResponse | null>(null);
  const [bookingResult, setBookingResult] = useState<BookingResponse | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setValidated(false);
    setValidationData(null);
    setBookingResult(null);

    try {
      const request = {
        clientId: parseInt(clientId),
        flightNum: flightNum.trim(),
        flightDate: flightDate,
        passengerCount: parseInt(passengerCount)
      };

      const response = await validateBooking(request);
      setValidationData(response);
      setValidated(true);
    } catch (err: any) {
      if (err.isAuthError || err.response?.status === 401) {
        const errorMessage = err.message || err.response?.data?.message || 'Session expired. Please login again.';
        setError(errorMessage);
        setTimeout(() => {
          logout();
          navigate('/login');
        }, 3000);
      } else {
        setError(err.response?.data?.message || err.message || 'Error validating booking. Please check your input.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBooking = async () => {
    if (!validationData) return;

    setError('');
    setLoading(true);

    try {
      const request = {
        clientId: parseInt(clientId),
        flightNum: flightNum.trim(),
        flightDate: flightDate,
        passengerCount: parseInt(passengerCount)
      };

      const response = await createBooking(request);
      setBookingResult(response);
      setValidated(false);
    } catch (err: any) {
      if (err.isAuthError || err.response?.status === 401) {
        const errorMessage = err.message || err.response?.data?.message || 'Session expired. Please login again.';
        setError(errorMessage);
        setTimeout(() => {
          logout();
          navigate('/login');
        }, 3000);
      } else {
        setError(err.response?.data?.message || err.message || 'Error creating booking. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setClientId('');
    setFlightNum('');
    setFlightDate('');
    setPassengerCount('');
    setError('');
    setValidated(false);
    setValidationData(null);
    setBookingResult(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Book Flight</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
          {error.includes('Session expired') && (
            <p className="mt-2 text-sm">Redirecting to login page in 3 seconds...</p>
          )}
        </div>
      )}

      {bookingResult && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <h3 className="font-bold text-lg mb-2">✓ Booking Confirmed!</h3>
          <p><strong>Transaction ID:</strong> {bookingResult.transactionId}</p>
          <p><strong>Total Price:</strong> €{bookingResult.totalPrice.toFixed(2)}</p>
          <p><strong>Client:</strong> {bookingResult.clientName} (ID: {bookingResult.clientId})</p>
          <p><strong>Flight:</strong> {bookingResult.flightNum} on {bookingResult.flightDate}</p>
          <p><strong>Tickets Created:</strong> {bookingResult.tickets.length}</p>
          <div className="mt-3">
            <h4 className="font-semibold">Ticket Details:</h4>
            <ul className="list-disc list-inside">
              {bookingResult.tickets.map((ticket) => (
                <li key={ticket.ticketId}>
                  Ticket {ticket.ticketId} - Seat {ticket.seatNum}
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={handleReset}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Book Another Flight
          </button>
        </div>
      )}

      {!bookingResult && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl mb-4"></h2>
          
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Client ID:</label>
              <input
                type="number"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                required
                min="1"
                className="w-full px-3 py-2 border rounded"
                placeholder="1001"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Flight Number:</label>
              <input
                type="text"
                value={flightNum}
                onChange={(e) => setFlightNum(e.target.value)}
                maxLength={6}
                required
                className="w-full px-3 py-2 border rounded"
                placeholder="CB1104"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Flight Date (YYYY-MM-DD):</label>
              <input
                type="date"
                value={flightDate}
                onChange={(e) => setFlightDate(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Passenger Count:</label>
              <input
                type="number"
                value={passengerCount}
                onChange={(e) => setPassengerCount(e.target.value)}
                min="1"
                required
                className="w-full px-3 py-2 border rounded"
                placeholder="1"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Validating...' : 'Search & Validate'}
            </button>
          </form>
        </div>
      )}

      {validated && validationData && !bookingResult && (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl mb-4"> </h2>
          
          <div className="space-y-3 mb-4">
            <p><strong>Client:</strong> {validationData.clientName} (ID: {validationData.clientId})</p>
            <p><strong>Flight:</strong> {validationData.flightNum}</p>
            <p><strong>Flight Date:</strong> {validationData.flightDate}</p>
            <p><strong>Passenger Count:</strong> {validationData.passengerCount}</p>
            <p className="text-lg font-bold text-blue-600">
              <strong>Total Price:</strong> €{validationData.totalPrice?.toFixed(2) || '0.00'}
            </p>
            <p className="text-sm text-gray-600">(Unit price: €120.99 per ticket)</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleConfirmBooking}
              disabled={loading}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
            >
              {loading ? 'Processing...' : 'Confirm Booking'}
            </button>
            <button
              onClick={handleReset}
              disabled={loading}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 disabled:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
