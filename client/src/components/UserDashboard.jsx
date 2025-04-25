
// // export default UserDashboard;
// import React, { useEffect, useState } from 'react';
// import {
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   Box,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const UserDashboard = () => {
//   const [courses, setCourses] = useState([]);
//   const [enrollments, setEnrollments] = useState([]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCourses();
//     fetchEnrollments();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:8081/api/courses/public', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCourses(response.data);
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//       setError('Failed to fetch courses');
//     }
//   };

//   const fetchEnrollments = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const decodedToken = JSON.parse(atob(token.split('.')[1]));
//       const userId = decodedToken.userID;

//       const response = await axios.get(
//         `http://localhost:8081/api/enrollments/student/${userId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setEnrollments(response.data);
//     } catch (error) {
//       console.error('Error fetching enrollments:', error);
//       setError('Failed to fetch enrollments');
//     }
//   };

//   const handleEnroll = async (courseId) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         navigate('/login');
//         return;
//       }

//       const decodedToken = JSON.parse(atob(token.split('.')[1]));
//       const userId = decodedToken.userID;

//       const payload = {
//         courseID: courseId,
//         studentid: userId,
//         progress: 0,
//         status: 'Enrolled',
//       };

//       const response = await axios.post(
//         'http://localhost:8081/api/enrollments/save',
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         }
//       );

//       if (response.status === 201) {
//         await fetchEnrollments();
//         alert('Successfully enrolled in the course!');
//         navigate(`/course/${courseId}/content`);
//       }
//     } catch (error) {
//       console.error('Error enrolling in course:', error);
//       if (!localStorage.getItem('token')) {
//         alert('Please log in to enroll in courses');
//         navigate('/login');
//       } else if (error.response?.data?.includes('already exists')) {
//         alert('You are already enrolled in this course');
//       } else {
//         alert('Failed to enroll in the course. Please try again.');
//       }
//     }
//   };

//   const isEnrolled = (courseId) => {
//     return enrollments.some((enrollment) => enrollment.courseID === courseId);
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         backgroundImage: `linear-gradient(135deg, #f5f7fa 25%, transparent 25%),
//                           linear-gradient(225deg, #f5f7fa 25%, transparent 25%),
//                           linear-gradient(45deg, #f5f7fa 25%, transparent 25%),
//                           linear-gradient(315deg, #f5f7fa 25%, #ffffff 25%)`,
//         backgroundPosition: '10px 0, 10px 0, 0 0, 0 0',
//         backgroundSize: '20px 20px',
//         backgroundRepeat: 'repeat',
//         paddingY: 4,
//       }}
//     >
//       <Container maxWidth="lg">
//         {error && (
//           <Typography color="error" sx={{ mb: 2 }}>
//             {error}
//           </Typography>
//         )}

//         <Typography variant="h4" gutterBottom>
//           My Learning Dashboard
//         </Typography>

//         {/* Enrolled Courses */}
//         <Box sx={{ mb: 6 }}>
//           <Typography variant="h5" gutterBottom>
//             My Enrolled Courses
//           </Typography>
//           <Grid container spacing={3}>
//             {enrollments.map((enrollment) => {
//               const course = courses.find(
//                 (c) => c.courseID === enrollment.courseID
//               );
//               if (!course) return null;

//               return (
//                 <Grid
//                   container
//                   item
//                   key={enrollment.enrollmentid}
//                   xs={12}
//                   sm={6}
//                   md={4}
//                 >
//                   <Card
//                     sx={{
//                       width: '100%',
//                       height: '100%',
//                       display: 'flex',
//                       flexDirection: 'column',
//                     }}
//                   >
//                     <CardContent sx={{ flexGrow: 1 }}>
//                       <Typography variant="h6" gutterBottom>
//                         {course.title}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {course.description}
//                       </Typography>
//                       <Typography variant="body2" sx={{ mt: 1 }}>
//                         Progress: {enrollment.progress}%
//                       </Typography>
//                     </CardContent>
//                     <CardActions>
//                       <Button
//                         fullWidth
//                         variant="contained"
//                         color="primary"
//                         onClick={() =>
//                           navigate(`/course/${course.courseID}/content`)
//                         }
//                       >
//                         Continue Learning
//                       </Button>
//                     </CardActions>
//                   </Card>
//                 </Grid>
//               );
//             })}
//           </Grid>

