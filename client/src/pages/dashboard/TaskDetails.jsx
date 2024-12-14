import React from "react";
import { useParams, Link } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Import necessary components
import "./taskDetails.scss";

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

// Static student data for 30 students
const studentData = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
  progress: ["To-Do", "Doing", "Completed"][Math.floor(Math.random() * 3)],
}));

const TaskDetails = () => {
  const { taskName } = useParams();  // Extract taskName from the URL

  const progressCounts = {
    "To-Do": studentData.filter((s) => s.progress === "To-Do").length,
    "Doing": studentData.filter((s) => s.progress === "Doing").length,
    "Completed": studentData.filter((s) => s.progress === "Completed").length,
  };

  const chartData = {
    labels: ["To-Do", "Doing", "Completed"],
    datasets: [
      {
        label: "Progress",
        data: Object.values(progressCounts),
        backgroundColor: ["#FF6384", "#FFCE56", "#36A2EB"],
      },
    ],
  };

  return (
    
    <div className="dashboard">
      {/* Left sidebar */}
      <div className="dashboard__left">
        <div className="dashboard__left__nav">
          <nav>
            <Link to="/dashboard">Assign Task</Link>
            <Link to="/view-progress">View Progress</Link>
          </nav>
        </div>
      </div>

      <div className="task-details__right">
        <h2>Task Details: {taskName}</h2>  {/* Display Task Name */}
        <div className="progress-chart">
          <h3>Progress Distribution</h3>
          <Pie data={chartData} /> {/* Pie chart component */}
        </div>

        <div className="progress-table">
          <h3>Student Progress</h3>
          <table>
            <thead>
              <tr>
                <th>Sl. No</th>
                <th>Student Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.progress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
