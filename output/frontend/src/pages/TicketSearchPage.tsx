import React, { useState } from 'react';
import { searchTickets, Ticket } from '../api/ticketApi';

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
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
      )}
    </div>
  );
};

export default TicketSearchPage;
