
// export default StudentProfile;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import '../styles/StudentProfile.css'; // Import the CSS file

const StudentProfile = () => {
  const { courseID, studentID } = useParams(); // Get courseID and studentID from the URL
  const [student, setStudent] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch student details
        const studentResponse = await axios.get(`http://localhost:8081/api/users/${studentID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudent(studentResponse.data);

        // Fetch student's assessment submissions for the course
        const submissionsResponse = await axios.get(
          `http://localhost:8081/api/submissions/course/${courseID}/student/${studentID}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSubmissions(submissionsResponse.data);
      } catch (error) {
        console.error('Error fetching student details or submissions:', error);
      }
    };

    fetchStudentDetails();
  }, [courseID, studentID]);

  if (!student) {
    return <div className="loading-container"><p className="loading-text">Loading student profile...</p></div>;
  }

  return (
    <div className="student-profile-page">
      <div className="profile-container">
        <h2 className="profile-title">{student.name}'s Profile</h2>
        <p className="profile-info">Email: {student.email}</p>

        <div className="assessment-results">
          <h3 className="results-heading">Assessment Results</h3>
          {submissions.length > 0 ? (
            <ul className="submission-list">
              {submissions.map((submission) => (
                <li key={submission.submissionId} className="submission-item">
                  <p>Assessment ID: <span className="submission-detail">{submission.assessmentId}</span></p>
                  <p>Score: <span className="submission-detail">{submission.score}</span></p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-results">No assessment results available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;