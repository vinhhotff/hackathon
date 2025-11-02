import React, { useState, useEffect } from 'react';
import { searchTickets, Ticket } from '../api/ticketApi';
import { getAllTickets, Ticket as DashboardTicket, PaginationInfo } from '../api/dashboardApi';

const TicketSearchPage: React.FC = () => {
  const [ticketId, setTicketId] = useState('');
  const [clientId, setClientId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [flightNum, setFlightNum] = useState('');
  const [flightDate, setFlightDate] = useState('');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // All tickets table states
  const [allTickets, setAllTickets] = useState<DashboardTicket[]>([]);
  const [allTicketsLoading, setAllTicketsLoading] = useState(false);
  const [allTicketsPagination, setAllTicketsPagination] = useState<PaginationInfo>({
    currentPage: 0,
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
  });
  const [allTicketsCurrentPage, setAllTicketsCurrentPage] = useState(0);
  const allTicketsPageSize = 10;

  // Load all tickets on component mount and page change
  useEffect(() => {
    loadAllTickets();
  }, [allTicketsCurrentPage]);

  const loadAllTickets = async () => {
    setAllTicketsLoading(true);
    try {
      const response = await getAllTickets({ 
        page: allTicketsCurrentPage, 
        size: allTicketsPageSize 
      });
      setAllTickets(response.tickets || []);
      setAllTicketsPagination(response.pagination);
    } catch (err: any) {
      console.error('Error loading all tickets:', err);
    } finally {
      setAllTicketsLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const params: any = {};
      if (ticketId) params.ticketId = ticketId.trim();
      if (clientId) params.clientId = parseInt(clientId);
      if (firstName) params.firstName = firstName.trim();
      if (lastName) params.lastName = lastName.trim();
      if (flightNum) params.flightNum = flightNum.trim();
      if (flightDate) params.flightDate = flightDate;

      const response = await searchTickets(params);
      setTickets(response.tickets || []);
      
      if (response.tickets.length === 0) {
        setError('No tickets found matching criteria');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error searching tickets');
    } finally {
      setLoading(false);
    }
  };

  const handleAllTicketsPageChange = (newPage: number) => {
    setAllTicketsCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Search Tickets</h1>
      
      <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Ticket ID:</label>
            <input
              type="text"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              maxLength={10}
              className="w-full px-3 py-2 border rounded"
              placeholder="TKT0000001"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Client ID:</label>
            <input
              type="number"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="1001"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              maxLength={30}
              className="w-full px-3 py-2 border rounded"
              placeholder="Maxime"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              maxLength={30}
              className="w-full px-3 py-2 border rounded"
              placeholder="Duprat"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Flight Number:</label>
            <input
              type="text"
              value={flightNum}
              onChange={(e) => setFlightNum(e.target.value)}
              maxLength={6}
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
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          ==&gt; {error}
        </div>
      )}

      {tickets.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <h2 className="text-xl font-bold p-4 bg-blue-100">Search Results</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-2">TICKETID</th>
                  <th className="px-4 py-2">FIRSTNAME</th>
                  <th className="px-4 py-2">LASTNAME</th>
                  <th className="px-4 py-2">FLIGHTDATE</th>
                  <th className="px-4 py-2">DEPTIME</th>
                  <th className="px-4 py-2">ARRTIME</th>
                  <th className="px-4 py-2">FLIGHTNUM</th>
                  <th className="px-4 py-2">AIRPORTDEP</th>
                  <th className="px-4 py-2">AIRPORTARR</th>
                  <th className="px-4 py-2">SEATNUM</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.ticketId} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{ticket.ticketId}</td>
                    <td className="px-4 py-2">{ticket.firstName}</td>
                    <td className="px-4 py-2">{ticket.lastName}</td>
                    <td className="px-4 py-2">{ticket.flightDate}</td>
                    <td className="px-4 py-2">{ticket.depTime}</td>
                    <td className="px-4 py-2">{ticket.arrTime}</td>
                    <td className="px-4 py-2">{ticket.flightNum}</td>
                    <td className="px-4 py-2">{ticket.airportDep}</td>
                    <td className="px-4 py-2">{ticket.airportArr}</td>
                    <td className="px-4 py-2">{ticket.seatNum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* All Tickets Table with Pagination */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
        <h2 className="text-xl font-bold p-4 bg-gray-100 border-b">
          All Tickets ({allTicketsPagination.totalRecords} total)
        </h2>
        
        {allTicketsLoading ? (
          <div className="text-center py-8">Loading all tickets...</div>
        ) : allTickets.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No tickets found.</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buy ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seat Num</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allTickets.map((ticket) => (
                    <tr key={ticket.ticketId} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ticket.ticketId}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.buyId}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.clientId}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.flightId}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.seatNum}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Controls */}
            <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
              <button
                onClick={() => handleAllTicketsPageChange(allTicketsCurrentPage - 1)}
                disabled={allTicketsCurrentPage === 0}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {allTicketsPagination.currentPage + 1} of {allTicketsPagination.totalPages} 
                ({allTicketsPagination.totalRecords} records)
              </span>
              <button
                onClick={() => handleAllTicketsPageChange(allTicketsCurrentPage + 1)}
                disabled={allTicketsCurrentPage >= allTicketsPagination.totalPages - 1}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TicketSearchPage;
