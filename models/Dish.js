const mongoose = require('mongoose');
const { Schema } = mongoose;

const DishSchema = new Schema({
  dishName: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  allergens: {
    type: [String],
    default: []
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'AddCategory',
    required: true
  },
  menu: {
    type: Schema.Types.ObjectId,
    ref: 'Menu',
    required: true
  }
});

const Dish = mongoose.model('Dish', DishSchema);

module.exports = Dish;
