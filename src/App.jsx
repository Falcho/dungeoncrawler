import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartPage from './pages/StartPage';
import NewCharacter from './pages/NewCharacter';
import GameScreen from './pages/GameScreen';
import Register from './pages/Register';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<StartPage />} />
        <Route path="/new-character" element={<NewCharacter />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<div> 404 Not found </div>} />
      </Routes>
    </Router>
  );
};

export default App;