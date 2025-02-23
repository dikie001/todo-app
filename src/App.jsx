import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Signup from './components/signup'
import Login from './components/login'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <div>
        <Toaster position='top-right' reverseOrder={false}/>
      </div>
      
      <Router>
        
        <Routes>
          <Route path='/' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App