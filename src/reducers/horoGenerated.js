import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  signe: null,
  lang: null,
  date: null,
  horoscope: null,
  error: null
};

const mySlice = createSlice({
  name: 'mySlice',
  initialState,
  reducers: {
    setLoadData: (state, action) => {
      const { signe, lang, date, horoscope, error } = action.payload;
      state.signe = signe !== undefined ? signe : state.signe;
      state.lang = lang !== undefined ? lang : state.lang;
      state.date = date !== undefined ? date : state.date;
      state.horoscope = horoscope !== undefined ? horoscope : state.horoscope;
      state.error = error !== undefined ? error : state.error;
    },
  },
});

export const { setLoadData } = mySlice.actions;
export default mySlice.reducer;