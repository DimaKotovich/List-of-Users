import React from 'react';
import { Link } from 'react-router-dom';
import './UserEdit.scss';
import { useDispatch,useSelector } from 'react-redux';



export const UserEdit = () => {

  const dispatch = useDispatch();

  const user = useSelector(
    state => state.users.currentUsers
  );

  const monthString = useSelector(
    state => state.users.month
  );

  const year = user.dob.date.slice(0,4);
  const month = user.dob.date.slice(5,7)
  const day = user.dob.date.slice(8,10);

  console.log(user);

  return (
    <div className='userEdit'>
      <Link
          className='userEdit__link'
          to={'/'}
        >
          <button
            className='userEdit__button'
          >
            {'< Back'}
          </button>
      </Link>
      <div className='userEdit__wrapper'>
        <div className='userEdit__left'>
          <img
            src={user.picture.large}
            alt="UserLogo"
            className='userEdit__left--image'
          />
          <span className='userEdit__left--name'>{`${user.name.first} ${user.name.last}`}</span>
          <span className='userEdit__left--date'>{`${day} ${monthString[month]} ${year}`}</span>
          <button
              className='userEdit__left--button'
            >
              Delete
            </button>
        </div>

        <div className='userEdit__right'>
          <div className='userEdit__block'>
            <input
              className='userEdit__block--input'
              type="text"
              placeholder={`${user.name.first} ${user.name.last}`}
            />
            <button
              className='userEdit__block--button'
            >
              Edit
            </button>
          </div>

          <div className='userEdit__block'>
            <input
              className='userEdit__block--input'
              type="text"
              placeholder={user.email}
            />
            <button
              className='userEdit__block--button'
            >
              Edit
            </button>
          </div>

          <div className='userEdit__block'>
            <input
              className='userEdit__block--input'
              type="text"
              placeholder={user.phone}
            />
            <button
              className='userEdit__block--button'
            >
              Edit
            </button>
          </div>

          <div className='userEdit__block'>
            <input
              className='userEdit__block--input'
              type="text"
              placeholder={user.location.city}
            />
            <button
              className='userEdit__block--button'
            >
              Edit
            </button>
          </div>

          <div className='userEdit__block'>
            <input
              className='userEdit__block--input'
              type="text"
              placeholder={`${user.location.street.name} ${user.location.street.number}`}
            />
            <button
              className='userEdit__block--button'
            >
              Edit
            </button>
          </div>

          <div className='userEdit__block'>
            <input
              className='userEdit__block--input'
              type="text"
              placeholder={`${day}.${month}.${year}`}
            />
            <button
              className='userEdit__block--button'
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
    
  )
}