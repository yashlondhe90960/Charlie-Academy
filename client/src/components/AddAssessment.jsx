// import React, { useState } from 'react';
// import { Container, TextField, Button, Typography, Box, Grid } from '@mui/material';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const AddAssessment = () => {
//   const { courseID } = useParams();
//   const [assessmentData, setAssessmentData] = useState({
//     type: '',
//     maxScore: '',
//     questions: [],
//   });
//   const [currentQuestion, setCurrentQuestion] = useState({
//     question: '',
//     options: ['', '', '', ''], // Default 4 options
//     correctAnswer: '',
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setAssessmentData({ ...assessmentData, [e.target.name]: e.target.value });
//   };

//   const handleQuestionChange = (e) => {
//     setCurrentQuestion({ ...currentQuestion, [e.target.name]: e.target.value });
//   };

//   const handleOptionChange = (index, value) => {
//     const updatedOptions = [...currentQuestion.options];
//     updatedOptions[index] = value;
//     setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
//   };

//   const addQuestion = () => {
//     if (
//       currentQuestion.question &&
//       currentQuestion.correctAnswer &&
//       currentQuestion.options.every((option) => option.trim() !== '')
//     ) {
//       setAssessmentData({
//         ...assessmentData,
//         questions: [...assessmentData.questions, currentQuestion],
//       });
//       setCurrentQuestion({
//         question: '',
//         options: ['', '', '', ''],
//         correctAnswer: '',
//       });
//     } else {
//       alert('Please fill out all fields for the question.');
//     }
//   };

//   const handleAddAssessment = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const payload = {
//         type: assessmentData.type,
//         maxScore: assessmentData.maxScore,
//         courseID,
//         questions: assessmentData.questions.reduce((acc, question) => {
//           acc[question.question] = question.correctAnswer;
//           return acc;
//         }, {}),
//         options: assessmentData.questions.reduce((acc, question) => {
//           acc[question.question] = question.options;
//           return acc;
//         }, {}),
//       };
  
//       const response = await axios.post('http://localhost:8081/api/assessments', payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       if (response.status === 201) {
//         alert('Assessment added successfully!');
//         navigate(`/course/${courseID}`);
//       }
//     } catch (error) {
//       console.error('Error adding assessment:', error);
//       alert('Failed to add assessment. Please try again.');
//     }
//   };

//   return (
//     <Container maxWidth="md" sx={{ mt: 5 }}>
//       <Typography variant="h4" gutterBottom>
//         Add Assessment
//       </Typography>
//       <Box sx={{ mt: 3 }}>
//         <TextField
//           label="Type"
//           name="type"
//           fullWidth
//           margin="normal"
//           value={assessmentData.type}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Max Score"
//           name="maxScore"
//           type="number"
//           fullWidth
//           margin="normal"
//           value={assessmentData.maxScore}
//           onChange={handleChange}
//         />

//         <Typography variant="h5" sx={{ mt: 4 }}>
//           Add Questions
//         </Typography>
//         <TextField
//           label="Question"
//           name="question"
//           fullWidth
//           margin="normal"
//           value={currentQuestion.question}
//           onChange={handleQuestionChange}
//         />
//         <Grid container spacing={2}>
//           {currentQuestion.options.map((option, index) => (
//             <Grid item xs={6} key={index}>
//               <TextField
//                 label={`Option ${index + 1}`}
//                 fullWidth
//                 value={option}
//                 onChange={(e) => handleOptionChange(index, e.target.value)}
//               />
//             </Grid>
//           ))}
//         </Grid>
//         <TextField
//           label="Correct Answer"
//           name="correctAnswer"
//           fullWidth
//           margin="normal"
//           value={currentQuestion.correctAnswer}
//           onChange={handleQuestionChange}
//         />
//         <Button
//           variant="outlined"
//           color="primary"
//           sx={{ mt: 2 }}
//           onClick={addQuestion}
//         >
//           Add Question
//         </Button>

