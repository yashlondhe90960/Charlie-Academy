// import React, { useEffect, useState } from 'react';
// import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const AssessmentDetails = () => {
//   const { assessmentID } = useParams(); // Get assessmentID from the URL
//   const [assessment, setAssessment] = useState(null);

//   useEffect(() => {
//     const fetchAssessmentDetails = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`http://localhost:8081/api/assessments/${assessmentID}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setAssessment(response.data);
//       } catch (error) {
//         console.error('Error fetching assessment details:', error);
//       }
//     };

//     fetchAssessmentDetails();
//   }, [assessmentID]);

//   if (!assessment) {
//     return <Typography>Loading...</Typography>;
//   }

//   return (
//     <Container maxWidth="md" sx={{ mt: 5 }}>
//       <Typography variant="h4" gutterBottom>
//         Assessment Details
//       </Typography>
//       <Typography variant="h6" gutterBottom>
//         Type: {assessment.type}
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         Max Score: {assessment.maxScore}
//       </Typography>

//       <Box sx={{ mt: 3 }}>
//         <Typography variant="h5" gutterBottom>
//           Questions
//         </Typography>
//         <List>
//           {Object.entries(assessment.questions).map(([question, correctAnswer], index) => (
//             <ListItem key={index} sx={{ mb: 2 }}>
//               <ListItemText
//                 primary={`Q${index + 1}: ${question}`}
//                 secondary={`Correct Answer: ${correctAnswer}`}
//               />
//             </ListItem>
//           ))}
//         </List>
//       </Box>
//     </Container>
//   );
// };

// export default AssessmentDetails;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import axios from 'axios';
import '../styles/AssessmentDetails.css'; // Import the CSS file

const AssessmentDetails = () => {
  const { assessmentID } = useParams(); // Get assessmentID from the URL
  const [assessment, setAssessment] = useState(null);

  useEffect(() => {
    const fetchAssessmentDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8081/api/assessments/${assessmentID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAssessment(response.data);
      } catch (error) {
        console.error('Error fetching assessment details:', error);
      }
    };

    fetchAssessmentDetails();
  }, [assessmentID]);

  if (!assessment) {
    return <div className="loading-container"><p className="loading-text">Loading assessment details...</p></div>;
  }

  return (
    <div className="assessment-details-page">
      <div className="assessment-details-container">
        <Typography variant="h4" className="page-title">
          Assessment Details
        </Typography>
        <div className="assessment-info">
          <Typography variant="h6" className="info-item">
            Type: <span className="info-value">{assessment.type}</span>
          </Typography>
          <Typography variant="body1" className="info-item">
            Max Score: <span className="info-value">{assessment.maxScore}</span>
          </Typography>
        </div>

        <div className="questions-section">
          <Typography variant="h5" className="section-title">
            Questions
          </Typography>
          <ul className="questions-list">
            {Object.entries(assessment.questions).map(([question, correctAnswer], index) => (
              <li key={index} className="question-item">
                <Typography variant="body1" className="question-text">
                  <span className="question-number">Q{index + 1}:</span> {question}
                </Typography>
                <Typography variant="body2" className="answer-text">
                  Correct Answer: <span className="correct-answer">{correctAnswer}</span>
                </Typography>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AssessmentDetails;