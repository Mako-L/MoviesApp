// Import configureStore utility from Redux Toolkit, which provides simplified configuration options and good defaults
import { configureStore } from '@reduxjs/toolkit';
// Import rootReducer, which combines all the reducers in the application
import rootReducer from '../reducers';

// Create the Redux store using configureStore, which automatically sets up the Redux DevTools and middleware
const store = configureStore({
    reducer: rootReducer // rootReducer combines all the application's reducers into one
});

// Define a type for the dispatch function from the store
export type AppDispatch = typeof store.dispatch;

// Export the configured store as the default export
export default store;
