// import React, { useState } from 'react';
// import { Container, TextField, Button, Typography, Box } from '@mui/material';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const AddResource = () => {
//   const { courseID } = useParams();
//   const [resourceData, setResourceData] = useState({
//     title: '',
//     resourceUrl: '',
//     resourceType: '',
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setResourceData({ ...resourceData, [e.target.name]: e.target.value });
//   };

//   const handleAddResource = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const payload = { ...resourceData, courseId: courseID };
//       const response = await axios.post('http://localhost:8081/api/resources/save', payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.status === 200) {
//         alert('Resource added successfully!');
//         navigate(`/course/${courseID}`);
//       }
//     } catch (error) {
//       console.error('Error adding resource:', error);
//       alert('Failed to add resource. Please try again.');
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 5 }}>
//       <Typography variant="h4" gutterBottom>
//         Add Resource
//       </Typography>
//       <Box sx={{ mt: 3 }}>
//         <TextField
//           label="Title"
//           name="title"
//           fullWidth
//           margin="normal"
//           value={resourceData.title}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Resource URL"
//           name="resourceUrl"
//           fullWidth
//           margin="normal"
//           value={resourceData.resourceUrl}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Resource Type"
//           name="resourceType"
//           fullWidth
//           margin="normal"
//           value={resourceData.resourceType}
//           onChange={handleChange}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           sx={{ mt: 2 }}
//           onClick={handleAddResource}
//         >
//           Add Resource
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default AddResource;
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@mui/material';
import { Container, TextField, Button, Box } from '@mui/material';

import '../styles/AddResource.css'; // Import the CSS file

const AddResource = () => {
  const { courseID } = useParams();
  const [resourceData, setResourceData] = useState({
    title: '',
    resourceUrl: '',
    resourceType: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setResourceData({ ...resourceData, [e.target.name]: e.target.value });
  };

  const handleAddResource = async () => {
    try {
      const token = localStorage.getItem('token');
      const payload = { ...resourceData, courseId: courseID };
      const response = await axios.post('http://localhost:8081/api/resources/save', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        alert('Resource added successfully!');
        navigate(`/course/${courseID}`);
      }
    } catch (error) {
      console.error('Error adding resource:', error);
      alert('Failed to add resource. Please try again.');
    }
  };

  return (
    <div className="add-resource-page">
      <div className="add-resource-container">
        <Typography variant="h4" className="add-resource-title">
          Add Resource for Course ID: {courseID}
        </Typography>
        <form onSubmit={(e) => { e.preventDefault(); handleAddResource(); }}>
          <div className="input-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={resourceData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="resourceUrl">Resource URL</label>
            <input
              type="url"
              id="resourceUrl"
              name="resourceUrl"
              value={resourceData.resourceUrl}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="resourceType">Resource Type</label>
            <input
              type="text"
              id="resourceType"
              name="resourceType"
              value={resourceData.resourceType}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="add-resource-button">
            Add Resource
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddResource;