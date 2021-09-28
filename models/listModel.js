const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastModifiedAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
  },
  items: [
    {
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
    },
  ],
});

listSchema.pre('save', function (next) {
  this.lastModifiedAt = Date.now;
  next();
});

const List = mongoose.model('List', listSchema);
module.exports = List;
