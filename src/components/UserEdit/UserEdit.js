import React from 'react';
import { Link } from 'react-router-dom';
import './UserEdit.scss';



export const UserEdit = () => {

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
            src="https://randomuser.me/api/portraits/women/66.jpg"
            alt="UserLogo"
            className='userEdit__left--image'
          />
          <span className='userEdit__left--name'>John Doe</span>
          <span className='userEdit__left--date'>15 Oktober 1990</span>
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
              placeholder='John Doel'
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
              placeholder='john@doe.com'
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
              placeholder='+3809999999999'
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
              placeholder='Kyiv'
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
              placeholder='khreschatyk 123'
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
              placeholder='10.10.1990'
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