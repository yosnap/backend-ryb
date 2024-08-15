const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  orden: {
    type: Number,
    default: 0
  },
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
