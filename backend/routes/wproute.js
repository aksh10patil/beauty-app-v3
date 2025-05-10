// Import required libraries
const express = require('express');
const router = express.Router();
require('dotenv').config(); // For managing environment variables

// Configure Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const salonOwnerPhone = process.env.SALON_OWNER_PHONE; // The salon owner's phone number
const client = require('twilio')(accountSid, authToken);

// Route to send SMS notifications
router.post('/send-sms-notifications', async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      appointmentDate,
      appointmentTime,
      services,
      total,
      paymentMethod
    } = req.body;

    // Format services for SMS
    const servicesList = services
      .map(service => `${service.serviceName} - ${service.optionName}`)
      .join(', ');

    // Format date to be more readable
    const formattedDate = new Date(appointmentDate).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // 1. Send confirmation SMS to the customer
    const customerMessage = await client.messages.create({
      body: `Beauty At Home: Your appointment is confirmed for ${formattedDate} at ${appointmentTime}. Services: ${servicesList}. Total: ₹${total} (${paymentMethod === 'card' ? 'Paid' : 'Pay at appointment'}). Contact us: ${salonOwnerPhone} for any changes.`,
      from: twilioPhoneNumber,
      to: customerPhone
    });

    // 2. Send notification to salon owner
    const ownerMessage = await client.messages.create({
      body: `New Booking Alert: ${customerName} has booked for ${formattedDate} at ${appointmentTime}. Services: ${servicesList}. Total: ₹${total} (${paymentMethod === 'card' ? 'Paid' : 'Cash on delivery'}). Customer phone: ${customerPhone}`,
      from: twilioPhoneNumber,
      to: salonOwnerPhone
    });

    console.log('SMS sent successfully to customer:', customerMessage.sid);
    console.log('SMS sent successfully to owner:', ownerMessage.sid);

    res.status(200).json({ success: true, message: 'SMS notifications sent successfully' });
  } catch (error) {
    console.error('Error sending SMS notifications:', error);
    res.status(500).json({ success: false, message: 'Failed to send SMS notifications', error: error.message });
  }
});

// Export the router
module.exports = router;