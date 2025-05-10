// services/whatsappService.js
import axios from 'axios';

// Your WhatsApp Business API credentials
const WHATSAPP_API_URL = process.env.REACT_APP_WHATSAPP_API_URL || 'https://graph.facebook.com/v17.0/';
const WHATSAPP_PHONE_NUMBER_ID = process.env.REACT_APP_WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_ACCESS_TOKEN = process.env.REACT_APP_WHATSAPP_ACCESS_TOKEN;

/**
 * Send WhatsApp message using the WhatsApp Business API
 * @param {string} to - Recipient's phone number with country code (no + or spaces)
 * @param {string} templateName - Name of the template to use
 * @param {Array} components - Template components with parameters
 * @returns {Promise} - API response
 */
export const sendWhatsAppTemplate = async (to, templateName, components) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${WHATSAPP_API_URL}${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      headers: {
        'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: to,
        type: 'template',
        template: {
          name: templateName,
          language: {
            code: 'en'
          },
          components: components
        }
      }
    });
    
    console.log('WhatsApp message sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Send booking confirmation to customer
 * @param {Object} booking - Booking details
 * @returns {Promise} - API response
 */
export const sendCustomerBookingConfirmation = async (booking) => {
  // Format phone number (remove +, spaces, etc.)
  const formattedPhone = booking.customer.phone.replace(/\D/g, '');
  
  // Ensure it starts with country code (assuming India/91 if not present)
  const phoneWithCountryCode = formattedPhone.startsWith('91') ? 
    formattedPhone : `91${formattedPhone}`;
  
  // Format date for display
  const formattedDate = new Date(booking.appointment.date).toLocaleDateString('en-IN', {
    day: 'numeric', 
    month: 'long', 
    year: 'numeric'
  });
  
  // Create service list
  const servicesList = booking.services.map(s => 
    `${s.serviceName} - ${s.optionName}`).join(', ');
    
  // Prepare template components
  const components = [
    {
      type: 'header',
      parameters: [
        {
          type: 'text',
          text: 'Beauty At Home'
        }
      ]
    },
    {
      type: 'body',
      parameters: [
        {
          type: 'text',
          text: booking.customer.name
        },
        {
          type: 'text',
          text: formattedDate
        },
        {
          type: 'text',
          text: booking.appointment.time
        },
        {
          type: 'text',
          text: servicesList
        },
        {
          type: 'text',
          text: `₹${booking.total}`
        }
      ]
    }
  ];
  
  return sendWhatsAppTemplate(phoneWithCountryCode, 'booking_confirmation', components);
};

/**
 * Send new booking notification to business owner
 * @param {Object} booking - Booking details
 * @returns {Promise} - API response
 */
export const sendOwnerBookingNotification = async (booking) => {
  // Business owner's phone number
  const ownerPhone = process.env.REACT_APP_OWNER_PHONE_NUMBER || '917906427874';
  
  // Format date for display
  const formattedDate = new Date(booking.appointment.date).toLocaleDateString('en-IN', {
    day: 'numeric', 
    month: 'long', 
    year: 'numeric'
  });
  
  // Prepare template components
  const components = [
    {
      type: 'body',
      parameters: [
        {
          type: 'text',
          text: booking.customer.name
        },
        {
          type: 'text',
          text: booking.customer.phone
        },
        {
          type: 'text',
          text: formattedDate
        },
        {
          type: 'text',
          text: booking.appointment.time
        },
        {
          type: 'text',
          text: booking.services.map(s => `${s.serviceName} - ${s.optionName}`).join(', ')
        },
        {
          type: 'text',
          text: `₹${booking.total}`
        },
        {
          type: 'text',
          text: booking.paymentMethod
        },
        {
          type: 'text',
          text: booking.appointment.notes || 'None'
        }
      ]
    }
  ];
  
  return sendWhatsAppTemplate(ownerPhone, 'new_booking_notification', components);
};