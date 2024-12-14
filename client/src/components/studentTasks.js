import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/api/personal-tasks/student123')
      .then(response => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching tasks');
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Student Tasks</h1>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.title}</li> // Adjust according to your task model
        ))}
      </ul>
    </div>
  );
};

export default StudentTasks;
