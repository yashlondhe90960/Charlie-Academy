// import React, { useEffect, useState } from 'react';
// import { Container, Typography, Box, List, ListItem, ListItemText, Button, Divider } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const CourseContent = () => {
//   const { courseID } = useParams(); // Get courseID from the URL
//   const [course, setCourse] = useState({});
//   const [videos, setVideos] = useState([]);
//   const [resources, setResources] = useState([]);
//   const [assessments, setAssessments] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchCourseContent();
//   }, [courseID]);

//   const fetchCourseContent = async () => {
//     try {
//       const token = localStorage.getItem('token');

//       // Fetch course details
//       const courseResponse = await axios.get(`http://localhost:8081/api/courses/${courseID}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCourse(courseResponse.data);

//       // Fetch videos
//       const videosResponse = await axios.get(`http://localhost:8081/api/videos/course/${courseID}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setVideos(videosResponse.data);
//       if (videosResponse.data.length > 0) {
//         setSelectedVideo(videosResponse.data[0]); // Select the first video by default
//       }

//       // Fetch resources
//       const resourcesResponse = await axios.get(`http://localhost:8081/api/resources/course/${courseID}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setResources(resourcesResponse.data);

//       // Fetch assessments
//       const assessmentsResponse = await axios.get(`http://localhost:8081/api/assessments/course/${courseID}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAssessments(assessmentsResponse.data);
//     } catch (error) {
//       console.error('Error fetching course content:', error);
//       setError('Failed to fetch course content. Please try again later.');
//     }
//   };

//   const handleStartAssessment = (assessmentID) => {
//     // Navigate to the assessment page
//     window.location.href = `/course/${courseID}/assessment/${assessmentID}`;
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: 5 }}>
//       {error && (
//         <Typography color="error" gutterBottom>
//           {error}
//         </Typography>
//       )}

//       <Typography variant="h4" gutterBottom>
//         {course.title}
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         {course.description}
//       </Typography>

//       <Box sx={{ display: 'flex', mt: 4 }}>
//         {/* Sidebar */}
//         <Box sx={{ width: '25%', mr: 3 }}>
//           {/* Videos Section */}
//           <Typography variant="h6" gutterBottom>
//             Videos
//           </Typography>
//           <List>
//             {videos.map((video) => (
//               <ListItem
//                 button
//                 key={video.videoId}
//                 selected={selectedVideo?.videoId === video.videoId}
//                 onClick={() => setSelectedVideo(video)}
//                 sx={{
//                   transition: 'background-color 0.3s ease',
//                   backgroundColor: selectedVideo?.videoId === video.videoId ? '#e3f2fd' : 'transparent',
//                   '&:hover': { backgroundColor: '#f1f1f1' },
//                   borderRadius: '4px',
//                   mb: 1,
//                 }}
//               >
//                 <ListItemText primary={video.title} />
//               </ListItem>
//             ))}
//           </List>

//           <Divider sx={{ my: 2 }} />

//           {/* Resources Section */}
//           <Typography variant="h6" gutterBottom>
//             Resources
//           </Typography>
//           <List>
//             {resources.map((resource) => (
//               <ListItem
//                 key={resource.resourceId}
//                 sx={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   mb: 1,
//                   borderRadius: '4px',
//                   backgroundColor: '#f9f9f9',
//                   p: 1,
//                 }}
//               >
//                 <ListItemText
//                   primary={resource.title}
//                   secondary={`Type: ${resource.resourceType}`}
//                 />
//                 <Button
//                   variant="outlined"
//                   color="primary"
//                   onClick={() => window.open(resource.resourceUrl, '_blank')}
//                 >
//                   View
//                 </Button>
//               </ListItem>
//             ))}
//           </List>

//           <Divider sx={{ my: 2 }} />

//           {/* Assessments Section */}
//           <Typography variant="h6" gutterBottom>
//             Assessments
//           </Typography>
//           <List>
//             {assessments.map((assessment) => (
//               <ListItem
//                 key={assessment.assessmentID}
//                 sx={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   mb: 1,
//                   borderRadius: '4px',
//                   backgroundColor: '#f9f9f9',
//                   p: 1,
//                 }}
//               >
//                 <ListItemText
//                   primary={assessment.type}
//                   secondary={`Max Score: ${assessment.maxScore}`}
//                 />
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => handleStartAssessment(assessment.assessmentID)}
//                 >
//                   Start
//                 </Button>
//               </ListItem>
//             ))}
//           </List>
//         </Box>

//         {/* Main Content */}
//         <Box sx={{ flexGrow: 1 }}>
//           {selectedVideo ? (
//             <Box>
//               <Typography variant="h5" gutterBottom>
//                 {selectedVideo.title}
//               </Typography>
//               <iframe
//                 width="100%"
//                 height="400"
//                 src={selectedVideo.videoUrl.replace('watch?v=', 'embed/')}
//                 title={selectedVideo.title}
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               ></iframe>
//             </Box>
//           ) : (
//             <Typography variant="body1">Select a video to view</Typography>
//           )}
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default CourseContent;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/CourseContent.css'; // Ensure the path is correct
import Typography from '@mui/material/Typography'; // Import Typography for loading/error messages

