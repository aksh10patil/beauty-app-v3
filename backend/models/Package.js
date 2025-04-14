const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'blue'
  },
  features: [String],
  isPopular: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;