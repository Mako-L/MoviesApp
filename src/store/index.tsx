import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { AppState } from '../reducers';

const store = configureStore({
    reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;

export default store;
