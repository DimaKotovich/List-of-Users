import { createAction, createAsyncThunk,createSlice } from "@reduxjs/toolkit";

const URL = `https://randomuser.me/api/?page=1`

export const getUsers = createAsyncThunk (
  'users/getUsers',
  async (count) => {
    const response = await fetch(`${URL}&&results=${count}`);
    const json = await response.json();
    return json.results;
  }
);

export const currentUser = createAction('CURRENTUSER');
export const filterGender = createAction('FILTERGENDER');
export const searchName = createAction('SEARCHNAME');
export const filter = createAction('FILTER');
export const filterAge = createAction('FILTERAGE');

export const changeName = createAction('CHANGENAME');
export const changeEmail = createAction('CHANGEEMAIL');
export const changePhone = createAction('CHANGEPHONE');
export const changeCity = createAction('CHANGECITY');
export const changeLocation = createAction('CHANGELOCATION');
export const changeDate = createAction('CHANGEDATE');

export const setPage = createAction('SETPAGE');
export const changeUserList = createAction('CHANGEUSERLIST');
export const paginate = createAction('PAGINATE');

export const deleteUser = createAction('DELETEUSER');
export const editUser = createAction('EDITEUSER');
export const changeUsers = createAction('CHANGEUSERS');

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    usersData: [],
    users: [],
    filterUsers: [],
    currentUsers: {},
    month: {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December'
    },
    userList: 50,
    currentPage: 1,
    lastCityIndex: 0,
    firstCityIndex: 0,
    sortBy: 'custom sort',
    errorDate: false,
    isLoading: false,
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.usersData = state.usersData.concat(action.payload);
      state.usersData = state.usersData.map(el => {
        return {...el,
          newName: `${el.name.first} ${el.name.last}`,
          newDate: `${el.dob.date.slice(8,10)}.${el.dob.date.slice(5,7)}.${el.dob.date.slice(0,4)}`,
          street: `${el.location.street.name} ${el.location.street.number}`,
          index: state.usersData.indexOf(el)
        }
      });
      state.filterUsers = state.usersData;
      state.users = state.usersData.slice(state.firstCityIndex, state.lastCityIndex);
      state.isLoading = false;
    },
    [getUsers.rejected]: (state) => {
      state.isLoading = false;
    },
    [currentUser]: (state, action) => {
      state.currentUsers = action.payload;
    },
    [filterGender]: (state, action) => {
      state.filterUsers = state.usersData.filter(function (e) {
        return e.gender === action.payload.toLowerCase();
      });
      state.users = state.filterUsers.slice(state.firstCityIndex, state.lastCityIndex);
    },
    [filter]: (state,action) => {
      state.sortBy = action.payload;
      if (state.sortBy === 'city') {
        state.filterUsers = state.filterUsers.sort(function (a, b) {
          if (a.location.city > b.location.city) {
            return 1;
          }
          if (a.location.city < b.location.city) {
            return -1;
          }
          return 0;
        });
        state.users = state.filterUsers.slice(state.firstCityIndex, state.lastCityIndex);
      } else if (state.sortBy === 'name') {
        state.users = state.filterUsers.sort(function (a, b) {
          if (a.name.first > b.name.first) {
            return 1;
          }
          if (a.name.first < b.name.first) {
            return -1;
          }
          return 0;
        });
        state.users = state.filterUsers.slice(state.firstCityIndex, state.lastCityIndex);
      } else if (state.sortBy === 'date') {
        state.users = state.filterUsers.sort(function(a, b){
          return b.dob.age - a.dob.age
        });
        state.users = state.filterUsers.slice(state.firstCityIndex, state.lastCityIndex);
      } else if (state.sortBy === 'custom sort') {
        state.users = state.usersData;
        state.filterUsers = state.usersData;
      } 
    },
    [filterAge]: (state,action) => {
      state.filterUsers = state.usersData.filter(function (e) {
        return e.dob.age > action.payload[0] && e.dob.age < action.payload[1]
      });
      state.users = state.filterUsers.slice(state.firstCityIndex, state.lastCityIndex);
    },
    [searchName]: (state,action) => {
      state.users = state.filterUsers.filter(function (e) {
        return e.newName.trim().slice(0,action.payload.length).toLowerCase() === action.payload.toLowerCase();
      });
    },
    [changeName]: (state,action) => {
      state.currentUsers.newName = action.payload;
    },
    [changeEmail]: (state,action) => {
      state.currentUsers.email = action.payload;
    },
    [changePhone]: (state,action) => {
      state.currentUsers.phone = action.payload;
    },
    [changeCity]: (state,action) => {
      state.currentUsers.location.city = action.payload;
    },
    [changeLocation]: (state,action) => {
      state.currentUsers.street = action.payload;
    },
    [changeDate]: (state,action) => {
      if (action.payload.length !== 10) {
        state.errorDate = true;
      } else if (state.month[action.payload.slice(3,5)] === undefined) {
        state.errorDate = true;
      } else {
        state.currentUsers.newDate = action.payload;
        state.errorDate = false;
      }
    },
    [deleteUser]: (state,action) => {
      state.users = state.users.filter(function (e) {
        return e.login.username !== action.payload;
      });
    },
    [editUser]: (state) => {
      state.users = state.users.map(el => {
        if (el.login.username === state.currentUsers.login.username) {
          return {...el,
            newName: state.currentUsers.newName,
            email: state.currentUsers.email,
            phone: state.currentUsers.phone,
            location: {...el.location, city: state.currentUsers.location.city},
            street: state.currentUsers.street,
            newDate: state.currentUsers.newDate
          }
        }
        return el;
      })
      state.filterUsers = state.filterUsers.map(el => {
        if (el.login.username === state.currentUsers.login.username) {
          return {...el,
            newName: state.currentUsers.newName,
            email: state.currentUsers.email,
            phone: state.currentUsers.phone,
            location: {...el.location, city: state.currentUsers.location.city},
            street: state.currentUsers.street,
            newDate: state.currentUsers.newDate
          }
        }
        return el;
      })
      state.usersData = state.usersData.map(el => {
        if (el.login.username === state.currentUsers.login.username) {
          return {...el,
            newName: state.currentUsers.newName,
            email: state.currentUsers.email,
            phone: state.currentUsers.phone,
            location: {...el.location, city: state.currentUsers.location.city},
            street: state.currentUsers.street,
            newDate: state.currentUsers.newDate
          }
        }
        return el;
      })
      state.errorDate = false;
    },
    [setPage]: (state,action) => {
      state.currentPage = action.payload;
    },
    [changeUserList]: (state, action) => {
      state.userList = action.payload;
    },
    [paginate]: (state) => {
      state.lastCityIndex = state.currentPage * state.userList;
      state.firstCityIndex = state.lastCityIndex - state.userList;
      state.users = state.filterUsers.slice(state.firstCityIndex, state.lastCityIndex);
    },
    [changeUsers]: (state,action) => {
      state.filterUsers = state.filterUsers.map(c => {
        if (c.index === action.payload.index) {
          return {...c, index: state.currentUsers.index}
        }
        if (c.index === state.currentUsers.index) {
          return {...c, index: action.payload.index}
        }
        return c
      });
      state.filterUsers = state.filterUsers.slice().sort(function (a, b) {
        if (a.index > b.index) {
          return 1;
        } else {
          return -1;
        }
      })
      state.users = state.filterUsers.slice(state.firstCityIndex, state.lastCityIndex);
    },
  },
  reducers: undefined
}
);

export default userSlice.reducer;
