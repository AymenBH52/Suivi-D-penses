const Tag = require('../models/tag.model');

const createTag = async (req, res, next) => {
  const { name, description, userId, color } = req.body;

  if (!name || !userId)
    return res.status(400).json({ message: 'Content cannot be empty' });

  const newTag = new Tag({
    name,
    description,
    userId,
    color,
  });

  try {
    const tag = await newTag.save();
    res.status(201).json(tag);
  } catch (e) {
    res.status(400).json({ message: 'Tag not created: ' + e.message });
  }
};

const getAllUserTags = async (req, res, next) => {
  try {
    const tags = await Tag.find({ userId: req.params.userId });
    res.status(200).json(tags);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getTagById = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.status(200).json(tag);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body.tag);
    res.status(200).json(tag);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    res.status(200).json(tag);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteAllTags = async (req, res) => {
  try {
    await Tag.deleteMany();
    res.status(200).json({ message: 'All tags deleted' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  createTag,
  getAllUserTags,
  getTagById,
  updateTag,
  deleteTag,
  deleteAllTags,
};
