import React, { useState } from 'react';

export default function QuestionForm({
  questionData,
  selectedAnswer,
  setSelectedAnswer,
  onSubmit,
  apiError,
}) {
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAnswer) {
      setError('Please select an answer.');
      return;
    }
    setError('');
    onSubmit();
  };

  return (
    <div className="container">
      <h2>Question</h2>

      {apiError ? (
        <p className="error">{apiError}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <p>{questionData.question}</p>

          <div className="radio-group">
            {questionData.answers.map((answer, idx) => (
              <label key={idx}>
                <input
                  type="radio"
                  name="answer"
                  value={answer}
                  checked={selectedAnswer === answer}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                {answer}
              </label>
            ))}
          </div>

          <button type="submit">Submit Answer</button>

          {error && <p className="error">{error}</p>}
        </form>
      )}
    </div>
  );
}
