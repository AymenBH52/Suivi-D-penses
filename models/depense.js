const mongoose = require('mongoose');

const DepenseSchema = new mongoose.Schema({
  montant: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
 /*  category: {
    type: String,
    required: true,
  }, */
  description: {
    type: String,
    required: true,
  },
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }, 
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  tagId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
    required: true,
  }, 
});

const Depense = mongoose.model('Depense', DepenseSchema);

module.exports = Depense;
