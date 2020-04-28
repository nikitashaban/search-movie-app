import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../Carousel";
import { Slide } from "pure-react-carousel";
import {
  getMovieDetails,
  favoriteMoviesHandler,
  setMoviesDetails,
  getSpecificMovies,
  setRecommendedMovies,
} from "../../ducks/movies";
import Fab from "@material-ui/core/Fab";
import MediaCard from "../MediaCard/";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useStyles } from "./style";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
const poster = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/";

const FilmDetails = ({ match, history }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieDetails(match.params.id));
    dispatch(getSpecificMovies(match.params.id, "recommendations"));
    dispatch(getSpecificMovies(match.params.id, "similar"));
  }, [dispatch, match.params.id]);
  const classes = useStyles();

  const favoriteList = useSelector(({ movies }) => movies.favorites);
  const currentFilmDetails = useSelector(({ movies }) => movies.filmDetails);
  const isLiked = favoriteList.find((el) => el.id === currentFilmDetails.id);
  const { recommendedMoviesList, total_recommended } = useSelector(
    ({ movies }) => movies.recommendedMovies
  );
  const { similarMoviesList, total_similar } = useSelector(
    ({ movies }) => movies.similarMovies
  );
  const recommendedMovieSlides = recommendedMoviesList.map((movie) => (
    <Slide key={movie.id}>
      <MediaCard
        id={movie.id}
        title={movie.title}
        poster_path={poster + movie.poster_path}
        slide={true}
      />
    </Slide>
  ));
  const similarMovieSlides = similarMoviesList.map((movie) => (
    <Slide key={movie.id}>
      <MediaCard
        id={movie.id}
        title={movie.title}
        poster_path={poster + movie.poster_path}
        slide={true}
      />
    </Slide>
  ));
  return (
    <React.Fragment>
      <div className={classes.wrapper}>
        <div>
          <IconButton
            onClick={() => {
              history.push("/");
              dispatch(setMoviesDetails({}));
              dispatch(setRecommendedMovies({ results: [] }));
            }}
            size="medium"
            color="primary"
          >
            <ArrowBackIcon />
          </IconButton>

          <img src={poster + currentFilmDetails.poster_path} alt="film" />
          <Fab
            style={isLiked ? { backgroundColor: "pink" } : null}
            onClick={() => dispatch(favoriteMoviesHandler(currentFilmDetails))}
            aria-label="like"
          >
            <FavoriteIcon />
          </Fab>
        </div>
        <div>
          <h1>{currentFilmDetails.title}</h1>

          <h4>{currentFilmDetails.original_title}</h4>
          <ul>
            <li>Year: {currentFilmDetails.release_date}</li>
            <li>Budjet: {currentFilmDetails.budget}$</li>
            <li>Runtime: {currentFilmDetails.runtime} minutes</li>
            <li>Rating: {currentFilmDetails.vote_average}</li>
          </ul>
          <p>Overview: {currentFilmDetails.overview}</p>
        </div>
      </div>
      {total_recommended ? (
        <div className={classes.recommended}>
          <h2>Films recommended to {currentFilmDetails.title}:</h2>
          <Carousel
            content={recommendedMovieSlides}
            totalSlides={recommendedMovieSlides.length / 4}
          />
        </div>
      ) : (
        <h2 className={classes.recommended}>
          There no films recommended to {currentFilmDetails.title}
        </h2>
      )}

      {total_similar ? (
        <div className={classes.recommended}>
          <h2>Films similar to {currentFilmDetails.title}:</h2>
          <Carousel
            content={similarMovieSlides}
            totalSlides={similarMovieSlides.length / 4}
          />
        </div>
      ) : (
        <h2 className={classes.recommended}>
          There no films similar to {currentFilmDetails.title}
        </h2>
      )}
    </React.Fragment>
  );
};

export default FilmDetails;
