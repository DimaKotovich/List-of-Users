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
export const changeUserList = createAction('CHANGEUSERLIST');

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    usersData: [],
    users: [],
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
    userList: 5,
    isLoading: false,
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.usersData = action.payload;
      state.users = action.payload;
      state.isLoading = false;
    },
    [getUsers.rejected]: (state) => {
      state.isLoading = false;
    },
    [currentUser]: (state, action) => {
      state.currentUsers = action.payload;
    },
    [filterGender]: (state, action) => {
      state.users = state.usersData.filter(function (e) {
        return e.gender === action.payload.toLowerCase();
      });;
    },
    [changeUserList]: (state, action) => {
      state.userList = action.payload;
    },
  },
  reducers: undefined
}
);

export default userSlice.reducer;
