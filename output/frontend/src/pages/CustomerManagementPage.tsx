import React, { useState, useEffect } from 'react';
import { getAllPassengers, createPassenger, updatePassenger, deletePassenger, Passenger, PassengerRequest } from '../api/passengerApi';

const CustomerManagementPage: React.FC = () => {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPassenger, setEditingPassenger] = useState<Passenger | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10
  });

  useEffect(() => {
    loadPassengers();
  }, [currentPage, searchTerm]);

  const loadPassengers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getAllPassengers(currentPage, 10, searchTerm || undefined);
      setPassengers(response.passengers);
      setPagination(response.pagination);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error loading passengers');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData(e.currentTarget);
    const data: PassengerRequest = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      country: formData.get('country') as string,
      zipCode: formData.get('zipCode') as string,
      telephone: formData.get('telephone') as string,
      email: formData.get('email') as string,
    };

    try {
      if (editingPassenger) {
        await updatePassenger(editingPassenger.clientId, data);
        setSuccess('Passenger updated successfully');
      } else {
        await createPassenger(data);
        setSuccess('Passenger created successfully');
      }
      setShowForm(false);
      setEditingPassenger(null);
      loadPassengers();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error saving passenger');
    }
  };

  const handleEdit = (passenger: Passenger) => {
    setEditingPassenger(passenger);
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  const handleDelete = async (clientId: number, name: string) => {
    if (!window.confirm(`Are you sure you want to delete passenger "${name}"?`)) {
      return;
    }

    setError('');
    try {
      await deletePassenger(clientId);
      setSuccess('Passenger deleted successfully');
      loadPassengers();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error deleting passenger');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPassenger(null);
    setError('');
    setSuccess('');
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Customer Management</h1>
        {!showForm && (
          <button
            onClick={() => {
              setShowForm(true);
              setEditingPassenger(null);
              setError('');
              setSuccess('');
            }}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            + Add New Customer
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <strong>Success:</strong> {success}
        </div>
      )}

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">
            {editingPassenger ? 'Edit Customer' : 'Add New Customer'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name *</label>
              <input
                type="text"
                name="firstName"
                defaultValue={editingPassenger?.firstName || ''}
                maxLength={30}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name *</label>
              <input
                type="text"
                name="lastName"
                defaultValue={editingPassenger?.lastName || ''}
                maxLength={30}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Address *</label>
              <input
                type="text"
                name="address"
                defaultValue={editingPassenger?.address || ''}
                maxLength={250}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City *</label>
              <input
                type="text"
                name="city"
                defaultValue={editingPassenger?.city || ''}
                maxLength={50}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country *</label>
              <input
                type="text"
                name="country"
                defaultValue={editingPassenger?.country || ''}
                maxLength={30}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Zip Code *</label>
              <input
                type="text"
                name="zipCode"
                defaultValue={editingPassenger?.zipCode || ''}
                maxLength={15}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Telephone *</label>
              <input
                type="text"
                name="telephone"
                defaultValue={editingPassenger?.telephone || ''}
                maxLength={18}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                name="email"
                defaultValue={editingPassenger?.email || ''}
                maxLength={100}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="col-span-2 flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                {editingPassenger ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(0);
          }}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2">Client ID</th>
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">City</th>
              <th className="px-4 py-2">Country</th>
              <th className="px-4 py-2">Telephone</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center">Loading...</td>
              </tr>
            ) : passengers.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                  No passengers found
                </td>
              </tr>
            ) : (
              passengers.map((passenger) => (
                <tr key={passenger.clientId} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{passenger.clientId}</td>
                  <td className="px-4 py-2">{passenger.firstName}</td>
                  <td className="px-4 py-2">{passenger.lastName}</td>
                  <td className="px-4 py-2">{passenger.email}</td>
                  <td className="px-4 py-2">{passenger.city}</td>
                  <td className="px-4 py-2">{passenger.country}</td>
                  <td className="px-4 py-2">{passenger.telephone}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(passenger)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(passenger.clientId, `${passenger.firstName} ${passenger.lastName}`)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t">
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
              {Array.from({ length: pagination.totalPages }, (_, i) => i).map(page => (
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
        )}
      </div>
    </div>
  );
};

export default CustomerManagementPage;

