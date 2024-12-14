const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  classId: { type: String, required: false },
  taskName: { type: String, required: true },
  status: { type: String, default: "To-Do" },
  deadline: { type: Date, required: true },
});

module.exports = mongoose.model("studentTasks", taskSchema);
