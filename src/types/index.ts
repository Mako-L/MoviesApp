export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path?: string;
    backdrop_path?: string;
    genre_ids?: number[];
    original_language?: string;
    original_title?: string;
    popularity?: number;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
}

export interface MovieDetail extends Movie {
    adult: boolean;
    belongs_to_collection: null | object;
    budget: number;
    genres: Genre[];
    homepage: string;
    imdb_id: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
}

export interface MoviesState {
    movies: Movie[];
    movieDetail: MovieDetail | null;
    error: string | null;
    totalItems: number;
    moviesLoading: boolean;
    movieDetailLoading: boolean;
    page: number;
    offline: boolean;
}


export const FETCH_TOP_MOVIES_SUCCESS = 'FETCH_TOP_MOVIES_SUCCESS';
export const FETCH_TOP_MOVIES_FAILURE = 'FETCH_TOP_MOVIES_FAILURE';
export const FETCH_MOVIE_DETAILS_SUCCESS = 'FETCH_MOVIE_DETAILS_SUCCESS';
export const FETCH_MOVIE_DETAILS_FAILURE = 'FETCH_MOVIE_DETAILS_FAILURE';
export const UPDATE_NUMBER_OF_ITEMS = 'UPDATE_NUMBER_OF_ITEMS';
export const UPDATE_MOVIES_LOADING = 'UPDATE_MOVIES_LOADING';
export const UPDATE_MOVIE_DETAIL_LOADING = 'UPDATE_MOVIE_DETAIL_LOADING';
export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE';

interface FetchTopMoviesSuccessAction {
    type: typeof FETCH_TOP_MOVIES_SUCCESS;
    payload: Movie[];
}

interface FetchTopMoviesFailureAction {
    type: typeof FETCH_TOP_MOVIES_FAILURE;
    payload: string;
}

interface FetchMovieDetailsSuccessAction {
    type: typeof FETCH_MOVIE_DETAILS_SUCCESS;
    payload: MovieDetail;
}

interface FetchMovieDetailsFailureAction {
    type: typeof FETCH_MOVIE_DETAILS_FAILURE;
    payload: string;
}

interface UpdateNumberOfItemsAction {
    type: typeof UPDATE_NUMBER_OF_ITEMS;
    payload: number;
}

interface UpdateMoviesLoadingAction {
    type: typeof UPDATE_MOVIES_LOADING;
    payload: boolean;
}

interface UpdateMovieDetailLoadingAction {
    type: typeof UPDATE_MOVIE_DETAIL_LOADING;
    payload: boolean;
}

interface UpdatePageAction {
    type: typeof UPDATE_PAGE;
    payload: number;
}

interface UpdateOfflineAction {
    type: typeof UPDATE_OFFLINE;
    payload: boolean;
}

export interface Props {
    route: {
        params: {
            movieId: number;
        }
    },
    navigation:any
}

export type MovieActionTypes = FetchTopMoviesSuccessAction | FetchTopMoviesFailureAction | FetchMovieDetailsSuccessAction | FetchMovieDetailsFailureAction | UpdateNumberOfItemsAction | UpdateMoviesLoadingAction | UpdateMovieDetailLoadingAction | UpdatePageAction | UpdateOfflineAction;
