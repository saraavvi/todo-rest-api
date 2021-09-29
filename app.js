const express = require('express');
const logger = require('morgan');

const app = express();
app.use(logger('dev'));

//Later refactor into separate router
const List = require('./models/listModel');

const listsRouter = express.Router();

// CRUD operations for lists
// POST Create new list
listsRouter.post('/', async (req, res) => {
  try {
    const newItem = await List.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newItem,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
});

// GET (Read) Get all list
// GET (Read) Get list by id
// PATCH Update list by id
// DELETE Delete list by id

app.use('/api/lists', listsRouter);

module.exports = app;
