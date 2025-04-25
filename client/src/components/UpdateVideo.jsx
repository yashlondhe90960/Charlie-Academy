// import React, { useState, useEffect } from 'react';
// import { Container, TextField, Button, Typography, Box } from '@mui/material';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const UpdateVideo = () => {
//   const { courseID, videoId } = useParams();
//   const [formData, setFormData] = useState({
//     title: '',
//     videoUrl: '',
//     courseId: courseID
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchVideoDetails = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(
//           `http://localhost:8081/api/videos/${videoId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` }
//           }
//         );
//         setFormData({
//           title: response.data.title,
//           videoUrl: response.data.videoUrl,
//           courseId: response.data.courseId
//         });
//       } catch (error) {
//         console.error('Error fetching video details:', error);
//         setError('Failed to fetch video details');
//       }
//     };

//     fetchVideoDetails();
//   }, [videoId]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(
//         `http://localhost:8081/api/videos/${videoId}`,
//         formData,
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );
//       alert('Video updated successfully!');
//       navigate(`/course/${courseID}`);
//     } catch (error) {
//       console.error('Error updating video:', error);
//       setError('Failed to update video');
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Update Video
//         </Typography>
//         {error && (
//           <Typography color="error" gutterBottom>
//             {error}
//           </Typography>
//         )}
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
//             label="Video URL"
//             name="videoUrl"
//             value={formData.videoUrl}
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
//             Update Video
//           </Button>
//         </form>
//       </Box>
//     </Container>
//   );
// };

// export default UpdateVideo;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/UpdateVideo.css'; // Import the CSS file

const UpdateVideo = () => {
  const { courseID, videoId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    videoUrl: '',
    courseId: courseID,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideoDetails = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:8081/api/videos/${videoId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFormData({
          title: response.data.title,
          videoUrl: response.data.videoUrl,
          courseId: response.data.courseId,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching video details:', error);
        setError('Failed to fetch video details');
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, [videoId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:8081/api/videos/${videoId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Video updated successfully!');
      navigate(`/course/${courseID}`);
    } catch (error) {
      console.error('Error updating video:', error);
      setError('Failed to update video');
    }
  };

  if (loading) {
    return <div className="loading-container"><p className="loading-text">Loading video details...</p></div>;
  }

  return (
    <div className="update-video-page">
      <div className="update-video-container">
        <h2 className="update-video-title">Update Video</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="update-video-form">
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
            <label htmlFor="videoUrl">Video URL</label>
            <input
              type="url"
              id="videoUrl"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="update-button">
            Update Video
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateVideo;