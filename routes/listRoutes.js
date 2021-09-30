const express = require('express');

const List = require('../models/listModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const router = express.Router();

// CRUD operations for lists
// POST Create new list
router.post(
  '/',
  catchAsync(async (req, res, next) => {
    const newList = await List.create(req.body);
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
    const list = await List.findById(req.params.id);

    if (!list) {
      return next(new AppError('No list found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        list,
      },
    });
  })
);

// PATCH Update list by id
router.patch(
  '/:id',
  catchAsync(async (req, res, next) => {
    const updatedList = await List.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedList) {
      return next(new AppError('No list found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        list: updatedList,
      },
    });
  })
);

// DELETE Delete list by id
router.delete(
  '/:id',
  catchAsync(async (req, res, next) => {
    const list = await List.findByIdAndDelete(req.params.id);

    if (!list) {
      return next(new AppError('No list found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  })
);

module.exports = router;
