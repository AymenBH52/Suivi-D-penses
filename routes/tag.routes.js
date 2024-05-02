const router = require('express').Router();

const {
  createTag,
  deleteTag,
  getAllUserTags,
  getTagById,
  updateTag,
  deleteAllTags,
} = require('../controllers/tag.controller');

router.post('/', createTag);
router.get('/user/:userId', getAllUserTags);
router.get('/:id', getTagById);
router.put('/:id', updateTag);
router.delete('/:id', deleteTag);
router.delete('/', deleteAllTags);

module.exports = router;
