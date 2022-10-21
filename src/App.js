import React, { useEffect } from 'react';
import { Home } from './components/Home/Home';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { UserEdit } from './components/UserEdit/UserEdit';
import { useDispatch,useSelector } from 'react-redux';
import { getUsers } from './api/api';

function App() {
  const dispatch = useDispatch();

  const userList = useSelector(
    state => state.users.userList
  );


  useEffect(() => {
    dispatch(getUsers(userList));
  },[userList]);

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
