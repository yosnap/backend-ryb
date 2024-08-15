const mongoose = require('mongoose');
const { Schema } = mongoose;

const AllergySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  }
});

const Allergy = mongoose.model('Allergy', AllergySchema);

module.exports = Allergy;
