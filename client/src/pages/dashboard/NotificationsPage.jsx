import React from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.scss";

const NotificationsPage = () => {
  const navigate = useNavigate();

  // Static notifications data
  const notifications = [
    {
      id: 1,
      message: "Final exams are scheduled for next week. Please check the exam timetable.",
      date: "2024-12-12T10:00:00Z",
      taskName: "Exam Preparation",
    },
    {
      id: 2,
      message: "Reminder: Submit your project report by tomorrow!",
      date: "2024-12-13T18:00:00Z",
      taskName: "Project Submission",
    },
    {
      id: 3,
      message: "Campus recruitment drive starting this weekend. Check for details.",
      date: "2024-12-20T14:00:00Z",
      taskName: "Recruitment Drive",
    },
  ];

  // Function to check if the notification deadline is approaching
  const isDeadlineApproaching = (notificationDate) => {
    const deadline = new Date(notificationDate);
    const now = new Date();
    const diffInTime = deadline.getTime() - now.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24); // Convert milliseconds to days
    return diffInDays <= 1 && diffInDays > 0; // 1 day before deadline
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
          <a href="#notifications" className="active">
            Notifications
          </a>
        </nav>
      </div>
      <div className="dashboard__right">
        <h1>Notifications</h1>
        <ul>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <li key={notification.id}> {/* Use a unique key */}
                <div>
                  {notification.message} -{" "}
                  {new Date(notification.date).toLocaleDateString()}
                </div>
                {isDeadlineApproaching(notification.date) && (
                  <div className="warning">
                    ⚠️ {notification.taskName} needs to be completed before tomorrow!
                  </div>
                )}
              </li>
            ))
          ) : (
            <li>No notifications available.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NotificationsPage;
