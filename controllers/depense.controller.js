const Depense = require('../models/depense');

const createDepense = async (req, res, next) => {
  const { montant, date, category, description, userId, categoryId, tagId } = req.body;

  const newDepense = new Depense({
    montant,
    date,
    description,
    userId,
    categoryId,
    tagId
  });

  try {
    const dep = await newDepense.save();
    res.status(201).json({ dep: dep });
  } catch (e) {
    res.status(400).json({ message: 'Depense not created: ' + e.message });
  }
};

const getAllUserDepenses = async (req, res, next) => {
  try {
    const userDepenses = await Depense.find({ userId: req.params.userId });
    res.status(200).json(userDepenses);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getDepenseById = async (req, res) => {
  try {
    const depense = await Depense.findById(req.params.id);
    if (!depense) {
      return res.status(404).json({ message: 'Depense not found' });
    }
    res.status(200).json(depense);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateDepense = async (req, res) => {
  try {
    const depense = await Depense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // To return the updated document
    );
    if (!depense) {
      return res.status(404).json({ message: 'Depense not found' });
    }
    res.status(200).json(depense);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteDepense = async (req, res) => {
  try {
    const depense = await Depense.findByIdAndDelete(req.params.id);
    if (!depense) {
      return res.status(404).json({ message: 'Depense not found' });
    }
    res.status(200).json({ message: 'Depense deleted' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteAllDepenses = async (req, res) => {
  try {
    await Depense.deleteMany();
    res.status(200).json({ message: 'All depenses deleted' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  createDepense,
  getAllUserDepenses,
  getDepenseById,
  updateDepense,
  deleteDepense,
  deleteAllDepenses,
};
