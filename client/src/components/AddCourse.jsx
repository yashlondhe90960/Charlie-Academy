// import React, { useState } from 'react';
// import { Container, TextField, Button, Typography, Box } from '@mui/material';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AddCourse = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     contentURL: '',
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token
//       const instructorID = decodedToken.instructorID; // Extract the instructorID from the token

//       const payload = {
//         ...formData,
//         instructorID, // Include the instructorID in the payload
//       };

//       const response = await axios.post(
//         'http://localhost:8081/api/courses/save',
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 201) {
//         alert('Course added successfully!');
//         navigate('/instructor-dashboard'); // Redirect to instructor dashboard
//       }
//     } catch (error) {
//       console.error('Error adding course:', error);
//       alert('Failed to add course. Please try again.');
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 5 }}>
//       <Typography variant="h4" gutterBottom>
//         Add Course
//       </Typography>
//       <Box sx={{ mt: 3 }}>
//         <TextField
//           label="Title"
//           name="title"
//           fullWidth
//           margin="normal"
//           value={formData.title}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Description"
//           name="description"
//           fullWidth
//           margin="normal"
//           value={formData.description}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Content URL"
//           name="contentURL"
//           fullWidth
//           margin="normal"
//           value={formData.contentURL}
//           onChange={handleChange}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           sx={{ mt: 2 }}
//           onClick={handleSubmit}
//         >
//           Add Course
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default AddCourse;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@mui/material';
import '../styles/AddCourse.css'; // Import the CSS file

const AddCourse = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contentURL: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const instructorID = decodedToken.instructorID;

      const payload = {
        ...formData,
        instructorID,
      };

      const response = await axios.post(
        'http://localhost:8081/api/courses/save',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert('Course added successfully!');
        navigate('/instructor-dashboard');
      }
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Failed to add course. Please try again.');
    }
  };

  return (
    <div className="add-course-page">
      <div className="add-course-container">
        <Typography variant="h4" className="add-course-title">
          Add New Course
        </Typography>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="input-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="contentURL">Content URL</label>
            <input
              type="url"
              id="contentURL"
              name="contentURL"
              value={formData.contentURL}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="add-course-button">
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;