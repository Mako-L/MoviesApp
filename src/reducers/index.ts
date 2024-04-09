// Import combineReducers from Redux to combine several reducers into one
import { combineReducers } from 'redux';
// Import the movieReducer to manage movie-related state
import movieReducer from './movieReducer';

// Combine all reducers into a single root reducer; only movieReducer is used
const rootReducer = combineReducers({
    movies: movieReducer // Assigns movieReducer to the 'movies' slice of the state
});

// Define the AppState type based on the rootReducer's return type
export type AppState = ReturnType<typeof rootReducer>;

// Export the rootReducer, which will be used to create the Redux store
export default rootReducer;
