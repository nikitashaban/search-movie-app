import { fetchMovie } from "../helpers/helpers";

const ITEMS_HAVE_ERRORED = "ITEMS_HAVE_ERRORED";
const MOVIES_ARE_LOADING = "MOVIES_ARE_LOADING";
const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
const SEARCH_MOVIES_SUCCESS = "SEARCH_MOVIES_SUCCESS";
const FETCH_DETAILS_SUCCESS = "FETCH_DETAILS_SUCCESS";
const IS_MOVIE_FAVORITE = "IS_MOVIE_FAVORITE";
const PAGE_NUMBER = "PAGE_NUMBER";
const SEARCH_INPUT = "SEARCH_INPUT";
const CLEAR_SEARCHED_MOVIES = "CLEAR_SEARCHED_MOVIES";
const FETCH_GENRES_SUCCESS = "FETCH_GENRES_SUCCESS";

const initialState = {
  page: 1,
  searchInput: "",
  topRateMovies: {
    topRateMoviesList: [],
    total_results: 0,
  },
  searchedMovies: {
    searchedMoviesList: [],
    total_results: 0,
  },
  hasErrored: false,
  isLoading: true,
  genres: [],
  filmDetails: {},
  favorites: [],
};

//reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ITEMS_HAVE_ERRORED:
      return {
        ...state,
        hasErrored: payload,
      };
    case MOVIES_ARE_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        topRateMovies: {
          topRateMoviesList: [
            ...state.topRateMovies.topRateMoviesList,
            ...payload.results,
          ],
          total_results: payload.total_results,
        },
      };
    case FETCH_DETAILS_SUCCESS:
      return {
        ...state,
        filmDetails: payload,
      };
    case SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        searchedMovies: {
          searchedMoviesList: [
            ...state.searchedMovies.searchedMoviesList,
            ...payload.results,
          ],
          total_results: payload.total_results,
        },
      };
    case CLEAR_SEARCHED_MOVIES:
      return {
        ...state,
        searchedMovies: {
          ...state.searchedMovies,
          searchedMoviesList: [],
        },
      };
    case IS_MOVIE_FAVORITE:
      return {
        ...state,
        favorites: payload,
      };
    case PAGE_NUMBER: {
      return {
        ...state,
        page: payload,
      };
    }
    case SEARCH_INPUT: {
      return {
        ...state,
        searchInput: payload,
      };
    }
    case FETCH_GENRES_SUCCESS: {
      return {
        ...state,
        genres: payload,
      };
    }
    default:
      return state;
  }
};

//actions creators

export const moviesHaveErrored = (payload) => ({
  type: ITEMS_HAVE_ERRORED,
  payload,
});
export const moviesAreLoading = (payload) => ({
  type: MOVIES_ARE_LOADING,
  payload,
});
export const fetchMoviesSuccess = (payload) => ({
  type: FETCH_MOVIES_SUCCESS,
  payload,
});
export const searchedFilms = (payload) => ({
  type: FETCH_MOVIES_SUCCESS,
  payload,
});
export const saveSearchInput = (payload) => ({
  type: SEARCH_INPUT,
  payload,
});
export const clearSearchMovies = () => ({
  type: CLEAR_SEARCHED_MOVIES,
});
export const fetchMoviesDetailsSuccess = (payload) => ({
  type: FETCH_DETAILS_SUCCESS,
  payload,
});
export const searchMoviesSuccess = (payload) => ({
  type: SEARCH_MOVIES_SUCCESS,
  payload,
});
export const isMovieFavorite = (payload) => ({
  type: IS_MOVIE_FAVORITE,
  payload,
});
export const pageNumberHandler = (payload) => ({ type: PAGE_NUMBER, payload });
export const fetchGenresSuccess = (payload) => ({
  type: FETCH_GENRES_SUCCESS,
  payload,
});

//side effects

//fetching new movies for home page
export const moviesFetchData = () => {
  return (dispatch, getState) => {
    const { page } = getState().movies;

    fetchMovie("movie/popular?", "&page=" + page)
      .then((data) => dispatch(fetchMoviesSuccess(data)))
      .then(() => dispatch(pageNumberHandler(page + 1)))
      .catch(() => dispatch(moviesHaveErrored(true)));
  };
};

// fetching movies according to search input
export const moviesSearchData = (input) => {
  return (dispatch, getState) => {
    const { page } = getState().movies;
    dispatch(saveSearchInput(input));
    dispatch(moviesAreLoading(true));
    fetchMovie(`search/movie?query=${input}`, "&page=" + page)
      .then((data) => dispatch(searchMoviesSuccess(data)))
      .then(() => {
        dispatch(moviesAreLoading(false));
        dispatch(pageNumberHandler(page + 1));
      })
      .catch(() => dispatch(moviesHaveErrored(true)));
  };
};

//handler to show liked movies
export const favoriteMoviesHandler = (currentMovie) => {
  return (dispatch, getState) => {
    const { favorites } = getState().movies;
    const isFavorite = favorites.some((movie) => movie.id === currentMovie.id);
    const updatedList = favorites.filter((el) => el.id !== currentMovie.id);

    if (isFavorite) {
      dispatch(isMovieFavorite(updatedList));
    } else {
      dispatch(isMovieFavorite([...favorites, currentMovie]));
    }
  };
};

//search for details of movie
export const moviesDetailsData = (id) => {
  return (dispatch) => {
    fetchMovie(`movie/${id}?`)
      .then((detail) => dispatch(fetchMoviesDetailsSuccess(detail)))
      .catch(() => dispatch(moviesHaveErrored(true)));
  };
};

//fetch genres
export const fetchGenresHandler = () => {
  return (dispatch) => {
    fetchMovie("genre/movie/list?").then((res) =>
      dispatch(fetchGenresSuccess(res.genres))
    );
  };
};
