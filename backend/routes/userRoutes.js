// Import the Express framework to create a router
// A router is used to define routes and handle HTTP requests
const express = require('express');

// Import Mongoose for MongoDB object modeling
// Mongoose provides a schema-based solution to model your application data and interact with MongoDB
const mongoose = require('mongoose');

// Import the User model from the '../models/userModel' file
// This model defines the structure and behavior of the User collection in MongoDB
const User = require('../models/userModel');

// Create a new router instance to define routes
// This router will handle all user-related routes (e.g., creating, reading, updating, and deleting users)
const router = express.Router();

// Route to create a new user
// This route handles POST requests to the root path ('/')
router.post('/', async (req, res) => {
    // Destructure the request body to extract name, email, and age
    const { name, email, age } = req.body;

    try {
        // Create a new user in the database using the User model
        // `User.create()` is a Mongoose method that inserts a new document into the User collection
        const userData = await User.create({ name, email, age });

        // Send a 201 (Created) response with the newly created user data
        // 201 status code indicates that the resource was successfully created
        res.status(201).json(userData);
    } catch (error) {
        // Log the error to the console for debugging
        console.error(error);

        // Send a 400 (Bad Request) response with the error message
        // 400 status code indicates that the request was invalid (e.g., missing required fields)
        res.status(400).json({ error: error.message });
    }
});

// Route to get all users
// This route handles GET requests to the root path ('/')
router.get('/', async (req, res) => {
    try {
        // Fetch all users from the database using the User model
        // `User.find()` is a Mongoose method that retrieves all documents from the User collection
        const showAll = await User.find();

        // Send a 200 (OK) response with the list of users
        // 200 status code indicates that the request was successful
        res.status(200).json(showAll);
    } catch (error) {
        // Log the error to the console for debugging
        console.error(error);

        // Send a 500 (Internal Server Error) response with the error message
        // 500 status code indicates that an unexpected error occurred on the server
        res.status(500).json({ error: error.message });
    }
});

// Route to get a single user by ID
// This route handles GET requests to the path '/:id', where `:id` is a dynamic parameter
router.get('/:id', async (req, res) => {
    // Extract the user ID from the request parameters
    const { id } = req.params;

    try {
        // Validate if the ID is a valid MongoDB ObjectID
        // MongoDB ObjectIDs are 24-character hexadecimal strings
        if (!mongoose.Types.ObjectId.isValid(id)) {
            // If the ID is invalid, send a 400 (Bad Request) response
            return res.status(400).json({ error: 'Invalid user ID format' });
        }

        // Find the user by ID in the database
        // `User.findById()` is a Mongoose method that retrieves a document by its ID
        const showSingle = await User.findById(id);

        // If the user is not found, send a 404 (Not Found) response
        if (!showSingle) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Send a 200 (OK) response with the user data
        res.status(200).json(showSingle);
    } catch (error) {
        // Log the error to the console for debugging
        console.error(error);

        // Send a 500 (Internal Server Error) response with the error message
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a user by ID
// This route handles DELETE requests to the path '/:id', where `:id` is a dynamic parameter
router.delete('/:id', async (req, res) => {
    // Extract the user ID from the request parameters
    const { id } = req.params;

    try {
        // Validate if the ID is a valid MongoDB ObjectID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            // If the ID is invalid, send a 400 (Bad Request) response
            return res.status(400).json({ error: 'Invalid user ID format' });
        }

        // Find and delete the user by ID in the database
        // `User.findByIdAndDelete()` is a Mongoose method that deletes a document by its ID
        const deleteSingleUser = await User.findByIdAndDelete(id);

        // If the user is not found, send a 404 (Not Found) response
        if (!deleteSingleUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Send a 200 (OK) response with a success message and the deleted user data
        res.status(200).json({ message: 'User deleted successfully', data: deleteSingleUser });
    } catch (error) {
        // Log the error to the console for debugging
        console.error(error);

        // Send a 500 (Internal Server Error) response with the error message
        res.status(500).json({ error: error.message });
    }
});

// Route to update a user by ID
// This route handles PATCH requests to the path '/:id', where `:id` is a dynamic parameter
router.patch('/:id', async (req, res) => {
    // Extract the user ID from the request parameters
    const { id } = req.params;

    // Destructure the request body to extract name, email, and age
    const { name, email, age } = req.body;

    try {
        // Validate if the ID is a valid MongoDB ObjectID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            // If the ID is invalid, send a 400 (Bad Request) response
            return res.status(400).json({ error: 'Invalid user ID format' });
        }

        // Find and update the user by ID in the database
        // `User.findByIdAndUpdate()` is a Mongoose method that updates a document by its ID
        const updateUser = await User.findByIdAndUpdate(
            id,
            { name, email, age }, // New data to update
            { new: true, runValidators: true } // Options: return the updated document and validate input
        );

        // If the user is not found, send a 404 (Not Found) response
        if (!updateUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Send a 200 (OK) response with the updated user data
        res.status(200).json(updateUser);
    } catch (error) {
        // Log the error to the console for debugging
        console.error(error);

        // Send a 500 (Internal Server Error) response with the error message
        res.status(500).json({ error: error.message });
    }
});

// Export the router to be used in other parts of the application
// This allows the router to be imported and mounted in the main server file
module.exports = router;