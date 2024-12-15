const cors = require('cors');  // CORS middleware
const express = require('express'); // Express framework
const mongoDB = require('./db'); // MongoDB connection
const app = express(); // Create Express application
const PORT = 8080;

// Middleware for CORS
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: 'GET,POST', // Allowed methods
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept' // Allowed headers
}));

// Connect to MongoDB
mongoDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData.js"));
app.use('/api', require("./Routes/OrderData.js"));


// Default route for testing
app.get('/test', (req, res) => {
    res.send('Test endpoint is working!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
