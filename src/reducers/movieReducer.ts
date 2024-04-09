// Import action types and the MoviesState interface from types definitions
import { MoviesState, MovieActionTypes, FETCH_TOP_MOVIES_SUCCESS, FETCH_TOP_MOVIES_FAILURE, FETCH_MOVIE_DETAILS_SUCCESS, FETCH_MOVIE_DETAILS_FAILURE, UPDATE_NUMBER_OF_ITEMS, UPDATE_MOVIES_LOADING, UPDATE_MOVIE_DETAIL_LOADING, UPDATE_PAGE, UPDATE_OFFLINE } from '../types';

// Define the initial state for the movies reducer based on the MoviesState interface
const initialState: MoviesState = {
    movies: [],
    movieDetail: null,
    error: null,
    totalItems: 0,
    page: 1,
    moviesLoading: true,
    movieDetailLoading: true,
    offline: false
};

// Define the movieReducer function to handle actions related to movie data
export default function movieReducer(state = initialState, action: MovieActionTypes): MoviesState {
    switch (action.type) {
        case FETCH_TOP_MOVIES_SUCCESS:  // Handle success in fetching top movies
            return {
                ...state,
                movies: action.payload,
                error: null
            };
        case FETCH_TOP_MOVIES_FAILURE:  // Handle failure in fetching top movies
            return {
                ...state,
                error: action.payload
            };
        case FETCH_MOVIE_DETAILS_SUCCESS:  // Handle success in fetching movie details
            return {
                ...state,
                movieDetail: action.payload,
                error: null
            };
        case FETCH_MOVIE_DETAILS_FAILURE:  // Handle failure in fetching movie details
            return {
                ...state,
                movieDetail: null,
                error: action.payload
            };
        case UPDATE_NUMBER_OF_ITEMS:  // Update the total number of items (movies) available
            return {
                ...state,
                totalItems: action.payload
            };
        case UPDATE_MOVIES_LOADING:  // Update the loading state for movie list fetching
            return {
                ...state,
                moviesLoading: action.payload
            };
        case UPDATE_MOVIE_DETAIL_LOADING:  // Update the loading state for movie detail fetching
            return {
                ...state,
                movieDetailLoading: action.payload
            };
        case UPDATE_PAGE:  // Update the current page of the movie list
            return {
                ...state,
                page: action.payload
            };
        case UPDATE_OFFLINE:  // Update the offline status of the app
            return {
                ...state,
                offline: action.payload
            };
        default:  // Return the current state if no action types match
            return state;
    }
}
