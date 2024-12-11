const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); 
const { MongoClient } = require('mongodb');


const app = express();
const port = 3000;



const tableSchema = new mongoose.Schema(
  {
    table_number: {
      type: String,
      required: true,
      unique: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Table = mongoose.model('Table', tableSchema);




// MongoDB URI for Mongoose and MongoClient
const mongoURI = 'mongodb+srv://ernan123:ernan123@restores.5sz4u.mongodb.net/?retryWrites=true&w=majority&appName=RestoRes';

// MongoDB Connection for Mongoose
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// User Schema definition
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create User Model
const User = mongoose.model('User', userSchema);

// Register Endpoint (Signup)
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ status: 'error', message: 'Email already in use' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({ status: 'success', message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

// Login Endpoint
app.post('/Login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: 'error', message: 'Invalid email or password' });
    }

    // Check password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: 'error', message: 'Invalid email or password' });
    }

    // Create JWT Token
    const token = jwt.sign({ userId: user._id }, 'yourSecretKey', { expiresIn: '1h' });

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

// Fetch items from the 'items' collection in MongoDB
const url = 'mongodb+srv://ernan123:ernan123@restores.5sz4u.mongodb.net/?retryWrites=true&w=majority&appName=RestoRes';
app.get('/api/items', async (req, res) => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('test'); // Assuming 'test' is your DB name
    const items = await db.collection('items').find().toArray();
    res.json(items);
    client.close();
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

app.get('/api/tables', async (req, res) => {
  try {
    // Fetch all tables from the database
    const tables = await Table.find();
    res.json(tables); // Return the table data as JSON
  } catch (error) {
    console.error('Error fetching tables:', error);
    res.status(500).json({ message: 'Failed to fetch table data' });
  }
});


// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
