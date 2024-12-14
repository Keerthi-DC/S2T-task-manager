const mongoose = require('mongoose');

// Define the task schema
const taskSchema = mongoose.Schema(
    {
        taskName: { 
            type: String, 
            required: true,  // Task name is required
        },
        className: { 
            type: [String], 
            required: true,  // Class(es) this task belongs to (array of strings)
        },
        deadline: { 
            type: [String], 
            required: true,  // Deadline (due date) for the task
        },
        status: {
            type: String,
            default: 'Not Started',  // Default status when task is created
            enum: ['Not Started', 'In Progress', 'Completed'],  // Allowed status values
        },
    },
    { timestamps: true }  // Automatically adds createdAt and updatedAt timestamps
);

// Create the model
const Task = mongoose.model('Task', taskSchema);

// Export the Task model to use it in routes
module.exports = Task;
