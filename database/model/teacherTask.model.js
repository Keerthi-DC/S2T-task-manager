const mongoose = require("mongoose");

const teacherTaskSchema = new mongoose.Schema({
    teacherId: { type: String, required: true }, // Reference to the teacher
    taskName: { type: String, required: true },
    className: { type: String, required: true },
    deadline: { type: String, required: true },
}, { timestamps: true });

const TeacherTask = mongoose.model("TeacherTask", teacherTaskSchema);

module.exports = TeacherTask;



