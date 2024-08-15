const mongoose = require('mongoose');
const { Schema } = mongoose;

const MenuSchema = new Schema({
  term_id: {
    type: Schema.Types.ObjectId,
    default: function() { return this._id; },
    required: true
  },
  name: {
    type: String,
    required: true
  },
  orden: {
    type: Number,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  menu_activo: {
    type: Boolean,
    default: false
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
  }
}, { 
  versionKey: false, // Exclude __v
  toObject: { 
    virtuals: true, 
    transform: (doc, ret) => {
      // Remove _id and id from the response
      delete ret._id;
      delete ret.id; // Remove any additional `id` field if present
      return ret;
    }
  },
  toJSON: { 
    virtuals: true, 
    transform: (doc, ret) => {
      // Remove _id and id from the response
      delete ret._id;
      delete ret.id; // Remove any additional `id` field if present
      return ret;
    }
  }
});

// Ensure term_id reflects the _id
MenuSchema.pre('save', function(next) {
  this.term_id = this._id;
  next();
});

const Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;
