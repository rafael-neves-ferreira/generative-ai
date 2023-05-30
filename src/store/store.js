import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import horoGenerated from '@/reducers/horoGenerated';

const store = configureStore({
    reducer: {
        horoGenerated: horoGenerated,
    },
});

export default store;

export const useAppDispatch = () => useDispatch();