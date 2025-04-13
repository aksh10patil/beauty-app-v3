import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, X, RefreshCw, Calendar, Clock, User, Phone, Mail, FileText, DollarSign } from 'lucide-react';
import Header from './components/Header';
import AdminPanel2 from './AdminPanel2';

const AdminPanel = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pending, accepted, rejected

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      
      // Get the token from localStorage or wherever you store it after admin login
      const token = localStorage.getItem('adminToken');
      
      const response = await axios.get('https://beauty-app-v3-9yge.onrender.com//bookings',
          
        //`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/bookings`, 
        {
          headers: {
            'x-auth-token': token
          }
        }
      );
      
      if (Array.isArray(response.data)) {
        setBookings(response.data);
      } else {
        console.error('Expected array but got:', response.data);
        setError('Received unexpected data format from server');
        setBookings([]);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err.response?.data || err.message);
      setError('Failed to fetch bookings. Please try again.');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };


  const updateBookingStatus = async (id, status) => {
    try {
      // Get the token from localStorage or wherever you store it after admin login
      const token = localStorage.getItem('adminToken');
      
      await axios.put(
        `https://beauty-app-v3-9yge.onrender.com/bookings/${id}`, 
        { status },
        {
          headers: {
            'x-auth-token': token
          }
        }
      );
      
      // Update local state to reflect the change
      setBookings(bookings.map(booking => 
        booking._id === id ? { ...booking, status } : booking
      ));
    } catch (err) {
      console.error('Error updating booking status:', err.response?.data || err.message);
      alert('Failed to update booking status. Please try again.');
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  useEffect(() => {
    console.log("Bookings type:", typeof bookings, bookings);
  }, [bookings]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadge = (status) => (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );

  return (
    <>
   

      <Header />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Appointment Requests</h1>
            <button 
              onClick={fetchBookings}
              className="flex items-center bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
            >
              <RefreshCw size={18} className="mr-2" />
              Refresh
            </button>
          </div>

          {/* Filter tabs */}
          <div className="flex border-b mb-6">
            <button 
              className={`px-4 py-2 font-medium ${filter === 'all' ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-600'}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-4 py-2 font-medium ${filter === 'pending' ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-600'}`}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button 
              className={`px-4 py-2 font-medium ${filter === 'accepted' ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-600'}`}
              onClick={() => setFilter('accepted')}
            >
              Accepted
            </button>
            <button 
              className={`px-4 py-2 font-medium ${filter === 'rejected' ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-600'}`}
              onClick={() => setFilter('rejected')}
            >
              Rejected
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading bookings...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center">
              {error}
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">No appointments found</h2>
              <p className="text-gray-500">
                {filter === 'all' 
                  ? 'There are no appointments in the system yet.' 
                  : `There are no ${filter} appointments.`}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredBookings.map(booking => (
                <div key={booking._id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-wrap justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">{booking.customer.name}</h2>
                      <div className="flex items-center text-gray-600 mt-1">
                        <Calendar size={16} className="mr-1" />
                        <span>{booking.appointment.date}</span>
                        <Clock size={16} className="ml-4 mr-1" />
                        <span>{booking.appointment.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {getStatusBadge(booking.status)}
                      {booking.status === 'pending' && (
                        <div className="ml-4 flex space-x-2">
                          <button 
                            onClick={() => updateBookingStatus(booking._id, 'accepted')}
                            className="bg-green-500 text-white p-1 rounded hover:bg-green-600"
                            title="Accept"
                          >
                            <Check size={20} />
                          </button>
                          <button 
                            onClick={() => updateBookingStatus(booking._id, 'rejected')}
                            className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                            title="Reject"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                        <User size={16} className="mr-2" />
                        Customer Details
                      </h3>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="flex items-center text-sm mb-1">
                          <Phone size={14} className="mr-2 text-gray-500" />
                          {booking.customer.phone}
                        </p>
                        <p className="flex items-center text-sm mb-1">
                          <Mail size={14} className="mr-2 text-gray-500" />
                          {booking.customer.email}
                        </p>
                        {booking.appointment.notes && (
                          <p className="flex items-start text-sm mt-2">
                            <FileText size={14} className="mr-2 text-gray-500 mt-1" />
                            <span className="flex-1">{booking.appointment.notes}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Services Booked</h3>
                      <div className="bg-gray-50 p-3 rounded">
                        <ul className="divide-y divide-gray-200">
                          {booking.services.map((service, index) => (
                            <li key={index} className="py-2 flex justify-between text-sm">
                              <span>{service.serviceName} - {service.optionName}</span>
                              <span className="font-medium">₹{service.price}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex justify-between font-medium pt-2 mt-2 border-t">
                          <span className="flex items-center">
                            <DollarSign size={14} className="mr-1" />
                            Total
                          </span>
                          <span>₹{booking.total}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Payment Method: {booking.paymentMethod === 'card' ? 'Online Payment' : 'Pay at Appointment'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPanel;