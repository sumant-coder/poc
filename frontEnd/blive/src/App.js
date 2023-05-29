
import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import LoginForm from './components/LoginForm';
import SignUp from './components/signUp';
import Home from './components/Home';



function App() {
  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/Home" element={<Home/>} />
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
