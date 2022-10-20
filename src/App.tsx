import React, { useEffect, useState } from 'react';
import { Filter } from './components/Filter/Filter';
import { TodoList } from './components/TodoList/TodoList';
import { getUsers } from './api/api';
import './App.scss';


function App() {

  const [users,setUsers] = useState([]);

  const data = async() => {
    const responc = await getUsers();
    await setUsers(responc.results);
  }

  useEffect(() => {
    data();
  }, []);

  return (
    <div className="App">
      <div className='wrapper'>
        <Filter />
        <TodoList
          users={users}
        />
      </div>
    </div>
  );
}

export default App;
