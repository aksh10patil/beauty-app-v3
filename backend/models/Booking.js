const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  customer: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  appointment: {
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    notes: {
      type: String
    }
  },
  services: [{
    serviceName: String,
    optionName: String,
    price: Number
  }],
  total: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'cash'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
