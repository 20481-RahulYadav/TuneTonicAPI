// Import required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables from the .env file
dotenv.config();

// Initialize express app
const app = express();

// Define allowed origins for CORS
const allowedOrigins = ['https://20481-rahulyadav.github.io', 'http://127.0.0.1:5500'];

// Use CORS middleware
app.use(cors({
  origin: allowedOrigins, // Allow specific origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies or sessions
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to the database
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error('MONGO_URI is undefined');
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

// Example route for GET requests to the root URL '/'
app.get('/', (req, res) => {
  res.send('Hello, your API is working!');
});

// Example API route
app.get('/gfg-articles', (req, res) => {
  res.json({ articles: ['Article 1', 'Article 2', 'Article 3'] });
});

// Connect to the database and start the server
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
