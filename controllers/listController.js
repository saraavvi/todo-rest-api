const List = require('../models/listModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.createList = catchAsync(async (req, res, next) => {
  const newList = await List.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      list: newList,
    },
  });
});

exports.getAllLists = catchAsync(async (req, res, next) => {
  const allLists = await List.find({ user: req.user.id });
  res.status(200).json({
    status: 'success',
    results: allLists.length,
    data: {
      lists: allLists,
    },
  });
});

exports.getList = catchAsync(async (req, res, next) => {
  const list = await List.findOne({ id: req.params.id, user: req.user.id });

  if (!list) {
    return next(new AppError('No list found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      list,
    },
  });
});

exports.updateList = catchAsync(async (req, res, next) => {
  const updates = {};
  if (req.body.title) {
    updates.title = req.body.title;
  }
  if (req.body.body) {
    updates.body = req.body.body;
  }
  const updatedList = await List.findOneAndUpdate(
    { id: req.params.id, user: req.user.id },
    updates,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedList) {
    return next(new AppError('No list found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      list: updatedList,
    },
  });
});

exports.deleteList = catchAsync(async (req, res, next) => {
  const list = await List.findOneAndDelete({
    id: req.params.id,
    user: req.user.id,
  });

  if (!list) {
    return next(new AppError('No list found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
