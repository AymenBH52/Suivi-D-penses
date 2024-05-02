const router = require('express').Router();

const {
  createCategory,
  deleteCategory,
  getAllUserCategories,
  getCategoryById,
  updateCategory,
  deleteAllCategories,
} = require('../controllers/category.controller');

router.post('/', createCategory);
router.get('/user/:userId', getAllUserCategories);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);
router.delete('/', deleteAllCategories);

module.exports = router;
