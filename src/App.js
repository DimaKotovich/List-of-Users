import React from 'react';
import { Home } from './components/Home/Home';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { UserEdit } from './components/UserEdit/UserEdit';
import { PageNotFound } from './components/PageNotFound/PageNotFound'

function App() {

  return (
    <div className="App">
      <div className='wrapper'>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/users/:userName" element={<UserEdit/>} />
          <Route path="*" element={<PageNotFound />} /> 
        </Routes>
      </div>
    </div>
  );
}

export default App;
