import React, { useState } from 'react';
import Header from './components/Header';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Calendar, Check } from 'lucide-react';
import Footer from './components/Footer';
import axios from 'axios';


const Checkout = ({ cart = [], setCart }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: '',
    paymentMethod: 'card'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const initiateRazorpayPayment = async () => {
    try {
      // Create order on backend
      const orderResponse = await axios.post('/api/create-order', {
        amount: getCartTotal(),
        receipt: `booking_${Date.now()}`
      });

      const options = {
        key: rzp_test_G5uv0PRAgoyYhd, // Your Razorpay key
        amount: orderResponse.data.amount,
        currency: orderResponse.data.currency,
        name: "Beauty Salon",
        description: "Service Booking Payment",
        order_id: orderResponse.data.id,
        handler: async (response) => {
          try {
            // Verify payment on backend
            const verifyResponse = await axios.post('/api/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verifyResponse.data.status === 'success') {
              // Payment successful, proceed with booking
              handleSuccessfulBooking();
            }
          } catch (error) {
            // Handle verification failure
            alert('Payment verification failed');
            setIsSubmitting(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        notes: {
          address: 'Service Booking'
        },
        theme: {
          color: '#F472B6' // Pink color to match your design
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment initiation failed', error);
      alert('Failed to initiate payment');
      setIsSubmitting(false);
    }
  };

  const handleSuccessfulBooking = () => {
    // Save booking details
    saveBookingDetails();
    
    // Update UI
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Clear cart
    if (setCart) setCart([]);
  };

  const saveBookingDetails = async () => {
    try {
      await axios.post('/api/bookings', {
        ...formData,
        cart,
        totalAmount: getCartTotal()
      });
    } catch (error) {
      console.error('Failed to save booking details', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Handle different payment methods
    if (formData.paymentMethod === 'card') {
      // Proceed with Razorpay UPI/Card payment
      initiateRazorpayPayment();
    } else {
      // Cash payment - direct booking
      handleSuccessfulBooking();
    }
  };

  // Rest of the component remains the same as in the original code
  // ... (previous render methods)

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Existing form code */}
          <form onSubmit={handleSubmit}>
            {/* ... existing form fields ... */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-1">Payment Method *</label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <label className={`border rounded p-3 flex items-center cursor-pointer ${formData.paymentMethod === 'card' ? 'border-pink-500 bg-pink-50' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Pay with Card / UPI / NetBanking
                </label>
                <label className={`border rounded p-3 flex items-center cursor-pointer ${formData.paymentMethod === 'cash' ? 'border-pink-500 bg-pink-50' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Pay at Appointment
                </label>
              </div>
            </div>
            {/* Rest of the form */}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;