const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('./itemModel');

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
  items: [Item],
});

listSchema.pre('save', function (next) {
  this.lastModifiedAt = Date.now;
  next();
});

const List = mongoose.model('List', listSchema);
module.exports = List;
