const express = require('express');
const app = express();
const List = require('./models/listModel');

const listsRouter = express.Router();

// CRUD operations for lists
// POST Create new list
listsRouter.post('/', async (req, res) => {
  try {
    const newItem = await List.create(req.body);
    console.log(`Created new item: `);
    console.log(newItem);
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
