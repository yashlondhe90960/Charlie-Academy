// import React, { useState, useEffect } from 'react';
// import { Container, TextField, Button, Typography, Box } from '@mui/material';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const UpdateResource = () => {
//   const { courseID, resourceId } = useParams();
//   const [formData, setFormData] = useState({
//     title: '',
//     resourceUrl: '',
//     resourceType: '',
//     courseId: courseID
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchResourceDetails = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`http://localhost:8081/api/resources/${resourceId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setFormData({
//           title: response.data.title,
//           resourceUrl: response.data.resourceUrl,
//           resourceType: response.data.resourceType,
//           courseId: response.data.courseId
//         });
//       } catch (error) {
//         console.error('Error fetching resource:', error);
//       }
//     };
//     fetchResourceDetails();
//   }, [resourceId]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(
//         `http://localhost:8081/api/resources/${resourceId}`,
//         formData,
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );
//       alert('Resource updated successfully!');
//       navigate(`/course/${courseID}`);
//     } catch (error) {
//       console.error('Error updating resource:', error);
//       alert('Failed to update resource');
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Update Resource
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             label="Title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             margin="normal"
//             required
//           />
//           <TextField
//             fullWidth
//             label="Resource URL"
//             name="resourceUrl"
//             value={formData.resourceUrl}
//             onChange={handleChange}
//             margin="normal"
//             required
//           />
//           <TextField
//             fullWidth
//             label="Resource Type"
//             name="resourceType"
//             value={formData.resourceType}
//             onChange={handleChange}
//             margin="normal"
//             required
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ mt: 2 }}
//           >
//             Update Resource
//           </Button>
//         </form>
//       </Box>
//     </Container>
//   );
// };

// export default UpdateResource;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/UpdateResource.css'; // Import the CSS file

const UpdateResource = () => {
  const { courseID, resourceId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    resourceUrl: '',
    resourceType: '',
    courseId: courseID,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResourceDetails = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8081/api/resources/${resourceId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData({
          title: response.data.title,
          resourceUrl: response.data.resourceUrl,
          resourceType: response.data.resourceType,
          courseId: response.data.courseId,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching resource:', error);
        setError('Failed to fetch resource details.');
        setLoading(false);
      }
    };
    fetchResourceDetails();
  }, [resourceId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:8081/api/resources/${resourceId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Resource updated successfully!');
      navigate(`/course/${courseID}`);
    } catch (error) {
      console.error('Error updating resource:', error);
      setError('Failed to update resource.');
    }
  };

  if (loading) {
    return <div className="loading-container"><p className="loading-text">Loading resource details...</p></div>;
  }

  return (
    <div className="update-resource-page">
      <div className="update-resource-container">
        <h2 className="update-resource-title">Update Resource</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="update-resource-form">
          <div className="form-group">
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
          <div className="form-group">
            <label htmlFor="resourceUrl">Resource URL</label>
            <input
              type="url"
              id="resourceUrl"
              name="resourceUrl"
              value={formData.resourceUrl}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="resourceType">Resource Type</label>
            <input
              type="text"
              id="resourceType"
              name="resourceType"
              value={formData.resourceType}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="update-button">
            Update Resource
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateResource;