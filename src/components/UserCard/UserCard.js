import React from 'react';
import './UserCard.scss';
import { Link, useParams } from 'react-router-dom';

export const UserCard = ({ user }) => {

  const { userName } = useParams();

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
      <Link
          to={`/users/${user.login.username}`}
          className='userBlock__link'
        >
        <button 
          className='userBlock__button'
          onClick={() => {console.log(user)}}
        >
            Edit
        </button>
      </Link>
    </div>
  )
}