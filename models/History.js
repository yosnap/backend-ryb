const mongoose = require('mongoose');
const { Schema } = mongoose;

const HistorySchema = new Schema({
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
  name: String,
  orden: Number,
  menu: [{
    type: Schema.Types.ObjectId,
    ref: 'Menu'
  }],
  updatedAt: { type: Date, default: Date.now }
});

const History = mongoose.model('History', HistorySchema);

module.exports = History;
