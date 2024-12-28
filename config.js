// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors

// Load environment variables from the .env file
dotenv.config(); // Load environment variables from .env file

// Initialize express app
const app = express();

// Middleware to handle CORS
app.use(cors({ origin: '*' })); // Allow requests from all origins (use cautiously in production)

// Middleware to parse JSON requests
app.use(express.json());

// Connect to the MongoDB database
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in the .env file.');
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

// Connect to the database
connectDB();

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, your API is working!');
});

// Start the server
const PORT = process.env.PORT || 5000; // Default to port 5000 if PORT is not defined
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
