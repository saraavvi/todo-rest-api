const express = require('express');
const List = require('../models/listModel');

const router = express.Router();

// CRUD operations for lists
// POST Create new list
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
  try {
    const allLists = await List.find({});
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

module.exports = router;
