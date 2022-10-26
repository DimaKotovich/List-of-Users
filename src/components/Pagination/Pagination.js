import React, { useEffect } from 'react';
import './Pagination.scss'
import classNames from 'classnames';
import { useDispatch,useSelector } from 'react-redux';
import { setPage, getUsers, paginate } from '../../Redux/redux';

export const Pagination = () => {
  const pageNumbers = [];

  const dispatch = useDispatch();

  const userList = useSelector(
    state => state.users.userList
  );

  const users = useSelector(
    state => state.users.users
  );

  const currentPage = useSelector(
    state => state.users.currentPage
  );

  const changePage = (number) => {
    dispatch(setPage(number));
    dispatch(paginate());
  }

  const data = () => {
    if (users.length === 0) {
      dispatch(getUsers(userList));
    } else if (users.length < userList) {
      dispatch(getUsers(userList - users.length));
    }
  }


  for (let i = 1; i <= Math.ceil(500 / userList); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    data();
    dispatch(paginate());
  },[currentPage, userList]);

  return (
    <div>
      {pageNumbers.length > 1 &&
        <ul className='list'>
          {
            pageNumbers.slice(currentPage === 1 ? currentPage -1 : currentPage - 2 ,currentPage+1).map(number => (
              <li key={number}
                className= 'list__item'>
                <div className={classNames(
                  'list__item--link',
                  { 'list__item--active': currentPage === number }
                )}
                  onClick={() => changePage(number)}
                  >
                  {number}
                </div>
              </li>
            ))
          }
        </ul>
      }
    </div>
  );

}