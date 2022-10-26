import React from 'react';
import './UserCard.scss';
import { Link, useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { currentUser, changeUsers } from '../../Redux/redux';

export const UserCard = ({ user }) => {

  const { userName } = useParams();
  const dispatch = useDispatch();

  const monthString = useSelector(
    state => state.users.month
  );

  const sortBy = useSelector(
    state => state.users.sortBy
  );

  const day = user.newDate.slice(0,2);
  const month = user.newDate.slice(3,5);
  const year = user.newDate.slice(6,10);

  const dragStartHandler = (e,card) => {
    dispatch(currentUser(user));
  }

  const dragEndHandler = (e) => {
  }

  const dragOverHandler = (e) => {
    e.preventDefault();
  }

  const dropHandler = (e,card) => {
    e.preventDefault();
    dispatch(changeUsers(card));
  }


  return (
    <div 
      className='userBlock'
      onDragStart={(e) => dragStartHandler(e,user)}
      onDragLeave={(e) => dragEndHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropHandler(e,user)}
      draggable={sortBy === 'custom sort' ? true : false}
    >
      <img 
        src={user.picture.medium} 
        alt="UserLogo" 
        className='userBlock__logo'
      />
      <div className='userBlock__info'>
        <span className='userBlock__info--name'>{user.newName}</span>
        <span className='userBlock__info--date'>{`${day} ${monthString[month]} ${year}`}</span>
        <span className='userBlock__info--location'>{`${user.location.city}, ${user.street}`}</span>
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