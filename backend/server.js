// Import the Express framework to create a server
const express = require('express');

// Create an instance of the Express application
// This `app` object is used to configure the server, define routes, and start listening for requests
const app = express();

// Import Mongoose, a library for MongoDB object modeling
// Mongoose provides a schema-based solution to model your application data and interact with MongoDB
const mongoose = require('mongoose');

// Import dotenv to load environment variables from a .env file
// Environment variables are used to store sensitive or configuration-specific data (e.g., database URIs, API keys)
const dotenv = require('dotenv');

// Load environment variables from the .env file into `process.env`
// This allows you to access environment variables using `process.env.VARIABLE_NAME`
dotenv.config();


const cors = require("cors");
app.use(cors());

// Import the userRouter from the './routes/userRoutes' file
// This router will handle all user-related routes (e.g., creating, reading, updating, and deleting users)
const userRouter = require('./routes/userRoutes');

// Middleware to parse incoming JSON data in the request body
// This allows you to access the request body as `req.body` in your routes
// For example, if the client sends JSON data in the request body, it will be automatically parsed into a JavaScript object
app.use(express.json());

// Connect to the MongoDB database using the URI provided in the environment variables
// `process.env.URI` contains the MongoDB connection string (e.g., mongodb://localhost:27017/mydatabase)
mongoose
    .connect(process.env.URI)
    .then(() => {
        // If the connection is successful, log a success message
        console.log('Connected successfully to MongoDB');

        // Start the Express server and listen on the specified PORT (from environment variables)
        // If `process.env.PORT` is not defined, fall back to port 8000
        app.listen(process.env.PORT || 8000, (error) => {
            if (error) {
                // If there's an error starting the server, log the error
                console.log(error);
            }
            // Log a message indicating the server is running
            console.log('Server is running successfully at PORT:', process.env.PORT || 8000);
        });
    })
    .catch((error) => {
        // If there's an error connecting to MongoDB, log the error
        console.log('Error connecting to MongoDB:', error);
    });

// Use the userRouter for handling routes
// All routes defined in `userRouter` will be prefixed with the base path specified in `userRouter`
// For example, if `userRouter` defines a route like `/users`, it will be accessible at `/api/users` (if you prefix it with `/api`)
// If no prefix is specified, the routes will be accessible at the root path (`/`)
app.use(userRouter);