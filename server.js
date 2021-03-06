const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = process.env.MONGO_URI;

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }) // Adding new mongo url parser
  .then(() => console.log('Successfully connect to MongoDB...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/users', require('./routes/api/users'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const host = '0.0.0.0';
const port = process.env.PORT || 5000;

app.listen(port, host, () => console.log(`Server started on port ${port}`));