//         <Typography variant="h6" sx={{ mt: 4 }}>
//           Questions Added
//         </Typography>
//         <ul>
//           {assessmentData.questions.map((q, index) => (
//             <li key={index}>
//               <Typography variant="body1">
//                 <strong>Q{index + 1}:</strong> {q.question}
//               </Typography>
//               <Typography variant="body2">
//                 <strong>Options:</strong> {q.options.join(', ')}
//               </Typography>
//               <Typography variant="body2">
//                 <strong>Correct Answer:</strong> {q.correctAnswer}
//               </Typography>
//             </li>
//           ))}
//         </ul>

//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           sx={{ mt: 4 }}
//           onClick={handleAddAssessment}
//         >
//           Add Assessment
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default AddAssessment;
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@mui/material';
import '../styles/AddAssessment.css'; // Import the CSS file

const AddAssessment = () => {
  const { courseID } = useParams();
  const [assessmentData, setAssessmentData] = useState({
    type: '',
    maxScore: '',
    questions: [],
  });
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    options: ['', '', '', ''], // Default 4 options
    correctAnswer: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAssessmentData({ ...assessmentData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (e) => {
    setCurrentQuestion({ ...currentQuestion, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
  };

  const addQuestion = () => {
    if (
      currentQuestion.question &&
      currentQuestion.correctAnswer &&
      currentQuestion.options.every((option) => option.trim() !== '')
    ) {
      setAssessmentData({
        ...assessmentData,
        questions: [...assessmentData.questions, currentQuestion],
      });
      setCurrentQuestion({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
      });
    } else {
      alert('Please fill out all fields for the question.');
    }
  };

  const handleAddAssessment = async () => {
    try {
      const token = localStorage.getItem('token');
      const payload = {
        type: assessmentData.type,
        maxScore: assessmentData.maxScore,
        courseID,
        questions: assessmentData.questions.reduce((acc, question) => {
          acc[question.question] = question.correctAnswer;
          return acc;
        }, {}),
        options: assessmentData.questions.reduce((acc, question) => {
          acc[question.question] = question.options;
          return acc;
        }, {}),
      };

      const response = await axios.post('http://localhost:8081/api/assessments', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        alert('Assessment added successfully!');
        navigate(`/course/${courseID}`);
      }
    } catch (error) {
      console.error('Error adding assessment:', error);
      alert('Failed to add assessment. Please try again.');
    }
  };

  return (
    <div className="add-assessment-page">
      <div className="add-assessment-container">
        <Typography variant="h4" className="add-assessment-title">
          Add Assessment for Course ID: {courseID}
        </Typography>

        <div className="assessment-info">
          <div className="input-group">
            <label htmlFor="type">Type</label>
            <input
              type="text"
              id="type"
              name="type"
              value={assessmentData.type}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="maxScore">Max Score</label>
            <input
              type="number"
              id="maxScore"
              name="maxScore"
              value={assessmentData.maxScore}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="add-question-section">
          <Typography variant="h5" className="section-title">
            Add New Question
          </Typography>
          <div className="input-group">
            <label htmlFor="question">Question</label>
            <textarea
              id="question"
              name="question"
              value={currentQuestion.question}
              onChange={handleQuestionChange}
              rows="3"
              required
            />
          </div>
          <div className="options-grid">
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="input-group option-group">
                <label htmlFor={`option${index + 1}`}>Option {index + 1}</label>
                <input
                  type="text"
                  id={`option${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                />
              </div>
            ))}
          </div>
          <div className="input-group">
            <label htmlFor="correctAnswer">Correct Answer</label>
            <input
              type="text"
              id="correctAnswer"
              name="correctAnswer"
              value={currentQuestion.correctAnswer}
              onChange={handleQuestionChange}
              required
            />
          </div>
          <button type="button" className="add-question-button" onClick={addQuestion}>
            Add Question
          </button>
        </div>

        {assessmentData.questions.length > 0 && (
          <div className="added-questions-section">
            <Typography variant="h6" className="section-title">
              Questions Added
            </Typography>
            <ul className="questions-list">
              {assessmentData.questions.map((q, index) => (
                <li key={index} className="question-item">
                  <Typography variant="body1">
                    <strong>Q{index + 1}:</strong> {q.question}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Options:</strong> {q.options.join(', ')}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Correct Answer:</strong> {q.correctAnswer}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button className="add-assessment-button" onClick={handleAddAssessment}>
          Add Assessment
        </button>
      </div>
    </div>
  );
};

export default AddAssessment;