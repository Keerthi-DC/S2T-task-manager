import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiChevronLeft, BiChevronRight, BiTrash } from "react-icons/bi";
import "./dashboard.scss";

const StudentDashboard = () => {
  const [tasks, setTasks] = useState([]); // Assigned tasks
  const [personalTasks, setPersonalTasks] = useState([]); // Personal tasks
  const [newTask, setNewTask] = useState(""); // New task input
  const [deadline, setDeadline] = useState(""); // Deadline input
  const [status, setStatus] = useState("To-Do"); // Status dropdown
  const [loading, setLoading] = useState(false); // Loading state for tasks
  const [loadingStudentDetails, setLoadingStudentDetails] = useState(false); // Loading state for student details
  const [classId, setClassId] = useState(null); // Class ID
  const navigate = useNavigate();

  // Fetch student details and assigned tasks
  const fetchStudentDetails = async () => {
    setLoadingStudentDetails(true);
    try {
      const authData = JSON.parse(localStorage.getItem("auth"));
      if (!authData?.data?.classIds) {
        console.log("Class ID not found in localStorage.");
        alert("Class ID not found. Please log in.");
        return;
      }

      const classId = authData?.data?.classIds[0];
      setClassId(classId);
      fetchAssignedTasks(classId);
      fetchPersonalTasks();
    } catch (error) {
      console.error("Error fetching student details:", error);
      alert("Failed to fetch student details. Please try again.");
      navigate("/signin");
    } finally {
      setLoadingStudentDetails(false);
    }
  };

  // Fetch assigned tasks from the backend
 const fetchAssignedTasks = async (classId) => {
    try {
       const response = await axios.get(`http://localhost:4000/api/fetch-tasks/${classId}`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching assigned tasks:", error);
    }
  };

  // Fetch personal tasks from the backend
  const fetchPersonalTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/api/personal-tasks");
      setPersonalTasks(response.data);
    } catch (error) {
      console.error("Error fetching personal tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new personal task
  const handleAddPersonalTask = async () => {
    if (!newTask || !deadline) {
      alert("Task and deadline cannot be empty!");
      return;
    }
  
    const authData = JSON.parse(localStorage.getItem("auth"));
    const username = authData?.data?.username;
  
    const payload = { username, taskName: newTask, deadline, status, classId };
  
    try {
      const response = await axios.post("http://localhost:4000/api/personal-tasks", payload);
      setNewTask("");
      setDeadline("");
      fetchPersonalTasks(); // Refresh the task list after adding
    } catch (error) {
      console.error("Error adding personal task:", error);
      alert("Failed to add task.");
    }
  };
  
  
  
  // Update task status
  const handleStatusChange = async (taskName, direction, isPersonal = false) => {
    try {
      const authData = JSON.parse(localStorage.getItem("auth"));
      const userName = authData?.data?.userName;
  
      const tasksToUpdate = isPersonal ? personalTasks : tasks;
      const setTasksFn = isPersonal ? setPersonalTasks : setTasks;
      const updatedTasks = tasksToUpdate.map((task) => {
        if (task.taskName === taskName) {
          const statuses = ["To-Do", "In Progress", "Completed"];
          let currentIndex = statuses.indexOf(task.status);
          if (direction === "left" && currentIndex > 0) currentIndex--;
          else if (direction === "right" && currentIndex < statuses.length - 1)
            currentIndex++;
          task.status = statuses[currentIndex];
        }
        return task;
      });
      setTasksFn(updatedTasks);
      await axios.put("http://localhost:4000/api/update-task-status", {
        userName,
        taskName,
        status: updatedTasks.find((task) => task.taskName === taskName).status,
      });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };
  
  const handleDelete = async (taskName) => {
    try {
      const authData = JSON.parse(localStorage.getItem("auth"));
      const username = authData?.data?.username;
      await axios.delete(
        `http://localhost:4000/api/delete-task/${username}/${taskname}`
      );
      setTasks(tasks.filter((task) => task.taskName !== taskName));
      setPersonalTasks(personalTasks.filter((task) => task.taskName !== taskName));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const updateTaskStatus = async (username, taskName, newStatus) => {
    try {
      const response = await axios.put('http://localhost:4000/api/update-task-status', {
        username,
        taskName,
        status: newStatus,
      });
  
      console.log('Task status updated:', response.data);
      // Optionally, refresh the task list
    } catch (error) {
      console.error('Error updating task status:', error);
      alert('Failed to update task status. Please try again.');
    }
  };
  

  

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard__left">
        <nav>
          <a href="#dashboard">Dashboard</a>
          <a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    window.open("/notifications", "_blank"); // Opens the link in a new tab
  }}
>
  Notifications
</a>
<a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        navigate("/myprogress"); // Navigate to My Progress page
      }}
    >My progress</a>
        </nav>
      </div>
      <div className="dashboard__right">
        <h1>Student Dashboard</h1>

        <div className="task-container">
          <div className="task-table">
            <h4>Assigned Tasks</h4>
            {loading ? (
              <p>Loading tasks...</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Task Name</th>
                    <th>Status</th>
                    <th>Deadline</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                      <tr key={`${task.taskName}-${index}`}>
                        <td>{index + 1}</td>
                        <td>{task.taskName}</td>
                        <td>{task.status}</td>
                        <td>{task.deadline}</td>
                        <td>
                        <button
                      disabled={task.status === "To-Do"}
                      onClick={() => handleStatusChange(task.taskName, "left")}
                    >
                      <BiChevronLeft />
                    </button>
                    <button
                      disabled={task.status === "Completed"}
                      onClick={() => handleStatusChange(task.taskName, "right")}
                    >
                      <BiChevronRight />
                    </button>
                    <button
                      onClick={() => handleDelete(task.taskName, false)}
                    >
                      <BiTrash />
                    </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No tasks assigned yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          <div className="task-table">
            <h4>Personal Tasks</h4>
            <div className="form-section">
              <input
                type="text"
                placeholder="Enter personal task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <button className="button" onClick={handleAddPersonalTask}>
                Add Task
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Task Name</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {personalTasks.length > 0 ? (
                  personalTasks.map((task, index) => (
                    <tr key={`${task.taskName}-${index}`}>
                      <td>{index + 1}</td>
                      <td>{task.taskName}</td>
                      <td>{task.deadline}</td>
                      <td>{task.status}</td>
                      <td>
                        <button
                          disabled={task.status === "To-Do"}
                          onClick={() => handleStatusChange(task.id, "left")}
                        >
                          <BiChevronLeft />
                        </button>
                        <button
                          disabled={task.status === "Completed"}
                          onClick={() => handleStatusChange(task.id, "right")}
                        >
                          <BiChevronRight />
                        </button>
                        <button onClick={() => handleDelete(task.id)}>
                          <BiTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No personal tasks yet.</td>
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

export default StudentDashboard;
