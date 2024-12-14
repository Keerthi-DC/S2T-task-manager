import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./viewProgress.scss";

const classOptions = [
  { id: "1A", name: "1A" },
  { id: "1B", name: "1B" },
  { id: "1C", name: "1C" },
  { id: "1D", name: "1D" },
];

// Static student data for 30 students
const studentData = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
  progress: ["To-Do", "Doing", "Completed"][Math.floor(Math.random() * 3)],
}));

const ViewProgress = () => {
  const [selectedClass, setSelectedClass] = useState("");

  return (
    <div className="dashboard">
      <div className="dashboard__left">
        <nav>
          <a href="/dashboard">Assign Task</a>
          <a href="/view-progress">View Progress</a>
        </nav>
      </div>
      <div className="dashboard__right">
        <h1>View Progress</h1>
        <div className="dashboard__content">
          <label htmlFor="class">Select Class:</label>
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

          {selectedClass && (
            <div className="task-table">
              <h2>Tasks for {selectedClass}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Sl. No</th>
                    <th>Task Name</th>
                    <th>Deadline</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {["Task 1", "Task 2", "Task 3"].map((task, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{task}</td>
                      <td>{new Date().toLocaleDateString()}</td>
                      <td>
                        <Link to={`/task-details/${task}`} className="button">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProgress;
