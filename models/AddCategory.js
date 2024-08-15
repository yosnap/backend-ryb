const mongoose = require('mongoose');
const { Schema } = mongoose;

const AddCategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  orden: {
    type: Number,
    default: 0
  },
  menu: {
    type: Schema.Types.ObjectId,
    ref: 'Menu'
  }
});

const AddCategory = mongoose.model('AddCategory', AddCategorySchema);

module.exports = AddCategory;
