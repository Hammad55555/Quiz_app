// src/components/Quiz.js

import React, { useState } from 'react';

const Quiz = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const questionData = {
    category: "Entertainment: Music",
    type: "multiple",
    difficulty: "medium",
    question: "From which album is the Gorillaz song, 'On Melancholy Hill' featured in?",
    correct_answer: "Plastic Beach",
    incorrect_answers: ["Demon Days", "Humanz", "The Fall"]
  };

  const allAnswers = [...questionData.incorrect_answers, questionData.correct_answer].sort();

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setHasAnswered(true);
    setIsCorrect(answer === questionData.correct_answer);
  };

  return (
    <div>
      <h2>{questionData.question}</h2>
      <ul>
        {allAnswers.map((answer, index) => (
          <li key={index}>
            <button 
              onClick={() => handleAnswerClick(answer)} 
              disabled={hasAnswered}
              style={{
                backgroundColor: hasAnswered 
                  ? answer === questionData.correct_answer 
                    ? 'green' 
                    : answer === selectedAnswer 
                      ? 'red' 
                      : '' 
                  : ''
              }}
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
      {hasAnswered && (
        <div>
          {isCorrect ? <p>Correct!</p> : <p>Incorrect! The correct answer was {questionData.correct_answer}.</p>}
        </div>
      )}
    </div>
  );
};

export default Quiz;
