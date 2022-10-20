import React, { FC, useState } from 'react';
import classNames from 'classnames';
import './Filter.scss';

export const Filter = () => {

  const [gender,setGender] = useState('Male');
  const [value,setValue] = useState(2);

  const handleChange = (event: any) => {
    setValue(event.target.value);
    console.log(event)
  }

  return (
    <div className='filter'>
      <h1 className='filter__title'>Filter</h1>
      <div className='filter__wrapper'>
        <div className='filter__search'>
          <span className='filter__search--title'>Name</span>
          <input
            className='filter__search--input'
            type="text" 
            // required onChange={change} 
            // value={search}
            placeholder='Search by name'
          />
        </div>

        <div className='filter__age'>
          <span className='filter__search--title'>Age</span>
          <input
            className='filter__age--slider'
            type="range"
            defaultValue={value}
            onChange={handleChange}
            min={1}
            max={100}
            step={1}
          >
          </input>
          <span className='filter__age--text'>{value === 2 ? value : `1 - ${value}`}</span>
        </div>

        <div className='filter__gender'>
          <span className='filter__search--title'>Gender</span>
          <div className='buttons'>
            <button
              className={gender === 'Male' ? 'buttons__active' : 'buttons__nonActive'}
              onClick={(() => { setGender('Male'); })}>
                Male
            </button>
            <button 
              className={gender === 'Female' ? 'buttons__active' : 'buttons__nonActive'}
              onClick={(() => { setGender('Female'); })}>
                Female
            </button>
          </div>
        </div>

        <div className='filter__sort'>
          <span className='filter__search--title'>Gender</span>
          <select className='filter__sort--select'>
            <option value="name">Name</option>
            <option value="date">Date of birth</option>
            <option value="city">City</option>
          </select>
        </div>
      </div>
    </div>
    
  )
}