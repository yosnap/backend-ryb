const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartaSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String, // HTML data
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  hasVideo: {
    type: Boolean,
    default: false
  },
  hasSound: {
    type: Boolean,
    default: false
  },
  videoUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  image: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  likes: {
    type: Number,
    default: 0
  },
  dishType: {
    type: String,
    required: true
  },
  allergies: {
    type: [String],
    required: true
  },
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  }
});

const Carta = mongoose.model('Carta', CartaSchema);

module.exports = Carta;
