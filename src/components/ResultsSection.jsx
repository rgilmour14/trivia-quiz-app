import React from "react";

function ResultsSection({ name, result, onTryAgain }) {
  return (
    <div class='container'>

        <h2>Results</h2>
        <p>
            {result.isCorrect
            ? `Great job, ${name}! You got it right!`
            : `Sorry, ${name}. That's not correct.`}
          
        </p>

        {!result.isCorrect && (
          <p>
            The correct answer was: <strong>{result.correctAnswer}</strong>
          </p>
        
      )}
      <button onClick={onTryAgain}>
        Try Again
      </button>
    </div>
  );
}

export default ResultsSection;