const mongoose = require('mongoose');

require('dotenv').config({ path: './src/config/dev.env' });

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
