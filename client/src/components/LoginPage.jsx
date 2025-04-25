

// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';
// import '../styles/LoginPage.css'; // Import the CSS file

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('USER');
//   const navigate = useNavigate();
//   const { setAuth } = useContext(AuthContext);

//   const handleLogin = async () => {
//     try {
//       const endpoint = role === 'INSTRUCTOR'
//         ? 'http://localhost:8081/api/instructors/login'
//         : 'http://localhost:8081/api/users/login';

//       const response = await axios.post(endpoint, { email, password });

//       if (response.data?.token) {
//         const token = response.data.token;
//         localStorage.setItem('token', token);
//         const decodedToken = JSON.parse(atob(token.split('.')[1]));
//         setAuth({ token, role: decodedToken.roles[0] });

//         navigate(decodedToken.roles.includes('INSTRUCTOR')
//           ? '/instructor-dashboard'
//           : '/user-dashboard');
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//       alert('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <div className="login-header">
//           <div className="lock-icon">🔑</div>
//           <h2>Welcome Back</h2>
//           <p>Continue your learning journey</p>
//         </div>
//         <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
//           <div className="input-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="role">Login as</label>
//             <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
//               <option value="USER">Learner</option>
//               <option value="INSTRUCTOR">Instructor</option>
//             </select>
//           </div>
//           <button type="submit" className="login-button">
//             Sign In
//           </button>
//         </form>
//         <p className="signup-link">
//           New here? <a href="/register">Create an account</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../styles/LoginPage.css'; // Import the CSS file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const validateEmail = (email) => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return 'Please enter a valid email.';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required.';
    }
    return ''; // Basic check for login, can be expanded if needed
  };

  const handleLogin = async () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    try {
      const endpoint = role === 'INSTRUCTOR'
        ? 'http://localhost:8081/api/instructors/login'
        : 'http://localhost:8081/api/users/login';

      const response = await axios.post(endpoint, { email, password });

      if (response.data?.token) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setAuth({ token, role: decodedToken.roles[0] });

        navigate(decodedToken.roles.includes('INSTRUCTOR')
          ? '/instructor-dashboard'
          : '/user-dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
      setErrors({ general: 'Login failed. Please check your credentials.' });
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="lock-icon">🔑</div>
          <h2>Welcome Back</h2>
          <p>Continue your learning journey</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="role">Login as</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="USER">Learner</option>
              <option value="INSTRUCTOR">Instructor</option>
            </select>
          </div>
          {errors.general && <p className="error-message">{errors.general}</p>}
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
        <p className="signup-link">
          New here? <a href="/register">Create an account</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;