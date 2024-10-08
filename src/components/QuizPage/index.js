import React, { useState } from 'react';

function QuizPage({ updatePlayerScores }) {
  const [name, setName] = useState('');
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Quiz questions array with multiple choices
  const questions = [
    {
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
      answer: 'Paris',
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Venus', 'Mars', 'Jupiter'],
      answer: 'Mars',
    },
    {
      question: 'Who wrote "Hamlet"?',
      options: ['Charles Dickens', 'J.K. Rowling', 'William Shakespeare', 'Mark Twain'],
      answer: 'William Shakespeare',
    },
  ];

  // State for tracking current question and user choice
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userChoice, setUserChoice] = useState('');

  // Handle quiz form submission
  const handleQuizSubmit = (e) => {
    e.preventDefault();
    if (userChoice === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setUserChoice('');
    setCurrentQuestion(currentQuestion + 1);
  };

  // Handle name form submission
  const handleNameSubmit = (e) => {
    e.preventDefault();
    setIsNameSubmitted(true);
  };

  return (
    <div style={{ padding: '20px' }}>
      {!isNameSubmitted ? (
        <form onSubmit={handleNameSubmit}>
          <h2>Enter your name to start the quiz</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
            style={{ padding: '10px', margin: '10px 0' }}
          />
          <button type="submit" style={{ padding: '10px 15px' }}>Start Quiz</button>
        </form>
      ) : (
        <div>
          <h2>Welcome, {name}! Let's start the quiz.</h2>
          {currentQuestion < questions.length ? (
            <div>
              <h3>
                Question {currentQuestion + 1}: {questions[currentQuestion].question}
              </h3>
              <form onSubmit={handleQuizSubmit}>
                {/* Render multiple choice options as radio buttons */}
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index}>
                    <label>
                      <input
                        type="radio"
                        value={option}
                        checked={userChoice === option}
                        onChange={(e) => setUserChoice(e.target.value)}
                        required
                      />
                      {option}
                    </label>
                  </div>
                ))}
                <button type="submit" style={{ padding: '10px 15px', margin: '10px 0' }}>Submit Answer</button>
              </form>
            </div>
          ) : (
            <div>
              <h3>Quiz completed! Your score is: {score} / {questions.length}</h3>
              <button
                onClick={() => updatePlayerScores(name, score)}
                style={{ padding: '10px 15px', marginTop: '10px' }}
              >
                Submit Score
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QuizPage;
