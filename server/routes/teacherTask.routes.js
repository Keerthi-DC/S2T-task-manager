const express = require("express");
const router = express.Router();
const TeacherTask = require("../../database/model/teacherTask.model");

// POST /tasks - Assign a new task
router.post("/tasks", async (req, res) => {
    console.log("Request body received:", req.body);

    const { teacherId, taskName, className, deadline } = req.body;

    // Validate all fields+
    if (!teacherId || !taskName || !className || !deadline) {
        console.log("Validation failed. Missing fields:", req.body);
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Include teacherId when creating the new task
        const newTask = new TeacherTask({ teacherId, taskName, className, deadline });
        await newTask.save();
        console.log("Task saved successfully:", newTask);
        res.status(201).json(newTask);
    } catch (err) {
        console.error("Error saving task:", err);
        res.status(500).json({ message: "Failed to create task." });
    }
});
// GET /tasks/:teacherId - Fetch tasks for a specific teacher
router.get("/tasks/:teacherId", async (req, res) => {
    const { teacherId } = req.params;

    try {
        const tasks = await TeacherTask.find({ teacherId });
        console.log(`Tasks fetched for teacherId ${teacherId}:`, tasks); // Debugging
        res.status(200).json(tasks);
    } catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).json({ message: "Failed to fetch tasks." });
    }
});


module.exports = router;
