import React, { FC, useState } from 'react';
import './TodoList.scss';
import { UserCard } from '../UserCard/UserCard';

interface Props {
  users: any
}

export const TodoList: FC<Props> = ({ users }) => {

  return (
    <div className='todoList'>
      <h1 className='todoList__title'>List of users</h1>

      <div className='todoList__wrapper'>
        <ul className='todoList__list'>
          {users.map((user: any) => (
            <li key={user.id.name}>
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