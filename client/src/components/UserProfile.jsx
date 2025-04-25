// import React, { useState, useEffect } from 'react';
// import { 
//   Container, Typography, Paper, Button, Dialog,
//   DialogTitle, DialogContent, DialogActions, TextField
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [openEdit, setOpenEdit] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: ''
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);
//   // const jwtDecode = require('jwt-decode');
//   const fetchUserProfile = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       // const decodedToken = jwtDecode(token);
//       // console.log('Payload:', decodedToken);
//       const response = await axios.get('http://localhost:8081/api/users/profile', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      


//       setUser(response.data);
//       setFormData({
//         name: response.data.name,
//         email: response.data.email,
//         password: ''
//       });
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(
//         `http://localhost:8081/api/users/${user.userID}`,
//         formData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setOpenEdit(false);
//       fetchUserProfile();
//       alert('Profile updated successfully!');
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       alert('Failed to update profile');
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(
//         `http://localhost:8081/api/users/${user.userID}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       localStorage.removeItem('token');
//       navigate('/');
//     } catch (error) {
//       console.error('Error deleting account:', error);
//       alert('Failed to delete account');
//     }
//   };

//   if (!user) return <Typography>Loading...</Typography>;

//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       <Paper sx={{ p: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           User Profile
//         </Typography>
        
//         <Typography variant="h6" sx={{ mt: 2 }}>Name</Typography>
//         <Typography paragraph>{user.name}</Typography>
        
//         <Typography variant="h6">Email</Typography>
//         <Typography paragraph>{user.email}</Typography>

//         <Button 
//           variant="contained" 
//           color="primary" 
//           onClick={() => setOpenEdit(true)}
//           sx={{ mr: 2 }}
//         >
//           Update Profile
//         </Button>
//         <Button 
//           variant="contained" 
//           color="error" 
//           onClick={handleDelete}
//         >
//           Delete Account
//         </Button>
//       </Paper>

//       <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
//         <DialogTitle>Update Profile</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="Name"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="New Password"
//             type="password"
//             value={formData.password}
//             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//             margin="normal"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
//           <Button onClick={handleUpdate} color="primary">Update</Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default UserProfile;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/UserProfile.css'; // Import the CSS file

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8081/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setFormData({
        name: response.data.name,
        email: response.data.email,
        password: '',
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load user profile.');
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:8081/api/users/${user.userID}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOpenEdit(false);
      fetchUserProfile();
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `http://localhost:8081/api/users/${user.userID}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account');
    }
  };

  if (loading) {
    return <div className="loading-container"><p className="loading-text">Loading user profile...</p></div>;
  }

  if (error) {
    return <div className="error-container"><p className="error-text">{error}</p></div>;
  }

  return (
    <div className="user-profile-page">
      <div className="profile-container">
        <h2 className="profile-title">User Profile</h2>

        <div className="profile-info">
          <h3>Name</h3>
          <p>{user.name}</p>
        </div>

        <div className="profile-info">
          <h3>Email</h3>
          <p>{user.email}</p>
        </div>

        <div className="profile-actions">
          <button className="update-button" onClick={() => setOpenEdit(true)}>
            Update Profile
          </button>
          <button className="delete-button" onClick={handleDelete}>
            Delete Account
          </button>
        </div>
      </div>

      {openEdit && (
        <div className="edit-dialog-overlay">
          <div className="edit-dialog">
            <h3 className="edit-title">Update Profile</h3>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <small className="password-note">Leave blank to keep the current password.</small>
            </div>
            <div className="dialog-actions">
              <button className="cancel-button" onClick={() => setOpenEdit(false)}>
                Cancel
              </button>
              <button className="save-button" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
