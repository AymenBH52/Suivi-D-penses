const router = require('express').Router();

const {
  createDepense,
  deleteDepense,
  getAllUserDepenses,
  getDepenseById,
  updateDepense,
  deleteAllDepenses,
} = require('../controllers/depense.controller');

router.post('/', createDepense);
router.get('/user/:userId', getAllUserDepenses);
router.get('/:id', getDepenseById);
router.put('/:id', updateDepense);
router.delete('/:id', deleteDepense);
router.delete('/', deleteAllDepenses);

module.exports = router;
