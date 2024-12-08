// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// Load environment variables from the .env file
dotenv.config();

// Connect to the database
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("MONGO_URI is undefined");
    }
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Database connection error: ', err.message);
    process.exit(1); // Exit process with failure
  }
};

// Initialize express and connect to DB
const app = express();
connectDB();

// Use CORS middleware to handle cross-origin requests
app.use(cors({
  origin: 'https://20481-rahulyadav.github.io', // Replace this with your frontend URL or '*' to allow all origins
  methods: ['GET', 'POST', 'OPTIONS'],  // Allow specific HTTP methods
  allowedHeaders: ['Content-Type'],  // Allow specific headers
}));

// Middleware to handle preflight requests (OPTIONS method)
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.status(200).end();
});

// Middleware to parse JSON bodies
app.use(express.json());

// Define a route for GET requests to the root URL '/'
app.get('/', (req, res) => {
  res.send('Hello, your API is working!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
