const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },   // Name of the task
  className: { type: String, required: true },  // Name of the class associated with the task
  deadline: { type: String, required: true },   // Deadline for the task
  teacherId: { type: String, required: true },  // Reference to the teacher's ID
}, { timestamps: true });  // Automatically add createdAt and updatedAt fields

// Create the model based on the task schema
const Task = mongoose.model("Task", taskSchema);

// Export the model for use in other parts of the app
module.exports = Task;
