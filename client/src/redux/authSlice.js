import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import history from '../history'; // Assuming history is configured separately

const initialUser = localStorage.getItem('auth')
  ? JSON.parse(localStorage.getItem('auth'))
  : null;

const initialState = {
  isLoading: false,
  currentUser: initialUser,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    registerSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logoutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearAuth: (state) => {
      state.currentUser = null;
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const {
  loginFailure,
  loginSuccess,
  registerFailure,
  registerSuccess,
  logoutSuccess,
  setLoading,
  clearAuth,
} = authSlice.actions;

export default authSlice.reducer;

// Register user action
export const register = (user) => async (dispatch) => {
  try {
    dispatch(setLoading(true)); // Set loading state to true
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post(
      'http://localhost:4000/auth/register',
      user,
      config
    );

    if (response) {
      dispatch(registerSuccess(response.data));
      toast.success('Registration successful');
      history.push('/signin'); // Navigate to the sign-in page after successful registration
    } else {
      dispatch(registerFailure('Registration failed'));
      toast.error('Registration failed');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occurred during registration';
    dispatch(registerFailure(errorMessage));
    toast.error(errorMessage);
  } finally {
    dispatch(setLoading(false)); // Ensure loading state is reset
  }
};

export const signin = (user) => async (dispatch) => {
  try {
    dispatch(setLoading(true)); // Start loading state

    const userData = {
      email: user.email,
      password: user.password,
    };

    const response = await axios.post('http://localhost:4000/auth/signin', userData);

    if (response && response.data) {
      // Save user data to local storage
      localStorage.setItem('auth', JSON.stringify(response.data));
      dispatch(loginSuccess(response.data)); // Dispatch success with user data
    } else {
      throw new Error('Invalid response from the server');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occurred during login';
    dispatch(loginFailure(errorMessage)); // Dispatch failure
    throw error; // Re-throw for error handling
  } finally {
    dispatch(setLoading(false)); // Reset loading state
  }
};


// Logout action
export const logout = () => (dispatch) => {
  localStorage.removeItem('auth'); // Clear auth data from local storage
  dispatch(logoutSuccess());
  toast.success('Logged out successfully');
  history.push('/signin'); // Redirect to the sign-in page
};
