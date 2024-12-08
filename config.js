// Import required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


app.use(cors(
  {
    origin:"https://tune-tonic-api.vercel.app/"
  }
));
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

// Initialize express app
const app = express();

// Define allowed origin for CORS
const allowedOrigin = 'https://20481-rahulyadav.github.io';

// app.use(cors({
//   origin: ['https://20481-rahulyadav.github.io', 'http://127.0.0.1:5500'], // Allow these origins
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
//   credentials: true, // If cookies or sessions are being used
// }));




// Middleware to parse JSON bodies
app.use(express.json());

// Example route for GET requests to the root URL '/'
app.get('/', (req, res) => {
  res.send('Hello, your API is working!');
});

// Example API route
app.get('/gfg-articles', (req, res) => {
  res.json('gfg-articles');
});

// Connect to the database
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
