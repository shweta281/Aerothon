import React from 'react'
import { useState } from 'react'
import Header from "./comps/Header"
import LoginPage from './comps/LoginPage'
import './App.css'
import Dashboard from './comps/Dashboard';
import FlightDetails from './comps/FlightDetails'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
function App(){
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage/>}/>
        <Route exact path="/dash" element={<Dashboard/>}/>
        <Route exact path="/flite" element={<FlightDetails/>}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