const CourseContent = () => {
  const { courseID } = useParams(); // Get courseID from the URL
  const [course, setCourse] = useState({});
  const [videos, setVideos] = useState([]);
  const [resources, setResources] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourseContent();
  }, [courseID]);

  const fetchCourseContent = async () => {
    try {
      const token = localStorage.getItem('token');

      // Fetch course details
      const courseResponse = await axios.get(`http://localhost:8081/api/courses/${courseID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourse(courseResponse.data);

      // Fetch videos
      const videosResponse = await axios.get(`http://localhost:8081/api/videos/course/${courseID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideos(videosResponse.data);
      if (videosResponse.data.length > 0) {
        setSelectedVideo(videosResponse.data[0]); // Select the first video by default
      }

      // Fetch resources
      const resourcesResponse = await axios.get(`http://localhost:8081/api/resources/course/${courseID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResources(resourcesResponse.data);

      // Fetch assessments
      const assessmentsResponse = await axios.get(`http://localhost:8081/api/assessments/course/${courseID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssessments(assessmentsResponse.data);
    } catch (error) {
      console.error('Error fetching course content:', error);
      setError('Failed to fetch course content. Please try again later.');
    }
  };

  // const handleStartAssessment = (assessmentID) => {
  //   navigate(`/course/${courseID}/assessment/${assessmentID}`);
  // };
  const handleStartAssessment = (assessmentID) => {
    console.log('handleStartAssessment clicked for assessmentID:', assessmentID, 'and courseID:', courseID);
    // Navigate to the assessment page
    window.location.href = `/course/${courseID}/assessment/${assessmentID}`;
    console.log('Navigating to:', `/course/${courseID}/assessment/${assessmentID}`);
  };
  // const getEmbedUrl = (videoUrl) => {
  //   if(!videoUrl) return '';
  //   return videoUrl.replace('watch?v=', 'embed/');
  // }
  const getYoutubeEmbedUrl = (url) => {
    if (url && url.includes('watch?v=')) {
      const videoId = url.split('watch?v=')[1];
      const ampersandIndex = videoId.indexOf('&');
      const cleanVideoId = ampersandIndex !== -1 ? videoId.substring(0, ampersandIndex) : videoId;
      return `https://www.youtube.com/embed/${cleanVideoId}`;
    }
    return url; // Return the original URL if it's not a standard YouTube watch URL
  };

  
return (
      <div className="course-content-page">
        <div className="course-header">
          <Typography variant="h4" className="course-title">
            {course.title}
          </Typography>
          <Typography variant="body1" className="course-description">
            {course.description}
          </Typography>
        </div>
  
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
  
        <div className="course-body">
          {/* Sidebar */}
          <aside className="course-sidebar">
            {/* Videos Section */}
            <div className="sidebar-section">
              <Typography variant="h6" className="section-title">
                Videos
              </Typography>
              <ul className="video-list">
                {videos.map((video) => (
                  <li
                    key={video.videoId}
                    className={`video-item ${selectedVideo?.videoId === video.videoId ? 'selected' : ''}`}
                    onClick={() => setSelectedVideo(video)}
                  >
                    {video.title}
                  </li>
                ))}
              </ul>
            </div>
  
            <div className="sidebar-divider"></div>
  
            {/* Resources Section */}
            <div className="sidebar-section">
              <Typography variant="h6" className="section-title">
                Resources
              </Typography>
              <ul className="resource-list">
                {resources.map((resource) => (
                  <li key={resource.resourceId} className="resource-item">
                    <div className="resource-info">
                      <Typography variant="body1">{resource.title}</Typography>
                      <Typography variant="body2" className="resource-type">
                        Type: {resource.resourceType}
                      </Typography>
                    </div>
                    <button
                      className="view-button"
                      onClick={() => window.open(resource.resourceUrl, '_blank')}
                    >
                      View
                    </button>
                  </li>
                ))}
              </ul>
            </div>
  
            <div className="sidebar-divider"></div>
  
            {/* Assessments Section */}
            <div className="sidebar-section">
              <Typography variant="h6" className="section-title">
                Assessments
              </Typography>
              <ul className="assessment-list">
                {assessments.map((assessment) => (
                  <li key={assessment.assessmentID} className="assessment-item">
                    <div className="assessment-info">
                      <Typography variant="body1">{assessment.type}</Typography>
                      <Typography variant="body2" className="assessment-score">
                        Max Score: {assessment.maxScore}
                      </Typography>
                    </div>
                    <button
                      className="start-button"
                      onClick={() => handleStartAssessment(assessment.assessmentID)}
                    >
                      Start
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
  
          {/* Main Content */}
          <main className="course-main-content">
            {selectedVideo ? (
              <div className="video-player">
                <Typography variant="h5" className="video-title">
                  {selectedVideo.title}
                </Typography>
                <div className="video-iframe-container">
                  <iframe
                width="100%"
                height="400"
                src={getYoutubeEmbedUrl(selectedVideo.videoUrl)}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <Typography variant="body2" mt={2}>
                Video URL: {selectedVideo.videoUrl}
              </Typography>
              <Typography variant="body2">
                Embed URL: {getYoutubeEmbedUrl(selectedVideo.videoUrl)}
              </Typography>
                </div>
              </div>
            ) : (
              <Typography variant="body1" className="no-video-selected">
                Select a video to view
              </Typography>
            )}
          </main>
        </div>
      </div>
    );
  };
  
  export default CourseContent;
  