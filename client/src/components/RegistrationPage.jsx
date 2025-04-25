
// export default RegistrationPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/RegisterPage.css'; // Import the CSS file

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const newErrors = {};

    if (!password) {
      newErrors.password = 'Password is required.';
      return newErrors;
    }

    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    if (!/[A-Z]/.test(password)) {
      if (!newErrors.password) {
        newErrors.password = 'Password must contain at least one uppercase letter.';
      } else {
        newErrors.password += ' It must also contain at least one uppercase letter.';
      }
    }

    if (!/[^a-zA-Z0-9\s]/.test(password)) {
      if (!newErrors.password) {
        newErrors.password = 'Password must contain at least one special character.';
      } else {
        newErrors.password += ' It must also contain at least one special character.';
      }
    }

    return newErrors;
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required.';
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name must contain only alphabets and spaces.';
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email.';
    }

    const passwordErrors = validatePassword(formData.password);
    if (Object.keys(passwordErrors).length > 0) {
      newErrors.password = passwordErrors.password;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      const endpoint =
        formData.role === 'INSTRUCTOR'
          ? 'http://localhost:8081/api/instructors'
          : 'http://localhost:8081/api/users';

      const response = await axios.post(endpoint, formData);

      console.log('Registration successful', response.data);
      if (response.status === 201) {
        alert('Registration successful! You can now log in.');
        navigate('/login'); // Redirect to login page
      }

    } catch (error) {
      console.error('Registration failed', error);
      setErrors({ general: 'Registration failed. Please try again.' });
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        <div className="registration-header">
          <h2>Create Account</h2>
          <p>Join our learning platform</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="role">Register as</label>
            <select id="role" name="role" value={formData.role} onChange={handleChange}>
              <option value="USER">Learner</option>
              <option value="INSTRUCTOR">Instructor</option>
            </select>
          </div>
          {errors.general && <p className="error-message">{errors.general}</p>}
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;