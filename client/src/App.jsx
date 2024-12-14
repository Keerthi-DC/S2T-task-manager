import './App.css';
import Header from './components/header/Header';
import Signin from './components/registration/Signin';
import Signup from './components/registration/Signup';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './styles/main.scss';
import Home from './pages/home/Home';
import TeacherDashboard from './pages/dashboard/TeacherDashboard'; // New Teacher Dashboard
import StudentDashboard from './pages/dashboard/StudentDashboard'; // New Student Dashboard
import NotificationsPage from './pages/dashboard/NotificationsPage'; // Import NotificationsPage
import RequireAuth from './utils/RequireAuth';
import { useSelector } from 'react-redux';
import ViewProgress from "./pages/dashboard/ViewProgress";
import TaskDetails from "./pages/dashboard/TaskDetails";
import MyProgress from "./pages/dashboard/MyProgress";
function App() {
  const { auth } = useSelector((state) => ({ ...state }));

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/signin'
            element={
              auth.currentUser && auth.currentUser.token 
                ? <Navigate to={auth.currentUser.role === 'Teacher' ? '/TeacherDashboard' : '/StudentDashboard'} />
                : <Signin />
            }
          />

          <Route
            path='/signup'
            element={!auth.currentUser ? <Signup /> : <Navigate to={auth.currentUser.role === 'Teacher' ? '/TeacherDashboard' : '/StudentDashboard'} />}
          />
          
          <Route
            path='/TeacherDashboard'
            element={
              <RequireAuth>
                <TeacherDashboard />
              </RequireAuth>
            }
          />
          <Route
            path='/StudentDashboard'
            element={
              <RequireAuth>
                <StudentDashboard />
              </RequireAuth>
            }
          />
          <Route
            path='/notifications'
            element={
              <RequireAuth>
                <NotificationsPage />
              </RequireAuth>
            }
          />
          <Route path="/progress"
           element={
           <ViewProgress />
           } 
           />
           <Route path="/task-details/:taskName" element={<TaskDetails />} />
           <Route path="/myprogress" element={<MyProgress />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
