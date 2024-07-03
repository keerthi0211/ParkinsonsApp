// src/AskQuestionComponent.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AskQuestionComponent = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAskQuestion = async () => {
    const response = await axios.post('http://localhost:3001/ask', {
      question,
      language: 'auto',
    });
    setAnswer(response.data.answer);
  };

  return (
    <div>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question about Parkinson's disease"
      />
      <button onClick={handleAskQuestion}>Ask</button>
      <p>{answer}</p>
    </div>
  );
};

export default AskQuestionComponent;
