const List = require('../models/listModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.createNewList = catchAsync(async (req, res, next) => {
  const newList = await List.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      list: newList,
    },
  });
});

exports.getAllLists = catchAsync(async (req, res, next) => {
  const allLists = await List.find({});
  res.status(200).json({
    status: 'success',
    results: allLists.length,
    data: {
      lists: allLists,
    },
  });
});

exports.getList = catchAsync(async (req, res, next) => {
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
});

exports.updateList = catchAsync(async (req, res, next) => {
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
});

exports.deleteList = catchAsync(async (req, res, next) => {
  const list = await List.findByIdAndDelete(req.params.id);

  if (!list) {
    return next(new AppError('No list found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
