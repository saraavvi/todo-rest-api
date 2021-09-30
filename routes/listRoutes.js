const express = require('express');

const listController = require('../controllers/listController');

const router = express.Router();

// CRUD operations for lists
router
  .route('/')
  .post(listController.createList)
  .get(listController.getAllLists);

router
  .route('/:id')
  .get(listController.getList)
  .patch(listController.updateList)
  .delete(listController.deleteList);

module.exports = router;
