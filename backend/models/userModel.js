// Import Mongoose, a library for MongoDB object modeling
const mongoose = require('mongoose');

// Define a schema for the User collection in MongoDB
// A schema defines the structure and validation rules for documents in a collection
const userSchema = mongoose.Schema(
    {
        // Define the 'name' field
        name: {
            type: String, // The data type is String
            required: true, // This field is required (cannot be empty)
        },

        // Define the 'email' field
        email: {
            type: String, // The data type is String
            required: true, // This field is required (cannot be empty)
            unique: true, // Ensures that no two documents can have the same email
        },

        // Define the 'age' field
        age: {
            type: Number, // The data type is Number
            required: true, // This field is required (cannot be empty)
        },
    },
    {
        // Enable timestamps for the schema
        // This automatically adds two fields to each document:
        // - createdAt: The date and time when the document was created
        // - updatedAt: The date and time when the document was last updated
        timestamps: true,
    }
);

// Create a Mongoose model for the User collection
// A model is a constructor function that allows you to interact with the MongoDB collection
// The first argument ('User') is the name of the collection in the database
// The second argument (userSchema) is the schema that defines the structure of the documents
const User = mongoose.model('User', userSchema);

// Export the User model so it can be used in other parts of the application
module.exports = User;