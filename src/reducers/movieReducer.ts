import { MoviesState, MovieActionTypes, FETCH_TOP_MOVIES_SUCCESS, FETCH_TOP_MOVIES_FAILURE, FETCH_MOVIE_DETAILS_SUCCESS, FETCH_MOVIE_DETAILS_FAILURE,UPDATE_NUMBER_OF_ITEMS,UPDATE_MOVIES_LOADING,UPDATE_MOVIE_DETAIL_LOADING,UPDATE_PAGE,UPDATE_OFFLINE } from '../types';

const initialState: MoviesState = {
    movies: [],
    movieDetail: null,
    error: null,
    totalItems:0,
    page:1,
    moviesLoading:true,
    movieDetailLoading:true,
    offline:false
};

export default function movieReducer(state = initialState, action: MovieActionTypes): MoviesState {
    switch (action.type) {
        case FETCH_TOP_MOVIES_SUCCESS:
            return {
                ...state,
                movies: action.payload,
                error: null
            };
        case FETCH_TOP_MOVIES_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        case FETCH_MOVIE_DETAILS_SUCCESS:
            return {
                ...state,
                movieDetail: action.payload,
                error: null
            };
        case FETCH_MOVIE_DETAILS_FAILURE:
            return {
                ...state,
                movieDetail: null,
                error: action.payload
            };
        case UPDATE_NUMBER_OF_ITEMS:
            return {
                ...state,
                totalItems: action.payload
            };
        case UPDATE_MOVIES_LOADING:
            return {
                ...state,
                moviesLoading: action.payload
            };
        case UPDATE_MOVIE_DETAIL_LOADING:
            return {
                ...state,
                movieDetailLoading: action.payload
            };
        case UPDATE_PAGE:
            return {
                ...state,
                page: action.payload
            };
        case UPDATE_OFFLINE:
            return {
                ...state,
                offline: action.payload
            };
        default:
            return state;
    }
}
