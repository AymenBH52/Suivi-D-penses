const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const PORT = 4000 || process.env.PORT;
const app = express();

const authRouter = require('./routes/auth.routes.js');
const categoryRouter = require('./routes/category.routes');
const tagRouter = require('./routes/tag.routes');
const depenseRouter = require('./routes/depense.routes');
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/tags', tagRouter);
app.use('depenses', depenseRouter);

mongoose
  .connect('mongodb://127.0.0.1:27017/depenses')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });
