const mongoose = require('mongoose');
const { Schema } = mongoose;

const RestaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  Whatsapp: {
    type: Number,
    default: ''
  },
  logo_dark: {
    type: String,
    default: ''
  },
  active: {
    type: Boolean,
    default: true
  }
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;
