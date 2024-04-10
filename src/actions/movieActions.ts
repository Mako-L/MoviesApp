// Import necessary modules from Redux, Axios for HTTP requests, AsyncStorage for local storage, and NetInfo for network information
import { Dispatch } from 'redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { 
    FETCH_TOP_MOVIES_SUCCESS, FETCH_TOP_MOVIES_FAILURE, MovieActionTypes, 
    FETCH_MOVIE_DETAILS_SUCCESS, FETCH_MOVIE_DETAILS_FAILURE, 
    UPDATE_NUMBER_OF_ITEMS, UPDATE_MOVIES_LOADING, UPDATE_MOVIE_DETAIL_LOADING, 
    UPDATE_PAGE, UPDATE_OFFLINE 
} from '../types'; // Import action types and interfaces

const API_KEY = `${process.env.EXPO_PUBLIC_API_KEY}`; // Retrieve API key from environment variables

// Action creator to update the current page number in the store
export const updatePage = (page: number) => (dispatch: Dispatch<MovieActionTypes>) => {
    dispatch({
        type: UPDATE_PAGE, // Dispatch an action to update the page number
        payload: page
    });
};

// Asynchronous action creator for fetching top-rated movies
export const fetchTopMovies = (page: number) => async (dispatch: Dispatch<MovieActionTypes>) => {
    const isConnected = await NetInfo.fetch().then(state => state.isConnected); // Check network connection status
    if (isConnected) { // Proceed if there is an internet connection
        try {
            dispatch({ type: UPDATE_MOVIES_LOADING, payload: true }); // Indicate that movie loading has started
            const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`, {
                headers: { Authorization: `Bearer ${API_KEY}` } // Use API key for authorization
            });
            if (page === 1) { // Store the first page of results in AsyncStorage for offline access
                await AsyncStorage.setItem('topMovies', JSON.stringify(response.data.results));
            }
            dispatch({ type: FETCH_TOP_MOVIES_SUCCESS, payload: response.data.results }); // Dispatch success action with the movies data
            dispatch({ type: UPDATE_NUMBER_OF_ITEMS, payload: response.data.total_results }); // Update the total number of items
            dispatch({ type: UPDATE_MOVIES_LOADING, payload: false }); // Indicate that movies loading has finished
            dispatch({ type: UPDATE_OFFLINE, payload: false }); // Indicate the app is Online
        } catch (error) {
            dispatch({ type: FETCH_TOP_MOVIES_FAILURE, payload: 'Failed to fetch movies' }); // Dispatch failure action if request fails
            dispatch({ type: UPDATE_MOVIES_LOADING, payload: false }); // Indicate that movies loading has finished
        }
    } else { // Handle the case where there is no internet connection
        try {
            dispatch({ type: UPDATE_OFFLINE, payload: true }); // Indicate the app is offline
            dispatch({ type: UPDATE_MOVIES_LOADING, payload: true }); // Indicate that movie loading has started
            const storedMovies = await AsyncStorage.getItem('topMovies'); // Attempt to retrieve stored movies from AsyncStorage
            if (storedMovies !== null) {
                dispatch({ type: FETCH_TOP_MOVIES_SUCCESS, payload: JSON.parse(storedMovies) }); // Dispatch success with stored movies
            } else {
                dispatch({ type: FETCH_TOP_MOVIES_FAILURE, payload: 'No offline data available' }); // Dispatch failure if no data is available
            }
        } catch (error) {
            dispatch({ type: FETCH_TOP_MOVIES_FAILURE, payload: 'Failed to access offline data' }); // Dispatch failure if accessing AsyncStorage fails
        } finally {
            dispatch({ type: UPDATE_MOVIES_LOADING, payload: false }); // Ensure loading state is reset
        }
    }
};

// Asynchronous action creator to fetch details for a specific movie
export const fetchMovieDetails = (movieId: number) => async (dispatch: Dispatch<MovieActionTypes>) => {
    try {
        dispatch({ type: UPDATE_MOVIE_DETAIL_LOADING, payload: true }); // Indicate that movie detail loading has started
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?&language=en-US`, {
            headers: { Authorization: `Bearer ${API_KEY}` } // Use API key for authorization
        });
        dispatch({ type: FETCH_MOVIE_DETAILS_SUCCESS, payload: response.data }); // Dispatch success action with the movie details
        dispatch({ type: UPDATE_OFFLINE, payload: false }); // Indicate the app is Online
    } catch (error) {
        dispatch({ type: FETCH_MOVIE_DETAILS_FAILURE, payload: 'Failed to fetch movie details' }); // Dispatch failure action if request fails
    } finally {
        dispatch({ type: UPDATE_MOVIE_DETAIL_LOADING, payload: false }); // Ensure loading state is reset
    }
};

// Asynchronous action creator to search movies based on a query string
export const searchMovies = (query: string, page: number) => async (dispatch: Dispatch<MovieActionTypes>) => {
    dispatch({ type: UPDATE_MOVIES_LOADING, payload: true }); // Indicate that movie loading has started

    try {
        const isConnected = await NetInfo.fetch().then(state => state.isConnected); // Check network connection status
        if (!isConnected) { // Handle the case where there is no internet connection
            dispatch({ type: UPDATE_MOVIES_LOADING, payload: false }); // Reset loading state
            return dispatch({ type: FETCH_TOP_MOVIES_FAILURE, payload: "Cannot search with no internet connection" }); // Dispatch failure action
        } else {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
                headers: { Authorization: `Bearer ${API_KEY}` }, // Use API key for authorization
                params: { language: 'en-US', query: query, page: page, include_adult: false } // Parameters for the API request
            });

            dispatch({ type: FETCH_TOP_MOVIES_SUCCESS, payload: response.data.results }); // Dispatch success action with the search results
            dispatch({ type: UPDATE_NUMBER_OF_ITEMS, payload: response.data.total_results }); // Update the total number of items
            dispatch({ type: UPDATE_OFFLINE, payload: false }); // Indicate the app is Online
        }
    } catch (error) {
        dispatch({ type: FETCH_TOP_MOVIES_FAILURE, payload: 'Failed to fetch movies' }); // Dispatch failure action if request fails
    } finally {
        dispatch({ type: UPDATE_MOVIES_LOADING, payload: false }); // Ensure loading state is reset
    }
};
