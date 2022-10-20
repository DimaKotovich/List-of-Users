import React from 'react';
import './TodoList.scss';
import { UserCard } from '../UserCard/UserCard';
import { useSelector } from 'react-redux';

export const TodoList = () => {

  const users = useSelector(
    state => state.users.users
  );
  
  return (
    <div className='todoList'>
      <h1 className='todoList__title'>List of users</h1>
      <div className='todoList__wrapper'>
        <ul className='todoList__list'>
          {users.map(user => (
            <li key={user.phone}>
              <UserCard
                user={user}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}