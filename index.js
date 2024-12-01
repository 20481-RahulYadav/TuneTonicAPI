// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const router = require('./Routes/Routes');

// Load environment variables from the .env file
dotenv.config();

// Function to connect to the database
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
    process.exit(1);
  }
};
mongoose.set('debug', true);

// Initialize express
const app = express();

// Call the connectDB function to connect to the database
connectDB();



// Middleware to parse incoming JSON requests
app.use(express.json());

// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'API documentation for user operations',
    },
    servers: [
      {   
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./Routes/Routes.js'], // Path to the API docs (should point to routes where you define the API endpoints)
};
///

// Initialize swagger-jsdoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Serve swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Define a simple route for GET requests to the root URL
app.get('/', (req, res) => {
  res.send('Hello, your API is working!');
});

app.use('/api', router);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
