import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Login from './Login';
import Navbar from './Navbar';
function App() {
  return (
    <Router>
      <div className='container'>
        <Navbar />
        <Routes>
          <Route path='/' exact>
            Inicio
          </Route>
          <Route path='/login' element={<Login />}>
            login...
          </Route>
          <Route path='/admin'>
            admin...
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
