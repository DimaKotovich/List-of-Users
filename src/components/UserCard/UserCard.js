import React from 'react';
import './UserCard.scss';
import { Link, useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { currentUser } from '../../api/api';

export const UserCard = ({ user }) => {

  const { userName } = useParams();
  const dispatch = useDispatch();

  const monthString = useSelector(
    state => state.users.month
  );

  const year = user.dob.date.slice(0,4);
  const month = user.dob.date.slice(5,7)
  const day = user.dob.date.slice(8,10);

  return (
    <div className='userBlock'>
      <img 
        src={user.picture.medium} 
        alt="UserLogo" 
        className='userBlock__logo'
      />
      <div className='userBlock__info'>
        <span className='userBlock__info--name'>{`${user.name.first} ${user.name.last}`}</span>
        <span className='userBlock__info--date'>{`${day} ${monthString[month]} ${year}`}</span>
        <span className='userBlock__info--location'>{`${user.location.city}, ${user.location.street.name} ${user.location.street.number}`}</span>
        <span className='userBlock__info--email'>{user.email}</span>
      </div>
      <Link
          to={`/users/${user.login.username}`}
          className='userBlock__link'
        >
        <button 
          className='userBlock__button'
          onClick={() => {dispatch(currentUser(user))}}
        >
            Edit
        </button>
      </Link>
    </div>
  )
}