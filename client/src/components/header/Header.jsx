import './header.scss';
import '../../styles/components/_button.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutSuccess } from '../../redux/authSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.auth);

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(logoutSuccess());
        localStorage.removeItem('auth');
        navigate('/signin');
    };

    return (
        <div>
            <nav className='header'>
                <div className='header__logo'>
                    <Link to='/'>
                        <img src='src/images/logo.png' alt='Logo' className='logo' />
                        <h5>Task Manager</h5>
                    </Link>
                </div>
                <div className='header__buttons'>
                    {currentUser ? (
                        <button className='button' onClick={handleClick}>
                            Sign Out
                        </button>
                    ) : (
                        <>
                            <Link to='/signin' className='button'>Sign In</Link>
                            <Link to='/signup' className='button'>Sign Up</Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Header;
