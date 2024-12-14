import { useNavigate } from 'react-router-dom';

const handlePostLogin = () => {
    const navigate = useNavigate();

    const authData = JSON.parse(localStorage.getItem('auth'));
    const role = authData?.data?.role;

    if (role === 'Teacher') {
        localStorage.setItem('teacherId', authData.data.userId); // Store teacherId
        navigate('/TeacherDashboard');
    } else if (role === 'Student') {
        navigate('/StudentDashboard');
    } else {
        alert('Unknown role detected. Please contact support.');
    }
};

export default handlePostLogin;
