import React, { useState } from 'react';
import logo from '../../assets/logo.webp'

const AppointmentScheduler = () => {
  const [formData, setFormData] = useState({
    service: '',
    stylist: '',
    name: '',
    phone: '',
    date: '',
    time: '',
    ampm: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Appointment request submitted! We will confirm shortly.');
  };

  return (
    <>
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="border border-gray-200 rounded-lg p-8 md:p-12 bg-white shadow-sm">
        <div className="text-center mb-10">
          <p className="uppercase tracking-wider text-gray-500 text-sm font-medium">
            SCHEDULE YOUR VISIT ONLINE
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-800 mt-4 mb-6">
            Take the next step and schedule<br className="hidden md:block"/> an appointment today
          </h1>
          <p className="text-gray-600">
            It just takes a few minutes to book a visit online.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Service Selection */}
            <div>
              <div className="relative">
                <select 
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-gray-500"
                  required
                >
                  <option value="" disabled>Select Service</option>
                  <option value="haircut">Haircut</option>
                  <option value="coloring">Hair Coloring</option>
                  <option value="styling">Styling</option>
                  <option value="facial">Facial</option>
                  <option value="massage">Massage</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Stylist Selection */}
            <div>
              <div className="relative">
                <select 
                  name="stylist"
                  value={formData.stylist}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-gray-500"
                  required
                >
                  <option value="" disabled>Select Stylist</option>
                  <option value="rebecca">Rebecca</option>
                  <option value="amanda">Amanda</option>
                  <option value="jessica">Jessica</option>
                  <option value="michael">Michael</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Name and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name" 
                className="w-full px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                required
              />
            </div>
            <div>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone" 
                className="w-full px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                required
              />
            </div>
          </div>
          
          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div>
              <div className="relative flex items-center">
                <input 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                  required
                />
              </div>
            </div>
            
            <div>
              <div className="relative">
                <select 
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-gray-500"
                  required
                >
                  <option value="" disabled>Select Time</option>
                  <option value="9:00">9:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="1:00">1:00</option>
                  <option value="2:00">2:00</option>
                  <option value="3:00">3:00</option>
                  <option value="4:00">4:00</option>
                  <option value="5:00">5:00</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <div className="relative">
                <select 
                  name="ampm"
                  value={formData.ampm}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-gray-500"
                  required
                >
                  <option value="" disabled>Select</option>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="text-center">
            <button 
              type="submit" 
              className="bg-rose-400 hover:bg-rose-500 text-white font-medium uppercase tracking-wider py-3 px-8 inline-block transition duration-300"
            >
              MAKE AN APPOINTMENT
            </button>
            <p className="mt-3 text-gray-500 text-sm">
            </p>
          </div>
        </form>
      </div>
                    
    </div>


    <div className="bg-white text-gray-800 px-10 py-16">       
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        <div className="flex flex-col items-center md:items-start">
          <img src={logo} alt="Beauty at Home Logo" className="w-40 mb-4" />
          <p className="text-lg font-serif">Stay Updated</p>
          <p className="text-sm text-gray-600 mt-2">
            Beauty At Home | 2025 - All Rights Reserved <br />
            Developed By Visualize Digital
          </p>
        </div>
        

        {/* Pages Section */}
        <div>
          <h3 className="text-gray-500 uppercase text-sm tracking-wide mb-4">Pages</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-pink-600">About Us</a></li>
            <li><a href="#" className="hover:text-pink-600">Our Team</a></li>
            <li><a href="#" className="hover:text-pink-600">Our Services</a></li>
            <li><a href="#" className="hover:text-pink-600">Contacts</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-gray-500 uppercase text-sm tracking-wide mb-4">Contacts</h3>
          <p className="text-gray-700">
            Rampur Garden, Civil Line, Bareilly, Uttar Pradesh
          </p>
          <p className="mt-2 text-gray-700">
            Mon – Fri: 9:30 am – 8:00 pm <br />
            Sat – Sun: Closed
          </p>
          <p className="mt-3 text-lg font-semibold text-green-700">
            +91-7906427874
          </p>
          <p className="text-gray-600">info@beautyathome.co.in</p>

          {/* Social Media */}
          <div className="flex space-x-4 mt-4">
            <a href="#"><i className="fab fa-instagram text-2xl"></i></a>
            <a href="#"><i className="fab fa-x-twitter text-2xl"></i></a>
            <a href="#"><i className="fab fa-facebook text-2xl"></i></a>
          </div>
        </div>
      </div>
      </div>

                  
    </>

  


        



  );

};

export default AppointmentScheduler;