const mongoose = require('mongoose');

const { Schema } = mongoose;

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
  body: {
    type: String,
  },
});

listSchema.pre('save', function (next) {
  this.lastModifiedAt = Date.now;
  next();
});

const List = mongoose.model('List', listSchema);
module.exports = List;
