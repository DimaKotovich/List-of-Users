import React, {useState } from 'react';
import './Filter.scss';
import { Slider } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import { filterGender, filter} from '../../Redux/redux';

export const Filter = () => {

  const [value,setValue] = useState([1,25]);

  const dispatch = useDispatch();

  const gender = useSelector(
    state => state.users.gender
  );

  const age = useSelector(
    state => state.users.age
  );

  const handleChange = (event) => {
    dispatch(filter(event.target.value));
  }

  const change = (event,data) => {
    setValue(data);
    dispatch(filterGender(['age',data]));

  }

  const seacrhChange = (event) => {
    const search = event.target.value.trim();
    dispatch(filterGender(['name',search]));
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
            required onChange={seacrhChange}
            placeholder='Search by name'
          />
        </div>

        <div className='filter__age'>
          <span className='filter__search--title'>Age</span>
          <Slider
            className='filter__age--slider'
            min={1}
            max={100}
            step={1}
            value={age}
            onChange={change}
          />
          <span className='filter__age--text'>{`${age[0]}-${age[1]}`}</span>
        </div>

        <div className='filter__gender'>
          <span className='filter__search--title'>Gender</span>
          <div className='buttons'>
            <button
              className={gender === 'Male' ? 'buttons__active' : 'buttons__nonActive'}
              onClick={(() => {dispatch(filterGender(['gender','Male']))})}>
                Male
            </button>
            <button 
              className={gender === 'Female' ? 'buttons__active' : 'buttons__nonActive'}
              onClick={(() => {dispatch(filterGender(['gender','Female']))})}>
                Female
            </button>
          </div>
        </div>

        <div className='filter__sort'>
          <span className='filter__search--title'>Sort By</span>
          <select 
            className='filter__sort--select'
            onChange={handleChange}
          >
            <option value="custom sort">Custom sort</option>
            <option value="name">Name</option>
            <option value="date">Date of birth</option>
            <option value="city">City</option>
          </select>
        </div>
      </div>
    </div>
  );
}