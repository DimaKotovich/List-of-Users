import React, { FC, useState } from 'react';
import './UserCard.scss';
import { NavLink, useParams } from 'react-router-dom';

interface Props {
  user: any
}

export const UserCard: FC<Props> = ({ user }) => {

  const { userName } = useParams();
  console.log(user.login.username);
  return (
    <div className='userBlock'>
      <img 
        src={user.picture.medium} 
        alt="UserLogo" 
        className='userBlock__logo'
      />
      <div className='userBlock__info'>
        <span className='userBlock__info--name'>{`${user.name.first} ${user.name.last}`}</span>
        <span className='userBlock__info--date'>{user.registered.date}</span>
        <span className='userBlock__info--location'>{`${user.location.city}, ${user.location.street.name} ${user.location.street.number}`}</span>
        <span className='userBlock__info--email'>{user.email}</span>
      </div>
      <NavLink
          to={`/users/${user.login.username}`}
          className='userBlock__link'
        >
        <button 
          className='userBlock__button'
          onClick={() => {console.log(user)}}
        >
            Edit
        </button>
      </NavLink>
    </div>
  )
}