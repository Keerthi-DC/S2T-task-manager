require('dotenv').config();
const cors = require("cors");
const mongoose = require('mongoose');
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");

const app = express();

const authRoutes = require("./routes/authRoutes");
const teacherTaskRoutes = require("./routes/teacherTask.routes"); // New route
const taskRoutes = require("./routes/taskRoutes"); // Correct import for task routes
const studentRoutes = require("./routes/studentRoute"); // Import the route

require("../database/db"); // Make sure this path is correct
require("./scheduler"); // Import the scheduler to trigger on server start
const authMiddleware = require('./middlewares/authMiddleware'); // Adjust the path as needed

app.use(cors({ origin: 'http://localhost:5173' })); 

app.use(morgan("dev"));

app.use(express.json());

app.use(
  session({
    secret: "4d5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4",
    resave: false,
    saveUninitialized: true
  })
);

app.use('/api/student-tasks', authMiddleware, studentRoutes); // Apply authentication middleware
app.use("/auth", authRoutes);
app.use("/api", taskRoutes); // Register task routes under /task
app.use("/teacher-tasks", teacherTaskRoutes); // Register teacher tasks under /teacher-tasks
 
// Mount the student routes under /api
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});


mongoose.connect("mongodb://localhost:27017/task-manager", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

app.use("/api", studentRoutes);
const port = 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
