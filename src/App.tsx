import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../public/favicon.ico';

import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/User/SignUp';
import Profile from './pages/User/Profile';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
