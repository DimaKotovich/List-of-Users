import React, { useEffect } from 'react';
import { Home } from './components/Home/Home';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { UserEdit } from './components/UserEdit/UserEdit';
import { useDispatch } from 'react-redux';
import { getUsers } from './api/api';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  },[dispatch]);

  return (
    <div className="App">
      <div className='wrapper'>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/users/:userName" element={<UserEdit/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
