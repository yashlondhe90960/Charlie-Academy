

// export default Navbar;
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/NavBar.css'; // Import the CSS file
import {
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  Person as ProfileIcon,
  AddCircle as AddCourseIcon,
  ExitToApp as LogoutIcon,
  LockOpen as LoginIcon,
  HowToReg as RegisterIcon,
  MenuBook as CoursesIcon // Example icon for courses if you add a courses page
} from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    setAuth({ token: null, role: null }); // Reset auth context
    navigate('/'); // Redirect to the landing page
  };

  return (
    <nav className="sunset-navbar">
      <div className="navbar-container">
      <div className="navbar-logo"  style={{ color: 'black' }} onClick={() => navigate('/')}>
  <span className="logo-icon" >🌅</span> Charlie Academy
</div>
        <ul className="navbar-menu">
          {auth.role === 'INSTRUCTOR' && (
            <>
              <li className="navbar-item">
                <button onClick={() => navigate('/instructor-dashboard')}>
                  <DashboardIcon className="nav-icon" /> Dashboard
                </button>
              </li>
              <li className="navbar-item">
                <button onClick={() => navigate('/instructor-profile')}>
                  <ProfileIcon className="nav-icon" /> Profile
                </button>
              </li>
              <li className="navbar-item">
                <button onClick={() => navigate('/add-course')}>
                  <AddCourseIcon className="nav-icon" /> Add Course
                </button>
              </li>
              <li className="navbar-item">
                <button onClick={handleLogout}>
                  <LogoutIcon className="nav-icon" /> Logout
                </button>
              </li>
            </>
          )}
          {auth.role === 'USER' && (
            <>
              <li className="navbar-item">
                <button onClick={() => navigate('/user-dashboard')}>
                  <DashboardIcon className="nav-icon" /> Dashboard
                </button>
              </li>
              <li className="navbar-item">
                <button onClick={() => navigate('/user-profile')}>
                  <ProfileIcon className="nav-icon" /> Profile
                </button>
              </li>
              <li className="navbar-item">
                <button onClick={handleLogout}>
                  <LogoutIcon className="nav-icon" /> Logout
                </button>
              </li>
            </>
          )}
          {!auth.token && (
            <>
              <li className="navbar-item">
                <button onClick={() => navigate('/login')}>
                  <LoginIcon className="nav-icon" /> Login
                </button>
              </li>
              <li className="navbar-item">
                <button onClick={() => navigate('/register')}>
                  <RegisterIcon className="nav-icon" /> Register
                </button>
              </li>
            </>
          )}
          {/* Example: Add a Courses link for all logged-in users */}
          {auth.token && (
            <li className="navbar-item">
              <button onClick={() => navigate('/courses')}> {/* Adjust route as needed */}
                <CoursesIcon className="nav-icon" /> Courses
              </button>
            </li>
          )}
          {/* Always show the Home link */}
          {/* <li className="navbar-item navbar-home">
            <button onClick={() => navigate('/')}>
              <HomeIcon className="nav-icon" /> Home
            </button>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
