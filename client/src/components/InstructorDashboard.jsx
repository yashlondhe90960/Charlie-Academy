// import React, { useEffect, useState } from 'react';
// import { Container, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const InstructorDashboard = () => {
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:8081/api/courses/instructor', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setCourses(response.data);
//       } catch (error) {
//         console.error('Error fetching courses:', error);
//       }
//     };

//     fetchCourses();
//   }, []);

//   const handleCourseClick = (courseID) => {
//     navigate(`/course/${courseID}`);
//   };

//   const handleUpdateCourse = (courseID) => {
//     navigate(`/course/${courseID}/update`);
//   };

//   const handleDeleteCourse = async (courseID) => {
//     if (!window.confirm('Are you sure you want to delete this course?')) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:8081/api/courses/${courseID}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       alert('Course deleted successfully!');
//       setCourses((prevCourses) => prevCourses.filter((course) => course.courseID !== courseID));
//     } catch (error) {
//       console.error('Error deleting course:', error);
//       alert('Failed to delete course. Please try again.');
//     }
//   };

  

//   return (
//     <Container maxWidth="lg" sx={{ mt: 5 }}>
//       <Typography variant="h4" gutterBottom>
//         Instructor Dashboard
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         Welcome to your dashboard. Here you can manage your courses, resources, and more.
//       </Typography>

//       <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
//         My Courses
//       </Typography>
//       <Grid container spacing={3}>
//         {courses.map((course) => (
//           <Grid item xs={12} sm={6} md={4} key={course.courseID}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">{course.title}</Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   {course.description}
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Button size="small" color="primary" onClick={() => handleCourseClick(course.courseID)}>
//                   Manage Course
//                 </Button>
//                 <Button size="small" color="secondary" onClick={() => handleDeleteCourse(course.courseID)}>
//                   Delete Course
//                 </Button>
//                 <Button size="small" color="primary" onClick={() => handleUpdateCourse(course.courseID)}>
//                   Update Course
//                  </Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default InstructorDashboard;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@mui/material';
import '../styles/InstructorDashboard.css'; // Import the CSS file

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8081/api/courses/instructor', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (courseID) => {
    navigate(`/course/${courseID}`);
  };

  const handleUpdateCourse = (courseID) => {
    navigate(`/course/${courseID}/update`);
  };

  const handleDeleteCourse = async (courseID) => {
    if (!window.confirm('Are you sure you want to delete this course?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8081/api/courses/${courseID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Course deleted successfully!');
      setCourses((prevCourses) => prevCourses.filter((course) => course.courseID !== courseID));
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course. Please try again.');
    }
  };

  return (
    <div className="instructor-dashboard-page">
      <div className="dashboard-container">
        <Typography variant="h4" className="dashboard-title">
          Instructor Dashboard
        </Typography>
        <Typography variant="body1" className="dashboard-intro">
          Welcome to your dashboard. Here you can manage your courses, resources, and more.
        </Typography>

        <Typography variant="h5" className="section-title">
          My Courses
        </Typography>
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.courseID} className="course-card">
              <h3>{course.title}</h3>
              <p className="course-description">{course.description}</p>
              <div className="card-actions">
                <button onClick={() => handleCourseClick(course.courseID)}>
                  Manage Course
                </button>
                <button className="delete-button" onClick={() => handleDeleteCourse(course.courseID)}>
                  Delete Course
                </button>
                <button className="update-button" onClick={() => handleUpdateCourse(course.courseID)}>
                  Update Course
                </button>
              </div>
            </div>
          ))}
          {courses.length === 0 && (
            <p className="empty-message">You haven't added any courses yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;