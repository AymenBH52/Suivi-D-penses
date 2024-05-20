const router = require('express').Router();

const {
  createDepense,
  deleteDepense,
  getAllUserDepenses,
  getDepenseById,
  updateDepense,
  deleteAllDepenses,
  filterDepensesByDateRange,
  filterDepensesByMontant,
} = require('../controllers/depense.controller');

router.post('/', createDepense);
router.get('/user/:userId', getAllUserDepenses);
router.get('/:id', getDepenseById);
router.put('/:id', updateDepense);
router.delete('/:id', deleteDepense);
router.delete('/', deleteAllDepenses);

router.get('/user/:userId/date/:startDate/:endDate', filterDepensesByDateRange);
router.get('/user/:userId/montant/:sortBy', filterDepensesByMontant);
 
module.exports = router;