//           {enrollments.length === 0 && (
//             <Typography variant="body1" sx={{ mt: 2 }}>
//               You haven't enrolled in any courses yet.
//             </Typography>
//           )}
//         </Box>

//         {/* Available Courses */}
//         <Box>
//           <Typography variant="h5" gutterBottom>
//             Available Courses
//           </Typography>
//           <Grid container spacing={3}>
//             {courses
//               .filter((course) => !isEnrolled(course.courseID))
//               .map((course) => (
//                 <Grid
//                   container
//                   item
//                   key={course.courseID}
//                   xs={12}
//                   sm={6}
//                   md={4}
//                 >
//                   <Card
//                     sx={{
//                       width: '100%',
//                       height: '100%',
//                       display: 'flex',
//                       flexDirection: 'column',
//                     }}
//                   >
//                     <CardContent sx={{ flexGrow: 1 }}>
//                       <Typography variant="h6" gutterBottom>
//                         {course.title}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {course.description}
//                       </Typography>
//                     </CardContent>
//                     <CardActions>
//                       <Button
//                         fullWidth
//                         variant="contained"
//                         color="primary"
//                         onClick={() => handleEnroll(course.courseID)}
//                       >
//                         Enroll Now
//                       </Button>
//                     </CardActions>
//                   </Card>
//                 </Grid>
//               ))}
//           </Grid>

//           {courses.filter((course) => !isEnrolled(course.courseID)).length ===
//             0 && (
//             <Typography variant="body1" sx={{ mt: 2 }}>
//               No courses available for enrollment.
//             </Typography>
//           )}
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default UserDashboard; 

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/UserDashboard.css'; // Import the CSS file
import { Typography } from '@mui/material';

const UserDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8081/api/courses/public', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Failed to fetch courses');
    }
  };

  const fetchEnrollments = async () => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = decodedToken.userID;

      const response = await axios.get(
        `http://localhost:8081/api/enrollments/student/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEnrollments(response.data);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      setError('Failed to fetch enrollments');
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = decodedToken.userID;

      const payload = {
        courseID: courseId,
        studentid: userId,
        progress: 0,
        status: 'Enrolled',
      };

      const response = await axios.post(
        'http://localhost:8081/api/enrollments/save',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        await fetchEnrollments();
        alert('Successfully enrolled in the course!');
        navigate(`/course/${courseId}/content`);
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      if (!localStorage.getItem('token')) {
        alert('Please log in to enroll in courses');
        navigate('/login');
      } else if (error.response?.data?.includes('already exists')) {
        alert('You are already enrolled in this course');
      } else {
        alert('Failed to enroll in the course. Please try again.');
      }
    }
  };

  const isEnrolled = (courseId) => {
    return enrollments.some((enrollment) => enrollment.courseID === courseId);
  };

  return (
    <div className="user-dashboard-page">
      <div className="dashboard-container">
        <Typography variant="h4" className="dashboard-title">
          My Learning Dashboard
        </Typography>

        {error && <p className="error-message">{error}</p>}

        <div className="dashboard-section">
          <Typography variant="h5" className="section-title">
            My Enrolled Courses
          </Typography>
          <div className="courses-grid">
            {enrollments.map((enrollment) => {
              const course = courses.find(
                (c) => c.courseID === enrollment.courseID
              );
              if (!course) return null;

              return (
                <div key={enrollment.enrollmentid} className="course-card">
                  <h3>{course.title}</h3>
                  <p className="course-description">{course.description}</p>
                  <p className="course-progress">Progress: {enrollment.progress}%</p>
                  <button onClick={() => navigate(`/course/${course.courseID}/content`)}>
                    Continue Learning
                  </button>
                </div>
              );
            })}
            {enrollments.length === 0 && (
              <p className="empty-message">You haven't enrolled in any courses yet.</p>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <Typography variant="h5" className="section-title">
            Available Courses
          </Typography>
          <div className="courses-grid">
            {courses
              .filter((course) => !isEnrolled(course.courseID))
              .map((course) => (
                <div key={course.courseID} className="course-card">
                  <h3>{course.title}</h3>
                  <p className="course-description">{course.description}</p>
                  <button onClick={() => handleEnroll(course.courseID)}>
                    Enroll Now
                  </button>
                </div>
              ))}
            {courses.filter((course) => !isEnrolled(course.courseID)).length === 0 && (
              <p className="empty-message">No courses available for enrollment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;