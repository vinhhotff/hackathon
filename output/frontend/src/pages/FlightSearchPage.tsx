import React, { useState, useEffect } from 'react';
import { searchFlights } from '../api/flightApi';
import { getAllFlights, getAllBookings, getAllTickets, Flight, Booking, Ticket, PaginationInfo } from '../api/dashboardApi';

interface FlightSearch {
  flightId: number;
  flightNum: string;
  flightDate: string;
  depTime: string;
  arrTime: string;
  airportDep: string;
  airportArr: string;
  availableSeats: number;
}

type TabType = 'flights' | 'bookings' | 'tickets';

const FlightSearchPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('flights');
  const [flightNum, setFlightNum] = useState('');
  const [flightDate, setFlightDate] = useState('');
  const [airportDep, setAirportDep] = useState('');
  const [airportArr, setAirportArr] = useState('');
  const [flights, setFlights] = useState<FlightSearch[]>([]);
  const [error, setError] = useState('');

  // Dashboard data
  const [dashboardFlights, setDashboardFlights] = useState<Flight[]>([]);
  const [dashboardBookings, setDashboardBookings] = useState<Booking[]>([]);
  const [dashboardTickets, setDashboardTickets] = useState<Ticket[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 0,
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  // Load dashboard data on mount and tab change
  useEffect(() => {
    loadDashboardData();
  }, [activeTab, currentPage]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const params = { page: currentPage, size: pageSize };
      
      if (activeTab === 'flights') {
        const response = await getAllFlights(params);
        setDashboardFlights((response.flights || []) as Flight[]);
        setPagination(response.pagination);
      } else if (activeTab === 'bookings') {
        const response = await getAllBookings(params);
        setDashboardBookings((response.bookings || []) as Booking[]);
        setPagination(response.pagination);
      } else if (activeTab === 'tickets') {
        const response = await getAllTickets(params);
        setDashboardTickets((response.tickets || []) as Ticket[]);
        setPagination(response.pagination);
      }
    } catch (err: any) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const params: any = {};
      if (flightNum) params.flightNum = flightNum;
      if (flightDate) params.flightDate = flightDate;
      if (airportDep) params.airportDep = airportDep;
      if (airportArr) params.airportArr = airportArr;

      const response = await searchFlights(params);
      setFlights(response.flights || []);
      
      if (response.flights.length === 0) {
        setError('No flights found matching criteria');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error searching flights');
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 0; i < pagination.totalPages; i++) {
      pages.push(i);
    }

    return (
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-700">
          Showing page {pagination.currentPage + 1} of {pagination.totalPages} 
          ({pagination.totalRecords} total records)
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Previous
          </button>
          {pages.map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 border rounded ${
                page === currentPage 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(Math.min(pagination.totalPages - 1, currentPage + 1))}
            disabled={currentPage >= pagination.totalPages - 1}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Search Flights</h1>
      
      <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Flight Number:</label>
            <input
              type="text"
              value={flightNum}
              onChange={(e) => setFlightNum(e.target.value)}
              maxLength={6}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Date (YYYY-MM-DD):</label>
            <input
              type="date"
              value={flightDate}
              onChange={(e) => setFlightDate(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Departure Airport:</label>
            <input
              type="text"
              value={airportDep}
              onChange={(e) => setAirportDep(e.target.value)}
              maxLength={4}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Arrival Airport:</label>
            <input
              type="text"
              value={airportArr}
              onChange={(e) => setAirportArr(e.target.value)}
              maxLength={4}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          ==&gt; {error}
        </div>
      )}

      {flights.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <h2 className="text-xl font-bold p-4 bg-blue-100">Search Results</h2>
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2">FID</th>
                <th className="px-4 py-2">TDEP</th>
                <th className="px-4 py-2">TLAND</th>
                <th className="px-4 py-2">DEP</th>
                <th className="px-4 py-2">LAND</th>
                <th className="px-4 py-2">PLACES</th>
                <th className="px-4 py-2">DATE</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight) => (
                <tr key={flight.flightId} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{flight.flightNum}</td>
                  <td className="px-4 py-2">{flight.depTime}</td>
                  <td className="px-4 py-2">{flight.arrTime}</td>
                  <td className="px-4 py-2">{flight.airportDep}</td>
                  <td className="px-4 py-2">{flight.airportArr}</td>
                  <td className="px-4 py-2">{flight.availableSeats}</td>
                  <td className="px-4 py-2">{flight.flightDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Dashboard Table with Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b">
          <nav className="flex -mb-px">
            <button
              onClick={() => {
                setActiveTab('flights');
                setCurrentPage(0);
              }}
              className={`px-6 py-3 font-medium text-sm border-b-2 ${
                activeTab === 'flights'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Flights ({pagination.totalRecords})
            </button>
            <button
              onClick={() => {
                setActiveTab('bookings');
                setCurrentPage(0);
              }}
              className={`px-6 py-3 font-medium text-sm border-b-2 ${
                activeTab === 'bookings'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Bookings
            </button>
            <button
              onClick={() => {
                setActiveTab('tickets');
                setCurrentPage(0);
              }}
              className={`px-6 py-3 font-medium text-sm border-b-2 ${
                activeTab === 'tickets'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Tickets
            </button>
          </nav>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <>
              {/* Flights Table */}
              {activeTab === 'flights' && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-blue-600 text-white">
                      <tr>
                        <th className="px-4 py-2">Flight ID</th>
                        <th className="px-4 py-2">Flight Number</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Departure Time</th>
                        <th className="px-4 py-2">Arrival Time</th>
                        <th className="px-4 py-2">Departure Airport</th>
                        <th className="px-4 py-2">Arrival Airport</th>
                        <th className="px-4 py-2">Total Passengers</th>
                        <th className="px-4 py-2">Airplane ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardFlights.map((flight) => (
                        <tr key={flight.flightId} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2">{flight.flightId}</td>
                          <td className="px-4 py-2">{flight.flightNum}</td>
                          <td className="px-4 py-2">{flight.flightDate}</td>
                          <td className="px-4 py-2">{flight.depTime}</td>
                          <td className="px-4 py-2">{flight.arrTime}</td>
                          <td className="px-4 py-2">{flight.airportDep}</td>
                          <td className="px-4 py-2">{flight.airportArr}</td>
                          <td className="px-4 py-2">{flight.totPass}</td>
                          <td className="px-4 py-2">{flight.airplaneId}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Bookings Table */}
              {activeTab === 'bookings' && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-blue-600 text-white">
                      <tr>
                        <th className="px-4 py-2">Transaction ID</th>
                        <th className="px-4 py-2">Purchase Date</th>
                        <th className="px-4 py-2">Purchase Time</th>
                        <th className="px-4 py-2">Price (€)</th>
                        <th className="px-4 py-2">Employee ID</th>
                        <th className="px-4 py-2">Client ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardBookings.map((booking) => (
                        <tr key={booking.achatId} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2">{booking.achatId}</td>
                          <td className="px-4 py-2">{booking.purchaseDate}</td>
                          <td className="px-4 py-2">{booking.purchaseTime}</td>
                          <td className="px-4 py-2">€{typeof booking.price === 'number' ? booking.price.toFixed(2) : booking.price}</td>
                          <td className="px-4 py-2">{booking.employeeid || (booking as any).employeeId}</td>
                          <td className="px-4 py-2">{booking.clientid || (booking as any).clientId}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tickets Table */}
              {activeTab === 'tickets' && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-blue-600 text-white">
                      <tr>
                        <th className="px-4 py-2">Ticket ID</th>
                        <th className="px-4 py-2">Transaction ID</th>
                        <th className="px-4 py-2">Client ID</th>
                        <th className="px-4 py-2">Flight ID</th>
                        <th className="px-4 py-2">Seat Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardTickets.map((ticket) => (
                        <tr key={ticket.ticketId} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2">{ticket.ticketId}</td>
                          <td className="px-4 py-2">{ticket.buyId}</td>
                          <td className="px-4 py-2">{ticket.clientId}</td>
                          <td className="px-4 py-2">{ticket.flightId}</td>
                          <td className="px-4 py-2">{ticket.seatNum}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              {renderPagination()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightSearchPage;
