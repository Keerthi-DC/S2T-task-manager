import './registration.scss';
import '../../styles/components/_button.scss';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signin, setLoading } from '../../redux/authSlice'; // Corrected import
import { useNavigate } from 'react-router-dom';


const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, error, isLoading } = useSelector((state) => state.auth);

  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const [loginError, setLoginError] = useState(null);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Dispatching signin action...');
  
    try {
      await dispatch(signin({ email: state.email, password: state.password })); // Dispatch signin action
  
      // Retrieve role from local storage
      const authData = JSON.parse(localStorage.getItem('auth')); // Auth object from local storage
      console.log('Auth Data from Local Storage:', authData);
  
      const role = authData?.data?.role; // Extract role correctly
      const classIds = authData?.data?.classIds;
      const username = authData?.data?.username;
      console.log('Extracted Role:', role);
      console.log('extracted class id:',classIds );
      console.log('extracted username:',username)
      if (role === 'Teacher') {
        console.log('Redirecting to TeacherDashboard...');
        navigate('/TeacherDashboard');
      } else if (role === 'Student') {
        console.log('Redirecting to StudentDashboard...');
        navigate('/StudentDashboard');
      } else {
        console.error('Unknown role detected!');
        setLoginError('Unknown role detected!');
      }
    } catch (error) {
      console.error('Error during login:', error.message || error);
      setLoginError(error.message || 'Login failed. Please try again.');
    }
  };
  
  

  useEffect(() => {
    console.log('Current User:', currentUser); // Debugging
    if (currentUser?.role) {
      navigate(currentUser.role === 'Teacher' ? '/TeacherDashboard' : '/StudentDashboard');
    }
  }, [currentUser, navigate]);

  return (
    <div className='signup-form'>
      <div className='signup-form__wrapper'>
        <form className='form' onSubmit={handleSubmit}>
          <h4>Sign In</h4>
          <div className='form-group'>
            <input
              type='email'
              name='email'
              value={state.email}
              placeholder='Enter Email'
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='password'
              value={state.password}
              placeholder='Enter Password'
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
          {loginError && <div className='warning'>{loginError}</div>}
          {error && <div className='error'>{error}</div>}
          <div className='form-group'>
            <button type="submit" className='button' disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
 