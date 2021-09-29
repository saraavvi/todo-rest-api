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
    required: [true, 'A list must have a name'],
    minlength: [5, 'A list name must have more or equal to 5 characters'],
    maxlength: [40, 'A list name must have less or equal to 40 characters'],
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
