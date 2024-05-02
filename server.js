const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const PORT = 4000 || process.env.PORT;
const app = express();
const authRouter = require('./routes/auth.routes.js');

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);

mongoose
  .connect(process.env.MONGO_LOCAL_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });
