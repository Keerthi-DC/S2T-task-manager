import './registration.scss';
import '../../styles/components/_button.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/authSlice';
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // Impor

const classOptions = [
  { id: '1A', name: '1A' },
  { id: '1B', name: '1B' },
  { id: '1C', name: '1C' },
  { id: '1D', name: '1D' },
  { id: '2A', name: '2A' },
  { id: '2B', name: '2B' },
  { id: '2C', name: '2C' },
  { id: '3A', name: '3A' },
  { id: '3B', name: '3B' },
  { id: '3C', name: '3C' },
  { id: '4A', name: '4A' },
  { id: '4B', name: '4B' },
  { id: '4C', name: '4C' },
  { id: '4D', name: '4D' },
];

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const [state, setState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    role: 'Student',
    classIds: [],
  });

  const [warning, setWarning] = useState(false);
  const [passwordWarning, setPasswordWarning] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((prevState) => {
      if (name === 'role' && value === 'Teacher') {
        return {
          ...prevState,
          [name]: value,
          classIds: [], // Reset class IDs for Teacher
        };
      } else {
        return {
          ...prevState,
          [name]: value,
        };
      }
    });
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    let updatedClassIds = [];

    if (state.role === 'Student') {
      if (e.target.checked) {
        updatedClassIds = [value];
      }
      setWarning(false);
    } else {
      const currentClassIds = [...state.classIds];
      if (e.target.checked) {
        currentClassIds.push(value);
      } else {
        const index = currentClassIds.indexOf(value);
        if (index > -1) currentClassIds.splice(index, 1);
      }
      updatedClassIds = currentClassIds;
    }

    setState((prevState) => ({
      ...prevState,
      classIds: updatedClassIds,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/auth/register",
        state
      );
      console.log("Registration successful:", response.data);

      if (response.data.success) {
        // Redirect based on role
        if (state.role === "Teacher") {
          navigate("/TeacherDashboard");
        } else {
          navigate("/StudentDashboard"); // Adjust if needed
        }
      }
    } catch (error) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : error
      );
    }
  };
  
  return (
    <div className="signup-form">
      <div className="signup-form__wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <h4>Sign up</h4>

          <div className="form-group">
            <input
              type="text"
              placeholder="Enter Name"
              name="username"
              value={state.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={state.email}
              placeholder="Enter Email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Role:</label>
            <select name="role" value={state.role} onChange={handleChange}>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
          </div>

          <div className="form-group">
            <label>Select Class ID(s):</label>
            <div className="checkbox-group">
              {classOptions.map((classOption) => (
                <label key={classOption.id} className={state.role === 'Teacher' ? 'teacher-checkbox' : ''}>
                  <input
                    type="checkbox"
                    value={classOption.id}
                    checked={state.classIds.includes(classOption.id)}
                    onChange={handleCheckboxChange}
                  />
                  {classOption.name}
                </label>
              ))}
            </div>
          </div>

          {warning && (
            <div className="warning">
              Students can only select one class at a time!
            </div>
          )}

          <div className="form-group">
            <input
              type="password"
              name="password"
              value={state.password}
              placeholder="Enter Password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              value={state.confirmPassword}
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
          </div>

          {passwordWarning && (
            <div className="warning">
              Passwords do not match! Please check again.
            </div>
          )}

          <div className="form-group">
            <button className="button">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
