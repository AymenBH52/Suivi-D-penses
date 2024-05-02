const mongoose = require('mongoose');

const semanticColors = ['#32CD32', '#FF4500', '#2962FF', '#FFFF00', '#FFD700'];

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  color: {
    type: String,
    required: true,
    enumerable: true,
    enum: semanticColors.map((color) => color),
    default: semanticColors[2],
  },
});

tagSchema.set('timestamps', true);
module.exports = mongoose.model('Tag', tagSchema);
