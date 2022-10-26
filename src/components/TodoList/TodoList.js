import React from 'react';
import './TodoList.scss';
import { UserCard } from '../UserCard/UserCard';
import { Pagination } from '../Pagination/Pagination';
import { useDispatch,useSelector } from 'react-redux';
import { changeUserList, paginate } from '../../Redux/redux';

export const TodoList = () => {

  const dispatch = useDispatch();

  const users = useSelector(
    state => state.users.users
  );
  const sortBy = useSelector(
    state => state.users.sortBy
  );

  const handleChange = (event) => {
    dispatch(changeUserList(event.target.value));
    dispatch(paginate());
  } 
  return (
    <div className='todoList'>
      <h1 className='todoList__title'>List of users</h1>
      <div className='todoList__wrapper'>
        <ul className='todoList__list'>
          {users.map(user => (
            <li key={user.phone} className={sortBy === 'custom sort' ? 'todoList__list--cursor' : ''}>
              <UserCard
                user={user}
              />
            </li>
          ))}
        </ul>
        <div className='todoList__pagination'>
          <Pagination/>
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