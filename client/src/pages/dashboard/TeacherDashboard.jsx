import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.scss";

const classOptions = [
    { id: "1A", name: "1A" },
    { id: "1B", name: "1B" },
    { id: "1C", name: "1C" },
    { id: "1D", name: "1D" },
    { id: "2A", name: "2A" },
    { id: "2B", name: "2B" },
    { id: "2C", name: "2C" },
    { id: "3A", name: "3A" },
    { id: "3B", name: "3B" },
    { id: "3C", name: "3C" },
    { id: "4A", name: "4A" },
    { id: "4B", name: "4B" },
    { id: "4C", name: "4C" },
    { id: "4D", name: "4D" },
];

const TeacherDashboard = () => {
    const teacherId = "teacher123"; // Replace with actual teacher ID
    const [selectedClass, setSelectedClass] = useState("");
    const [taskName, setTaskName] = useState("");
    const [deadline, setDeadline] = useState("");
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    // Fetch tasks from the backend
    const fetchTasks = async () => {
        try {
            console.log("Fetching tasks for teacher ID:", teacherId); // Debugging
            const response = await axios.get(`http://localhost:4000/teacher-tasks/tasks/${teacherId}`);
            setTasks(response.data);
            console.log("Tasks fetched successfully:", response.data); // Debugging
        } catch (error) {
            console.error("Error fetching tasks:", error);
            alert("Failed to fetch tasks. Please check the console for details.");
        }
    };
    
    // Handle assigning a task
    const handleAssignTask = async () => {
        if (!taskName || !selectedClass || !deadline) {
            alert("Please fill in all fields!");
            return;
        }

        try {
            const payload = {
                teacherId,
                taskName,
                className: selectedClass,
                deadline,
            };

            console.log("Sending payload to backend:", payload); // Debugging
            const response = await axios.post("http://localhost:4000/teacher-tasks/tasks", payload);
            console.log("Task assigned successfully:", response.data); // Debugging

            alert(`Task "${taskName}" assigned to ${selectedClass} with a deadline of ${deadline}`);
            fetchTasks(); // Refresh the tasks list
        } catch (error) {
            console.error("Error assigning task:", error);
            alert("Failed to assign task. Please check the console for details.");
        }
    };

    return (
        <div className="dashboard">
            <div className="dashboard__left">
                <nav>
                    <a href="#assign-task"target="_blank">Assign Task</a>
                    <a href="/progress"target="_blank">View Progress</a>
                </nav>
            </div>
            <div className="dashboard__right">
                <h1>Teacher Dashboard</h1>
                <div className="dashboard__content">
                    <div className="form-section">
                        <label htmlFor="task">Task Name:</label>
                        <input
                            id="task"
                            type="text"
                            placeholder="Enter task name"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />

                        <label htmlFor="class">Class:</label>
                        <select
                            id="class"
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                        >
                            <option value="">Select a class</option>
                            {classOptions.map((cls) => (
                                <option key={cls.id} value={cls.id}>
                                    {cls.name}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="deadline">Deadline:</label>
                        <input
                            id="deadline"
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />

                        <button className="button" onClick={handleAssignTask}>
                            Assign Task
                        </button>
                    </div>

                    <div className="task-table">
                        <h2>Assigned Tasks</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Task Name</th>
                                    <th>Class</th>
                                    <th>Deadline</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.length > 0 ? (
                                    tasks.map((task, index) => (
                                        <tr key={index}>
                                            <td>{task.taskName}</td>
                                            <td>{task.className}</td>
                                            <td>{task.deadline}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">No tasks assigned yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
