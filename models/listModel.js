const mongoose = require('mongoose');

const { Schema } = mongoose;

const listSchema = new Schema({
  title: {
    type: String,
    required: [true, 'A list must have a name'],
    minlength: [5, 'A list name must have more or equal to 5 characters'],
    maxlength: [40, 'A list name must have less or equal to 40 characters'],
  },
  body: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastModifiedAt: {
    type: Date,
    default: Date.now,
  },
});

listSchema.pre('findOneAndUpdate', function () {
  this.set({ lastModifiedAt: Date.now() });
});

const List = mongoose.model('List', listSchema);
module.exports = List;
