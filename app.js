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
    const newList = await List.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        list: newList,
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
listsRouter.get('/', async (req, res) => {
  try {
    const allLists = await List.find({});
    console.log(allLists);
    res.status(200).json({
      status: 'success',
      results: allLists.length,
      data: {
        lists: allLists,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
});
// GET (Read) Get list by id
// PATCH Update list by id
// DELETE Delete list by id

app.use('/api/lists', listsRouter);

module.exports = app;
