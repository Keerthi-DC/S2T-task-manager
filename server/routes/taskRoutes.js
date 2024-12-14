const express = require('express');
const studentTasks = require("../../database/model/taskModel"); // Adjust path if needed
const router = express.Router();


const { fetchTeacherTasks } = require("../controllers/taskController");


router.post("/api/personal-tasks", async (req, res) => {
  const { username, taskName, deadline, status, classId } = req.body;

  try {
    const task = new Task({ username, taskName, deadline, status, classId });
    await task.save();
    res.status(201).json(task); // Return 201 for successful creation
  } catch (error) {
    res.status(500).json({ error: "Error saving task", details: error.message });
  }
});


// Route to fetch tasks for a specific class
router.get("/fetch-tasks/:classId", async (req, res) => {
  try {
    const classId = req.params.classId;  // Get the classId from the URL
    const tasks = await fetchTeacherTasks(classId);  // Fetch tasks for the class
    
    if (tasks.message) {
      return res.status(404).json({ message: tasks.message });  // Return a message if no tasks are found
    }
    
    res.json(tasks);  // Respond with the fetched tasks if available
  } catch (error) {
    res.status(500).send("Error fetching tasks.");
  }
});
router.get("/api/fetch-tasks/:userName/:classId", async (req, res) => {
  const { username, classId } = req.params;
  const tasks = await Task.find({ username, classId });
  res.send(tasks);
});
router.post("/api/personal-tasks", async (req, res) => {
  const { username, taskName, deadline, status, classId } = req.body;
  const task = new Task({ username, taskName, deadline, status, classId });
  await task.save();
  res.send(task);
});
router.put("/api/update-task-status", async (req, res) => {
  const { username, taskName, status } = req.body;
  await Task.updateOne({ username, taskName }, { status });
  res.send({ success: true });
});
router.delete("/api/delete-task/:userName/:taskName", async (req, res) => {
  const { username, taskName } = req.params;
  await Task.deleteOne({ username, taskName });
  res.send({ success: true });
});



module.exports = router;
