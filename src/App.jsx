import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Cal from './pages/Cal';  // Importing Calculator from pages folder
import Cgpa from './pages/Cgpa';  // Importing Cgpa from pages folder
import './App.css'; // Your custom styles
import Login from './pages/Login';  // Importing Login from pages folder
import History from './pages/History';  // Importing History from pages folder
import Home from './pages/Home';  // Importing Home component
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <div className="app">
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="logo-container">
            {/* Logo on the left */}
            <Link to="/" className="logo">QuickCalc</Link>
          </div>

          {/* Navigation links on the right */}
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li>
              <Link to="/calculator" className="nav-link">Calculator</Link>
            </li>
            <li>
              <Link to="/cgpa" className="nav-link">CGPA Calculator</Link>
            </li>
            <li>
              <Link to="/history" className="nav-link">History</Link>
            </li>
            <li>
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li>
              <Link to="/signup" className="nav-link">Signup</Link>
            </li>
          </ul>
        </nav>

        {/* Route and Components */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home Page Route */}
            <Route path="/calculator" element={<Cal />} />
            <Route path="/cgpa" element={<Cgpa />} />
            <Route path="/login" element={<Login />} />
            <Route path="/history" element={<History />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
