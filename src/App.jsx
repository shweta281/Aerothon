import { useState } from 'react'
import Header from "./comps/Header"
import LoginPage from './comps/LoginPage'
import Sky from "./assets/sky.jpg"
import './App.css'

function App() {
  return (
    <div className='back'>
      <Header/>
      <center><LoginPage/></center>
    </div>
  )
}

export default App
