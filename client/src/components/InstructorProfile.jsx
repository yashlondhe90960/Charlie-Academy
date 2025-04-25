// import React, { useState, useEffect } from 'react';
// import { 
//   Container, Typography, Paper, Button, Dialog,
//   DialogTitle, DialogContent, DialogActions, TextField
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const InstructorProfile = () => {
//   const [instructor, setInstructor] = useState(null);
//   const [openEdit, setOpenEdit] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: ''
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchInstructorProfile();
//   }, []);

//   const fetchInstructorProfile = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:8081/api/instructors/profile', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setInstructor(response.data);
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
//         `http://localhost:8081/api/instructors/${instructor.instructorID}`,
//         formData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setOpenEdit(false);
//       fetchInstructorProfile();
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
//         `http://localhost:8081/api/instructors/${instructor.instructorID}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       localStorage.removeItem('token');
//       navigate('/');
//     } catch (error) {
//       console.error('Error deleting account:', error);
//       alert('Failed to delete account');
//     }
//   };

//   if (!instructor) return <Typography>Loading...</Typography>;

//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       <Paper sx={{ p: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Instructor Profile
//         </Typography>
        
//         <Typography variant="h6" sx={{ mt: 2 }}>Name</Typography>
//         <Typography paragraph>{instructor.name}</Typography>
        
//         <Typography variant="h6">Email</Typography>
//         <Typography paragraph>{instructor.email}</Typography>

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

// export default InstructorProfile;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, TextField, Dialog } from '@mui/material';
import '../styles/InstructorProfile.css'; // Import the CSS file
import { FaUserCircle, FaPencilAlt, FaTrashAlt, FaImage } from 'react-icons/fa'; // Using react-icons for icons

const InstructorProfile = () => {
  const [instructor, setInstructor] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profileImage: '', // Added for profile image
  });
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInstructorProfile();
  }, []);

  const fetchInstructorProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8081/api/instructors/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInstructor(response.data);
      setFormData({
        name: response.data.name,
        email: response.data.email,
        password: '',
        profileImage: response.data.profileImage || '', // Load existing image URL
      });
      setProfileImagePreview(response.data.profileImage || null);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImage: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const updateData = new FormData();
      updateData.append('name', formData.name);
      updateData.append('email', formData.email);
      if (formData.password) {
        updateData.append('password', formData.password);
      }
      if (formData.profileImage instanceof File) {
        updateData.append('profileImage', formData.profileImage);
      }

      await axios.put(
        `http://localhost:8081/api/instructors/${instructor.instructorID}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Important for file uploads
          },
        }
      );
      setOpenEdit(false);
      fetchInstructorProfile();
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
        `http://localhost:8081/api/instructors/${instructor.instructorID}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account');
    }
  };

  if (!instructor) return <div className="loading-message">Loading profile...</div>;

  return (
    <div className="instructor-profile-page">
      <div className="profile-container">
        <Typography variant="h4" className="profile-title">
          Instructor Profile
        </Typography>

        <div className="profile-header">
          <div className="profile-image-container">
            {profileImagePreview ? (
              <img src={profileImagePreview} alt="Profile" className="profile-image" />
            ) : (
              <FaUserCircle className="profile-icon" />
            )}
          </div>
          <div className="profile-info">
            <Typography variant="h6" className="info-label">Name</Typography>
            <Typography className="info-value">{instructor.name}</Typography>
            <Typography variant="h6" className="info-label">Email</Typography>
            <Typography className="info-value">{instructor.email}</Typography>
          </div>
        </div>

        <div className="profile-actions">
          <button className="update-button" onClick={() => setOpenEdit(true)}>
            <FaPencilAlt className="action-icon" /> Update Profile
          </button>
          <button className="delete-button" onClick={handleDelete}>
            <FaTrashAlt className="action-icon" /> Delete Account
          </button>
        </div>
      </div>

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} className="edit-dialog">
        <Typography variant="h6" className="dialog-title">Update Profile</Typography>
        <div className="dialog-content">
          <div className="image-upload-container">
            <label htmlFor="profileImageInput" className="image-upload-label">
              <FaImage className="upload-icon" /> Upload New Image
            </label>
            <input
              id="profileImageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="image-input"
            />
            {profileImagePreview && (
              <img src={profileImagePreview} alt="Profile Preview" className="image-preview" />
            )}
          </div>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            margin="normal"
            className="text-field"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            margin="normal"
            className="text-field"
          />
          <TextField
            fullWidth
            label="New Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            margin="normal"
            className="text-field"
            helperText="Leave blank to keep the current password"
          />
        </div>
        <div className="dialog-actions">
          <button onClick={() => setOpenEdit(false)} className="cancel-button">Cancel</button>
          <button onClick={handleUpdate} className="save-button">Update</button>
        </div>
      </Dialog>
    </div>
  );
};

export default InstructorProfile;