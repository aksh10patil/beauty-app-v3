import React , { useState } from 'react';
import appointment from '../../assets/appointment.webp'

const AppointmentForm = ( ) => {
  const [fomrData, setFormData] = useState( {
    
  })
}







function SignupAppointment() {
  return (
    <div className="flex flex-col md:flex-row bg-stone-50">
      {/* Left side - Form section */}
      <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
        <h2 className="text-4xl md:text-5xl font-light text-stone-800 mb-6">Sign up for appointment</h2>
        <p className="text-stone-600 mb-10">It just takes a few minutes to book a visit online.</p>
        
        <div className="space-y-6">
          {/* Service Dropdown */}
          <div className="relative">
            <select className="w-full p-3 bg-transparent border-b border-stone-300 outline-none appearance-none cursor-pointer text-stone-500">
              <option value="" disabled selected>Select Service</option>
              <option value="haircut">Haircut</option>
              <option value="coloring">Hair Coloring</option>
              <option value="styling">Hair Styling</option>
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          
          {/* Stylist Dropdown */}
          <div className="relative">
            <select className="w-full p-3 bg-transparent border-b border-stone-300 outline-none appearance-none cursor-pointer text-stone-500">
              <option value="" disabled selected>Select Stylist</option>
              <option value="stylist1">Jennifer</option>
              <option value="stylist2">Michael</option>
              <option value="stylist3">Sarah</option>
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          
          {/* Name and Phone in a row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 bg-transparent border-b border-stone-300 outline-none"
            />
            <input
              type="tel"
              placeholder="Your Phone"
              className="p-3 bg-transparent border-b border-stone-300 outline-none"
            />
          </div>
          
          {/* Date picker and time slot selectors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <input
                type="date"
                className="w-full p-3 bg-transparent border-b border-stone-300 outline-none text-stone-500"
                placeholder="Select Date"
              />
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
            
            {/* Morning/Afternoon selector */}
            <div className="relative">
              <select className="w-full p-3 bg-transparent border-b border-stone-300 outline-none appearance-none cursor-pointer text-stone-500">
                <option value="" disabled selected>Select</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            
            {/* Time selector */}
            <div className="relative">
              <select className="w-full p-3 bg-transparent border-b border-stone-300 outline-none appearance-none cursor-pointer text-stone-500">
                <option value="" disabled selected>Select</option>
                <option value="9am">9:00 AM</option>
                <option value="10am">10:00 AM</option>
                <option value="11am">11:00 AM</option>
                <option value="12pm">12:00 PM</option>
                <option value="1pm">1:00 PM</option>
                <option value="2pm">2:00 PM</option>
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Submit button */}
          <div className="mt-8">
            <button className="bg-rose-300 hover:bg-rose-400 text-white py-3 px-8 transition duration-300 uppercase tracking-wider text-sm font-medium">
              Make an appointment
            </button>
            <p className="mt-4 text-green-700 text-sm cursor-pointer hover:underline">Edit form</p>
          </div>
        </div>
      </div>
      
      {/* Right side - Image section */}
      <div className="w-full md:w-1/2 bg-amber-500">
        <img 
          src={appointment}
          alt="Woman making call me gesture" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default SignupAppointment;