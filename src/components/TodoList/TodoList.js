import React from 'react';
import './TodoList.scss';
import { UserCard } from '../UserCard/UserCard';
import { useDispatch,useSelector } from 'react-redux';
import { changeUserList } from '../../api/api';

export const TodoList = () => {

  const dispatch = useDispatch();

  const users = useSelector(
    state => state.users.users
  );
  console.log(users);

  const handleChange = (event) => {
    console.log(event.target.value)
    dispatch(changeUserList(event.target.value));
  } 
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
        <div className='todoList__pagination'>
          <select onChange={handleChange} className='todoList__pagination--select'>
            <option value="50">50</option>
            <option value="10">10</option>
            <option value="100">100</option>
            <option value="500">all</option>
          </select>
        </div>
      </div>
    </div>
  )
}