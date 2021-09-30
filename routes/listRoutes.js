const express = require('express');
const List = require('../models/listModel');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

// CRUD operations for lists
// POST Create new list
router.post(
  '/',
  catchAsync(async (req, res, next) => {
    console.log(req.body.title);
    const newList = await List.create(req.body);
    console.log(newList);
    res.status(201).json({
      status: 'success',
      data: {
        list: newList,
      },
    });
  })
);

// GET (Read) Get all list
router.get(
  '/',
  catchAsync(async (req, res, next) => {
    const allLists = await List.find({});
    res.status(200).json({
      status: 'success',
      results: allLists.length,
      data: {
        lists: allLists,
      },
    });
  })
);

// GET (Read) Get list by id
router.get(
  '/:id',
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const list = await List.findById({ id });
    res.status(200).json({
      status: 'success',
      data: {
        list,
      },
    });
  })
);
// PATCH Update list by id
// DELETE Delete list by id

module.exports = router;
