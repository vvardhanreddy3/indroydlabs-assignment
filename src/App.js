import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import './App.css';
import QuizPage from './components/QuizPage';

function App() {
  const [players, setPlayers] = useState([]);

  // Function to update the players list with name and score
  const updatePlayerScores = (name, score) => {
    setPlayers((prevPlayers) => [...prevPlayers, { name, score }]);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Main Page with QR Code and Player Scores */}
          <Route
            path="/"
            element={
              <div>
                <h1>Welcome to the Quiz Portal</h1>
                {/* QR Code to Start the Quiz */}
                <QRCodeCanvas
                  value="http://192.168.209.28:3000/quizpage"
                  size={200}
                />
                <p>Scan the QR code to start the quiz on your mobile device.</p>

                {/* Display the Players' Names and Scores */}
                <h2>Leaderboard</h2>
                <ul>
                  {players.length > 0 ? (
                    players.map((player, index) => (
                      <li key={index}>
                        {player.name}: {player.score} points
                      </li>
                    ))
                  ) : (
                    <p>No players yet. Start the quiz to see results here!</p>
                  )}
                </ul>

                {/* Link to manually access the quiz on desktop */}
                <Link to="/quizpage">
                  <button>Start Quiz</button>
                </Link>
              </div>
            }
          />

          {/* Quiz Page */}
          <Route
            path="/quizpage"
            element={<QuizPage updatePlayerScores={updatePlayerScores} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
