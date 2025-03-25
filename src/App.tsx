import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignUp } from './pages/singin';
import { Login } from './pages/login';
import Chatbot from './pages/chatbot';
import { Welcome } from './pages/welcome';



function App() {


  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">

        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chatbot" element={<Chatbot />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;