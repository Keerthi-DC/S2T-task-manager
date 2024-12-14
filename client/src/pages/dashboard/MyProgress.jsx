import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Myprogress.scss";
ChartJS.register(ArcElement, Tooltip, Legend);

const MyProgress = () => {
  const [tasks] = useState([
    { taskName: "Task 1", status: "To-Do" },
    { taskName: "Task 2", status: "In Progress" },
    { taskName: "Task 3", status: "Completed" },
  ]);

  const taskStatusCount = {
    "To-Do": 0,
    "In Progress": 0,
    Completed: 0,
  };

  tasks.forEach((task) => {
    taskStatusCount[task.status]++;
  });

  // Pie chart data
  const data = {
    labels: ["To-Do", "In Progress", "Completed"],
    datasets: [
      {
        data: [taskStatusCount["To-Do"], taskStatusCount["In Progress"], taskStatusCount["Completed"]],
        backgroundColor: ["#FF6384", "#36A2EB", "#4CAF50"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#4CAF50"],
      },
    ],
  };

  return (
    <div className="dashboard">
      <div className="dashboard__left">
        <nav>
        <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/StudentDashboard");
            }}
          >
            Dashboard
          </a>
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
      <h1>My Progress</h1>

      <div className="task-container">
        <div className="task-table">
          <h4>My Tasks</h4>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Task Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <tr key={task.taskName}>
                    <td>{index + 1}</td>
                    <td>{task.taskName}</td>
                    <td>{task.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No tasks yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="progress-chart">
          <h4>Task Progress</h4>
          <Pie data={data} />
        </div>
      </div>
    </div>
    </div>
  );
};

export default MyProgress;
