import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

const URL = `https://randomuser.me/api/?page=1`

export const getUsers = createAsyncThunk (
  'users/getUsers',
  async (count) => {
    const response = await fetch(`${URL}&&results=${count}`);
    const json = await response.json();
    return json.results;
  }
);

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
    gender: '',
    age: [1,100],
    name: '',
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
      state.filterUsers = state.usersData.filter(function (e) {
        if (e.gender === state.gender.toLowerCase() || state.gender === '' &&
        e.dob.age > state.age[0] && e.dob.age < state.age[1] &&
        e.newName.trim().slice(0,state.name.length).toLowerCase() === state.name.toLowerCase()
        ) {
          return e;
        }
      });
      state.users = state.filterUsers.slice(state.firstCityIndex, state.lastCityIndex);
      state.isLoading = false;
    },
    [getUsers.rejected]: (state) => {
      state.isLoading = false;
    }
  },
  reducers: {
    currentUser(state, action) {
      state.currentUsers = action.payload;
    },
    filterGender(state, action) {
      if (action.payload[0] === 'gender') {
        state.gender = action.payload[1];
      } else if (action.payload[0] === 'age') {
        state.age = action.payload[1];
      } else if (action.payload[0] === 'name') {
        state.name = action.payload[1];
      }
      state.filterUsers = state.usersData.filter(function (e) {
        let age = e.gender === state.gender.toLowerCase() || state.gender === ''
        if (age === true &&
        e.dob.age > state.age[0] && e.dob.age < state.age[1] &&
        e.newName.trim().slice(0,state.name.length).toLowerCase() === state.name.toLowerCase()
        ) {
          return e;
        }
      });
      state.users = state.filterUsers.slice(state.firstCityIndex, state.lastCityIndex);
    },
    filter(state,action) {
      state.sortBy = action.payload;
      if (state.sortBy === 'city') {
        state.users = state.users.sort(function (a, b) {
          if (a.location.city > b.location.city) {
            return 1;
          }
          if (a.location.city < b.location.city) {
            return -1;
          }
          return 0;
        });
        state.users = state.users;
      } else if (state.sortBy === 'name') {
        state.users = state.users.sort(function (a, b) {
          if (a.name.first > b.name.first) {
            return 1;
          }
          if (a.name.first < b.name.first) {
            return -1;
          }
          return 0;
        });
        state.users = state.users;
      } else if (state.sortBy === 'date') {
        state.users = state.users.sort(function(a, b){
          return b.dob.age - a.dob.age
        });
        state.users = state.users;
      } else if (state.sortBy === 'custom sort') {
        state.users = state.usersData;
        state.users = state.usersData;
        state.gender = '';
      } 
    },
    changeName(state,action) {
      state.currentUsers.newName = action.payload;
    },
    changeEmail(state,action) {
      state.currentUsers.email = action.payload;
    },
    changePhone(state,action) {
      state.currentUsers.phone = action.payload;
    },
    changeCity(state,action) {
      state.currentUsers.location.city = action.payload;
    },
    changeLocation(state,action) {
      state.currentUsers.street = action.payload;
    },
    changeDate(state,action) {
      if (action.payload.length !== 10) {
        state.errorDate = true;
      } else if (state.month[action.payload.slice(3,5)] === undefined) {
        state.errorDate = true;
      } else {
        state.currentUsers.newDate = action.payload;
        state.errorDate = false;
      }
    },
    deleteUser(state,action) {
      state.users = state.users.filter(function (e) {
        return e.login.username !== action.payload;
      });
    },
    editUser(state) {
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
    setPage(state,action) {
      state.currentPage = action.payload;
    },
    changeUserList(state, action) {
      state.userList = action.payload;
    },
    paginate(state) {
      state.lastCityIndex = state.currentPage * state.userList;
      state.firstCityIndex = state.lastCityIndex - state.userList;
      state.filterUsers = state.usersData.filter(function (e) {
        let age = e.gender === state.gender.toLowerCase() || state.gender === ''
        if (age === true &&
        e.dob.age > state.age[0] && e.dob.age < state.age[1] &&
        e.newName.trim().slice(0,state.name.length).toLowerCase() === state.name.toLowerCase()
        ) {
          return e;
        }
      });
      state.users = state.filterUsers.slice(state.firstCityIndex, state.lastCityIndex);
    },
    changeUsers(state,action) {
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
    }
  }
}
);

export default userSlice.reducer;
export const { 
  setPage, changeUserList,
  paginate, changeUsers,
  editUser, deleteUser,
  changeDate, changeLocation,
  changeCity, changePhone,
  changeEmail, changeName,
  filter, filterGender,
  currentUser
} = userSlice.actions

