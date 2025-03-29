import React, { useState } from 'react';

const AppointmentForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    service: '',
    stylist: '',
    name: '',
    phone: '',
    date: '',
    timeSlot: '',
    additionalInfo: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format the message for WhatsApp
    const message = `
*New Appointment Request*
Service: ${formData.service}
Stylist: ${formData.stylist}
Name: ${formData.name}
Phone: ${formData.phone}
Date: ${formData.date}
Time: ${formData.timeSlot}
Additional Info: ${formData.additionalInfo}
    `.trim();
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(`*Hello ${formData.name},*

Thank you for booking an appointment with us!  

 *Appointment Details:*  
- *Service:* ${formData.service}  
- *Stylist:* ${formData.stylist}  
- *Date:* ${formData.date}  
- *Time:* ${formData.timeSlot}  
- *Phone:* ${formData.phone}  

${formData.additionalInfo ? ` *Additional Info:* ${formData.additionalInfo}` : ''}

We look forward to seeing you soon!
If you have any questions or need to make changes, feel free to reach out.  

*Best regards,*  
Beauty At Home  
`);
    

    const phoneNumber = '917069990055';
    

    const whatsappURL = `https://wa.me/+${phoneNumber}?text=${encodedMessage}`;
    

    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="bg-[#b37c86] text-white p-10 rounded-lg">
      <h2 className="text-3xl font-serif mb-6">Book an appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select 
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="bg-transparent border-b border-white p-2 focus:outline-none"
          >
            <option value="">Select Service</option>
            <option value="Haircut">Haircut</option>
            <option value="Coloring">Coloring</option>
            <option value="Styling">Styling</option>
          </select>
          
          <select 
            name="stylist"
            value={formData.stylist}
            onChange={handleChange}
            className="bg-transparent border-b border-white p-2 focus:outline-none"
          >
            <option value="">Select Stylist</option>
            <option value="John">John</option>
            <option value="Emma">Emma</option>
            <option value="Michael">Michael</option>
          </select>
          
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name" 
            className="bg-transparent border-b border-white p-2 focus:outline-none" 
          />
          
          <input 
            type="text" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone" 
            className="bg-transparent border-b border-white p-2 focus:outline-none" 
          />
          
          <input 
            type="date" 
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="bg-transparent border-b border-white p-2 focus:outline-none" 
          />
          
          <select 
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleChange}
            className="bg-transparent border-b border-white p-2 focus:outline-none"
          >
            <option value="">Select Time</option>
            <option value="9:00 AM">9:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="1:00 PM">1:00 PM</option>
            <option value="2:00 PM">2:00 PM</option>
            <option value="3:00 PM">3:00 PM</option>
          </select>
          
          <select 
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            className="bg-transparent border-b border-white p-2 focus:outline-none"
          >
            <option value="">Additional Information</option>
            <option value="First time customer">First time customer</option>
            <option value="Prefer female stylist">Prefer female stylist</option>
            <option value="Prefer male stylist">Prefer male stylist</option>
          </select>
        </div>
        
        <button 
          type="submit"
          className="mt-6 bg-white text-gray-800 px-6 py-2 font-semibold tracking-wide border border-white hover:bg-gray-200"
        >
          MAKE AN APPOINTMENT
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;