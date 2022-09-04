import {createSlice} from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: 'app',
  initialState: {
    viewMode: 'mix',
    alert: {
      show: false,
      message: '',
      type: '',
    },
  },
  reducers: {
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
  },
});

export default appSlice.reducer;
export const {setViewMode, setAlert} = appSlice.actions;