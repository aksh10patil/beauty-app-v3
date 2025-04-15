import React, { useState } from 'react';
import Header from './components/Header';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Calendar, Check } from 'lucide-react';
import Footer from './components/Footer';
import axios from 'axios'; // Make sure to install axios


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

  const [savedCartItems, setSavedCartItems] = useState([]);
  const [savedTotal, setSavedTotal] = useState(0);

const whatsapplink = () => {
  const phoneNumber = '7906427874';
  
  // Use saved cart items instead of current cart
  const cartItems = savedCartItems.length > 0 
    ? savedCartItems.map(item => `${item.serviceName} - ${item.optionName} (₹${item.price})`).join(', ')
    : "No items";
  
  const message = encodeURIComponent(
    `Hi, I want to make a Booking request:\n` +
    `Name: ${formData.name}\n` +
    `Phone: ${formData.phone}\n` +
    `Date: ${formData.date}, Time: ${formData.time}\n` +
    `Items: ${cartItems}\n` +
    `Total: ₹${savedTotal}\n` +
    `Notes: ${formData.notes || 'None'}`
  );
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(whatsappUrl, '_blank');
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

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  

  const handlePayment = async () => {
    const total = getCartTotal();

    try {
      // Create order
      //import env here backend - render  
      // using localhost 4000 to run locally 
    //  const orderResponse = await axios.post( 'http://localhost:4000/api'  + 'api/create-order', {
      const orderResponse = await axios.post( 'https://beauty-app-v3-9yge.onrender.com/create-order', {
        courseId: Math.floor(Math.random() * 10), // You can modify this as needed
        amount: total
      });

      const { id: order_id } = orderResponse.data;

      const options = {
        key: "rzp_live_UyjOJwt1fAn3qk", // Replace with your Razorpay key
        amount: total * 100, // Amount in paise
        currency: "INR",
        name: "Beauty At Home",
        description: "Transaction Intiating",
        order_id: order_id,
        handler: async function (response) {
          try {
            // Verify payment
           const verifyResponse = await axios.post( 'https://beauty-app-v3-9yge.onrender.com/verifyPayment', {
            //const verifyResponse = await axios.post(`${import.meta.env.NEW_BACKEND_URL_V}api/verifyPayment`, {
              order_id: order_id,
              payment_Id: response.razorpay_payment_id,
              signature: response.razorpay_signature
            });

            if (verifyResponse.data.success) {
              // Payment successful
              completeBooking();
            } else {
              // Payment verification failed
              alert("Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error", error);
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: "#F5A623"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment initialization error", error);
      alert("Failed to initialize payment");
    }
  };

  const completeBooking = async () => {
  try {
    // Prepare booking data
    const bookingData = {
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      },
      appointment: {
        date: formData.date,
        time: formData.time,
        notes: formData.notes
      },
      services: cart.map(item => ({
        serviceName: item.serviceName,
        optionName: item.optionName,
        price: item.price
      })),
      total: getCartTotal(),
      paymentMethod: formData.paymentMethod,
      status: 'pending'
    };

    // Save booking to database
    const response = await axios.post( 'https://beauty-app-v3-9yge.onrender.com/bookings', bookingData);
    
    // If successful, update UI
    console.log('Booking saved:', response.data);
    
    // Save cart items and total before clearing the cart
    setSavedCartItems([...cart]);
    setSavedTotal(getCartTotal());

    setIsSubmitting(false);
    setSubmitted(true);
    
    // Clear cart after successful submission
    if (setCart) setCart([]);
    
  } catch (error) {
    console.error('Error saving booking:', error);
    alert("Booking completed but there was an error saving your details. Please contact support.");
    setIsSubmitting(false);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // If payment method is card, initialize Razorpay
    if (formData.paymentMethod === 'card') {
      const razorpayLoaded = await initializeRazorpay();
      if (!razorpayLoaded) {
        alert("Razorpay SDK failed to load");
        setIsSubmitting(false);
        return;
      }
      handlePayment();
    } else {
      // For cash payment, directly complete booking
      completeBooking();
    }
  };



  if (submitted) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <div className="bg-green-100 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-4">
                <Check size={48} className="text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">Booking Confirmed!</h1>
              <p className="text-gray-600 mt-2">
                We've sent a confirmation email to {formData.email}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Booking reference: {Math.random().toString(36).substring(2, 10).toUpperCase()}
              </p>
            </div>
            
            <div className="border-t border-b py-4 my-6">
              <h2 className="text-xl font-semibold mb-4">Appointment Details</h2>
              <p className="flex items-center mb-2">
                <Calendar size={18} className="mr-2 text-pink-500" />
                <span>{formData.date} at {formData.time}</span>
              </p>
              <h3 className="font-medium mt-4 mb-2">Services booked:</h3>
              <ul className="list-disc pl-5">
                {savedCartItems.map(item => (
                  <li key={item.id}>
                    {item.serviceName} - {item.optionName} (₹{item.price})
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-center mt-8">
              <button 
                onClick={() => navigate('/services')}
                className="bg-pink-500 text-white py-2 px-6 rounded hover:bg-pink-600 transition"
              >
                Book Another Service
              </button>
            </div>
             
            <div className="text-center mt-8">
              <button 
                onClick={whatsapplink}
                className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-400 transition"
              >
               Link to Whatsapp
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back button */}
          <button 
            onClick={() => navigate('/services')} 
            className="flex items-center text-gray-600 mb-6 hover:text-pink-500 transition"
          >
            <ArrowLeft size={18} className="mr-1" />
            Back to Services
          </button>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Complete Your Booking</h1>
          
          {cart.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Add some services before proceeding to checkout</p>
              <button
                onClick={() => navigate('/services')}
                className="bg-pink-500 text-white py-2 px-6 rounded hover:bg-pink-600 transition"
              >
                Browse Services
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Order Summary */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                  <h2 className="text-xl font-semibold border-b pb-3 mb-4">Order Summary</h2>
                  
                  <ul className="divide-y">
                    {cart.map(item => (
                      <li key={item.id} className="py-3">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">{item.serviceName}</p>
                            <p className="text-sm text-gray-600">{item.optionName}</p>
                          </div>
                          <span className="font-medium">₹{item.price}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="border-t mt-4 pt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>₹{getCartTotal()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Booking Form */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold border-b pb-3 mb-6">Booking Information</h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-gray-700 mb-1">Full Name *</label>
                        <input 
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-300 ${errors.name ? 'border-red-500' : ''}`}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Email *</label>
                        <input 
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-300 ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Phone Number *</label>
                        <input 
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-300 ${errors.phone ? 'border-red-500' : ''}`}
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Preferred Date *</label>
                        <input 
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-300 ${errors.date ? 'border-red-500' : ''}`}
                        />
                        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Preferred Time *</label>
                        <input 
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          min="09:00"
                          max="18:00"
                          className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-300 ${errors.time ? 'border-red-500' : ''}`}
                        />
                        {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                        <p className="text-xs text-gray-500 mt-1">Business hours: 9:00 AM - 6:00 PM</p>
                      </div>
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
                            Pay with Card
                             / Upi / NetBanking
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
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-1">Special Requests (optional)</label>
                      <textarea 
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-300 h-24"
                        placeholder="Any allergies, preferences, or special requirements..."
                      ></textarea>
                    </div>
                    
                    <div className="border-t pt-6">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-lg font-medium bg-pink-500 text-white hover:bg-pink-600 transition flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          'Confirm Booking'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Checkout;
