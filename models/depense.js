const mongoose = require('mongoose');

const DepenseSchema = new mongoose.Schema({
    montant: {
        type: String,
    },
    date: {
        type: String,
        required: true 
    },
    category: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },

});


const Depense = mongoose.model('Depense', DepenseSchema);

module.exports = Depense;
