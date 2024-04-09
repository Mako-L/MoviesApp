import { Dispatch } from 'redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { FETCH_TOP_MOVIES_SUCCESS, FETCH_TOP_MOVIES_FAILURE, MovieActionTypes, FETCH_MOVIE_DETAILS_SUCCESS, FETCH_MOVIE_DETAILS_FAILURE, UPDATE_NUMBER_OF_ITEMS, UPDATE_MOVIES_LOADING, UPDATE_MOVIE_DETAIL_LOADING, UPDATE_PAGE, UPDATE_OFFLINE, Movie } from '../types';

const API_KEY = `${process.env.API_KEY}`;


export const updatePage = (page: number) => (dispatch: Dispatch<MovieActionTypes>) => {
    dispatch({
        type: UPDATE_PAGE,
        payload: page
    })
}

export const fetchTopMovies = (page: number) => async (dispatch: Dispatch<MovieActionTypes>) => {
    const isConnected = await NetInfo.fetch().then(state => state.isConnected);
    if (isConnected) {
        try {
            dispatch({
                type: UPDATE_MOVIES_LOADING,
                payload: true
            });
            const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`
                }
            });
            if (page === 1) {
                await AsyncStorage.setItem('topMovies', JSON.stringify(response.data.results));
            }
            dispatch({
                type: FETCH_TOP_MOVIES_SUCCESS,
                payload: response.data.results
            });
            dispatch({
                type: UPDATE_NUMBER_OF_ITEMS,
                payload: response.data.total_results
            });
            dispatch({
                type: UPDATE_MOVIES_LOADING,
                payload: false
            });
        } catch (error) {
            dispatch({
                type: FETCH_TOP_MOVIES_FAILURE,
                payload: 'Failed to fetch movies'
            });
            dispatch({
                type: UPDATE_MOVIES_LOADING,
                payload: false
            });
        }
    } else {
        try {
            dispatch({
                type: UPDATE_OFFLINE,
                payload: true
            });
            dispatch({
                type: UPDATE_MOVIES_LOADING,
                payload: true
            });
            const storedMovies = await AsyncStorage.getItem('topMovies');
            if (storedMovies !== null) {
                dispatch({
                    type: FETCH_TOP_MOVIES_SUCCESS,
                    payload: JSON.parse(storedMovies)
                });
            } else {
                dispatch({
                    type: FETCH_TOP_MOVIES_FAILURE,
                    payload: 'No offline data available'
                });
            }
        } catch (error) {
            dispatch({
                type: FETCH_TOP_MOVIES_FAILURE,
                payload: 'Failed to access offline data'
            });
        } finally {
            dispatch({
                type: UPDATE_MOVIES_LOADING,
                payload: false
            });
        }
    }
};

export const fetchMovieDetails = (movieId: number) => async (dispatch: Dispatch<MovieActionTypes>) => {
    try {
        dispatch({
            type: UPDATE_MOVIE_DETAIL_LOADING,
            payload: true
        });
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?&language=en-US`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
        });
        dispatch({
            type: FETCH_MOVIE_DETAILS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: FETCH_MOVIE_DETAILS_FAILURE,
            payload: 'Failed to fetch movie details'
        });
    } finally {
        dispatch({
            type: UPDATE_MOVIE_DETAIL_LOADING,
            payload: false
        });
    }
};

export const searchMovies = (query: string, page: number) => async (dispatch: Dispatch<MovieActionTypes>) => {
    dispatch({ type: UPDATE_MOVIES_LOADING, payload: true });

    try {
        const isConnected = await NetInfo.fetch().then(state => state.isConnected);
        if (!isConnected) {
            dispatch({ type: UPDATE_MOVIES_LOADING, payload: false });
            return dispatch({ type: FETCH_TOP_MOVIES_FAILURE, payload: "Cannot search with no internet connection" });
        } else {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
                headers: { Authorization: `Bearer ${API_KEY}` },
                params: {
                    language: 'en-US',
                    query: query,
                    page: page,
                    include_adult: false
                }
            });

            dispatch({
                type: FETCH_TOP_MOVIES_SUCCESS,
                payload: response.data.results
            });
            dispatch({
                type: UPDATE_NUMBER_OF_ITEMS,
                payload: response.data.total_results
            });
        }
    } catch (error) {
        dispatch({ type: FETCH_TOP_MOVIES_FAILURE, payload: 'Failed to fetch movies' });
    } finally {
        dispatch({ type: UPDATE_MOVIES_LOADING, payload: false });
    }
};