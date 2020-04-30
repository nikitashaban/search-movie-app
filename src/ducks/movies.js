import { fetchMovie } from "../helpers/helpers";

const MOVIES_ARE_LOADING = "MOVIES_ARE_LOADING";
const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
const FETCH_DETAILS_SUCCESS = "FETCH_DETAILS_SUCCESS";
const FETCH_SEARCHED_MOVIES = "FETCH_SEARCHED_MOVIES";
const FETCH_RECOMMENDED_MOVIES = "FETCH_RECOMMENDED_MOVIES";
const FETCH_SIMILAR_MOVIES = "FETCH_SIMILAR_MOVIES";
const IS_MOVIE_FAVORITE = "IS_MOVIE_FAVORITE";
const PAGE_NUMBER = "PAGE_NUMBER";
const FETCH_GENRES_SUCCESS = "FETCH_GENRES_SUCCESS";
const IS_SNACKBAR_OPEN = "IS_SNACKBAR_OPEN";

const initialState = {
  page: 1,
  topRateMovies: {
    topRateMoviesList: [],
    total_results: 0,
  },
  searchedMovies: {
    searchedMoviesList: [],
    total_results: 0,
  },
  recommendedMovies: {
    recommendedMoviesList: [],
    total_recommended: 0,
  },
  similarMovies: {
    similarMoviesList: [],
    total_similar: 0,
  },
  snackbar: false,
  isLoading: true,
  genres: [],
  filmDetails: {},
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
};

//reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case IS_SNACKBAR_OPEN:
      return {
        ...state,
        snackbar: payload,
      };
    case MOVIES_ARE_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case FETCH_SEARCHED_MOVIES:
      return {
        ...state,
        searchedMovies: {
          searchedMoviesList: payload.results,
          total_results: payload.total_results,
        },
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
    case FETCH_RECOMMENDED_MOVIES:
      return {
        ...state,
        recommendedMovies: {
          recommendedMoviesList: payload.results,
          total_recommended: payload.total_results,
        },
      };
    case FETCH_SIMILAR_MOVIES:
      return {
        ...state,
        similarMovies: {
          similarMoviesList: payload.results,
          total_similar: payload.total_results,
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

export const setSnackbar = (payload) => ({
  type: IS_SNACKBAR_OPEN,
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
export const setSearchedFilms = (payload) => ({
  type: FETCH_SEARCHED_MOVIES,
  payload,
});
export const setMoviesDetails = (payload) => ({
  type: FETCH_DETAILS_SUCCESS,
  payload,
});
export const setFavoriteMovie = (payload) => ({
  type: IS_MOVIE_FAVORITE,
  payload,
});
export const setSimilarMovies = (payload) => ({
  type: FETCH_SIMILAR_MOVIES,
  payload,
});
export const setRecommendedMovies = (payload) => ({
  type: FETCH_RECOMMENDED_MOVIES,
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
      .then((data) => {
        dispatch(fetchMoviesSuccess(data));
        dispatch(pageNumberHandler(page + 1));
      })
      .catch((error) => {
        dispatch(setSnackbar({ message: error.message, type: "error" }));
      });
  };
};

// fetching movies according to search input
export const moviesSearchData = (input) => {
  return (dispatch) => {
    dispatch(moviesAreLoading(true));
    fetchMovie(`search/movie?query=${input}&`)
      .then((data) => {
        dispatch(setSearchedFilms(data));
        dispatch(moviesAreLoading(false));
      })
      .catch((error) => {
        dispatch(setSnackbar({ message: error.message, type: "error" }));
      });
  };
};

//handler to show liked movies
export const favoriteMoviesHandler = (currentMovie) => {
  return (dispatch, getState) => {
    const { favorites } = getState().movies;
    const isFavorite = favorites.some((movie) => movie.id === currentMovie.id);

    if (isFavorite) {
      const updatedList = favorites.filter((el) => el.id !== currentMovie.id);
      localStorage.setItem("favorites", JSON.stringify(updatedList));
      dispatch(setFavoriteMovie(updatedList));
    } else {
      localStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, currentMovie])
      );
      dispatch(setFavoriteMovie([...favorites, currentMovie]));
    }
  };
};

//search for details of movie
export const getMovieDetails = (id) => {
  return (dispatch) => {
    fetchMovie(`movie/${id}?`)
      .then((info) => dispatch(setMoviesDetails(info)))
      .catch((error) => {
        dispatch(setSnackbar({ message: error.message, type: "error" }));
      });
  };
};

//recieve recommended movies according to id

export const getSpecificMovies = (id, type) => {
  return (dispatch) => {
    fetchMovie(`movie/${id}/${type}?`)
      .then((data) => {
        if (type === "recommendations") {
          dispatch(setRecommendedMovies(data));
        }
        if (type === "similar") dispatch(setSimilarMovies(data));
      })
      .catch((error) => {
        dispatch(setSnackbar({ message: error.message, type: "error" }));
      });
  };
};

//fetch genres
export const fetchGenresHandler = () => {
  return (dispatch) => {
    fetchMovie("genre/movie/list?")
      .then((res) => dispatch(fetchGenresSuccess(res.genres)))
      .catch((error) => {
        dispatch(setSnackbar({ message: error.message, type: "error" }));
      });
  };
};
