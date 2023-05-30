import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  signe: '',
  lang: '',
  date: ''
};

const mySlice = createSlice({
  name: 'mySlice',
  initialState,
  reducers: {
    setLoadData: (state, action) => {
      const { signe, lang, date } = action.payload;
      state.signe = signe !== undefined ? signe : state.signe;
      state.lang = lang !== undefined ? lang : state.lang;
      state.date = date !== undefined ? date : state.date;
    },
  },
});

export const { setLoadData } = mySlice.actions;
export default mySlice.reducer;