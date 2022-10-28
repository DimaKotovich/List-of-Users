import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './UserEdit.scss';
import { useDispatch,useSelector } from 'react-redux';
import { deleteUser, changeName, changeEmail,changePhone } from '../../Redux/redux';
import { editUser, changeCity, changeLocation,changeDate, filterGender } from '../../Redux/redux';



export const UserEdit = () => {

  const [edit,setEdit] = useState({
    name:'',
    email:'',
    phone:'',
    city:'',
    location:'',
    date:''
  });

  const dispatch = useDispatch();

  const user = useSelector(
    state => state.users.currentUsers
  );

  const monthString = useSelector(
    state => state.users.month
  );

  const errorDate = useSelector(
    state => state.users.errorDate
  );


  const saveChange = () => {
    dispatch(editUser());
    dispatch(filterGender([]));
  }

  const day = user.newDate.slice(0,2);
  const month = user.newDate.slice(3,5);
  const year = user.newDate.slice(6,10);

  return (
    <div className='userEdit'>
      <Link
          className='userEdit__link'
          to={'/'}
        >
          <button
            className='userEdit__button'
            onClick={saveChange}
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
          <span className='userEdit__left--name'>{user.newName}</span>
          <span className='userEdit__left--date'>{`${day} ${monthString[month]} ${year}`}</span>
          <Link
            className='userEdit__link'
            to={'/'}
          >
            <button
                className='userEdit__left--button'
                onClick={() => {dispatch(deleteUser(user.login.username))}}
              >
                Delete
              </button>
          </Link>
        </div>

        <div className='userEdit__right'>
          <div className='userEdit__block'>
            <input
              className='userEdit__block--input'
              type="text"
              onChange={(event) => setEdit(state => ({ ...state, name: event.target.value }))}
              value={edit.name.trim().length > 0 ? edit.name : ''}
              placeholder={user.newName}
            />
            <button
              className={classNames(
                'userEdit__block--button',
                { 'userEdit__block--active': edit.name.trim().length > 0 }
              )}
              disabled={edit.name.trim().length > 0 ? false : true}
              onClick={() => {
                dispatch(changeName(edit.name.trim()));
                setEdit(state => ({ ...state, name: '' }))}}
              >
              {edit.name.trim().length > 0 ? 'Update' : 'Edit'}
            </button>
          </div>
          
          <div className='userEdit__block'>
            <input
              className='userEdit__block--input'
              type="text"
              onChange={(event) => setEdit(state => ({ ...state, email: event.target.value }))}
              value={edit.email.trim().length > 0 ? edit.email : ''}
              placeholder={user.email}
            />
            <button
              className={classNames(
                'userEdit__block--button',
                { 'userEdit__block--active': edit.email.trim().length > 0 }
              )}
              disabled={edit.email.trim().length > 0 ? false : true}
              onClick={() => {
                dispatch(changeEmail(edit.email.trim()));
                setEdit(state => ({ ...state, email: '' }))}}
            >
              {edit.email.trim().length > 0 ? 'Update' : 'Edit'}
            </button>
          </div>
              
          <div className='userEdit__block'>
            <input
              className='userEdit__block--input'
              type="text"
              onChange={(event) => setEdit(state => ({ ...state, phone: event.target.value }))}
              value={edit.phone.trim().length > 0 ? edit.phone : ''}
              placeholder={user.phone}
            />
            <button
              className={classNames(
                'userEdit__block--button',
                { 'userEdit__block--active': edit.phone.trim().length > 0 }
              )}
              disabled={edit.phone.trim().length > 0 ? false : true}
              onClick={() => {
                dispatch(changePhone(edit.phone.trim()));
                setEdit(state => ({ ...state, phone: '' }))}}
            >
              {edit.phone.trim().length > 0 ? 'Update' : 'Edit'}
            </button>
          </div>

          <div className='userEdit__block'>
            <input
              className='userEdit__block--input'
              type="text"
              onChange={(event) => setEdit(state => ({ ...state, city: event.target.value }))}
              value={edit.city.trim().length > 0 ? edit.city : ''}
              placeholder={user.location.city}
            />
            <button
              className={classNames(
                'userEdit__block--button',
                { 'userEdit__block--active': edit.city.trim().length > 0 }
              )}
              disabled={edit.city.trim().length > 0 ? false : true}
              onClick={() => {
                dispatch(changeCity(edit.city.trim()));
                setEdit(state => ({ ...state, city: '' }))}}
            >
              {edit.city.trim().length > 0 ? 'Update' : 'Edit'}
            </button>
          </div>

          <div className='userEdit__block'>
            <input
              className='userEdit__block--input'
              type="text"
              onChange={(event) => setEdit(state => ({ ...state, location: event.target.value }))}
              value={edit.location.trim().length > 0 ? edit.location : ''}
              placeholder={user.street}
            />
            <button
              className={classNames(
                'userEdit__block--button',
                { 'userEdit__block--active': edit.location.trim().length > 0 }
              )}
              disabled={edit.location.trim().length > 0 ? false : true}
              onClick={() => {
                dispatch(changeLocation(edit.location.trim()));
                setEdit(state => ({ ...state, location: '' }))}}
            >
              {edit.location.trim().length > 0 ? 'Update' : 'Edit'}
            </button>
          </div>

          <div className='userEdit__block'>
            <input
              className='userEdit__block--input'
              type="text"
              onChange={(event) => setEdit(state => ({ ...state, date: event.target.value }))}
              value={edit.date.trim().length > 0 ? edit.date : ''}
              placeholder={user.newDate}
            />
            <button
              className={classNames(
                'userEdit__block--button',
                { 'userEdit__block--active': edit.date.trim().length > 0 }
              )}
              disabled={edit.date.trim().length > 0 ? false : true}
              onClick={() => {
                dispatch(changeDate(edit.date.trim()));
                setEdit(state => ({ ...state, date: '' }))}}
            >
              {edit.date.trim().length > 0 ? 'Update' : 'Edit'}
            </button>
          </div>

          {errorDate && <span>The date is incorrect! Try again!</span>}
        </div>
      </div>
    </div>
    
  )
}