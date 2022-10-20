import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

const URL = `https://randomuser.me/api/?page=1&results=5`

export const getUsers = createAsyncThunk (
  'users/getUsers',
  async () => {
    const response = await fetch(URL);
    const json = await response.json();
    return json.results;
  }
);

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    isLoading: false,
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    },
    [getUsers.rejected]: (state) => {
      state.isLoading = false;
    },
  },
  reducers: undefined
}
);

export default userSlice.reducer;
