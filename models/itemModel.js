const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  body: {
    type: String,
    required: [true, 'item body can not be empty'],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  orderInList: {
    type: Number,
  },
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
