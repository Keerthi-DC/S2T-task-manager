const express = require("express");
const router = express.Router();
const Task = require("../../database/model/task.model");  // Import the task model

// Fetch tasks for a given classId
// For personal tasks
router.get("/personal-tasks", async (req, res) => {
    try {
      // Logic for fetching personal tasks
      const personalTasks = await Task.find({ assignedTo: req.userId });  // Adjust query based on your data
      res.json(personalTasks);
    } catch (error) {
      console.error("Error fetching personal tasks:", error);
      res.status(500).json({ error: "Server error while fetching personal tasks" });
    }
  });
  
  // For class tasks
  router.get("/class-tasks/:classId", async (req, res) => {
    const { classId } = req.params;
    try {
      const { classId } = req.params;
      const tasks = await Task.find({ className: classId });  // Assuming className is the field
      if (tasks.length === 0) {
        return res.status(404).json({ error: `No tasks found for class ${classId}` });
      }
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching class tasks:", error);
      res.status(500).json({ error: "Server error while fetching class tasks" });
      res.json({ message: `Tasks for class ${classId}` });  // Placeholder response for now
    }
  });
  

module.exports = router;
