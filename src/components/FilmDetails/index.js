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
  setSimilarMovies,
} from "../../ducks/movies";
import Fab from "@material-ui/core/Fab";
import { Link } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useStyles } from "./style";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import useWindowSize from "../../customHooks/useWindowSize";
const poster = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/";
const noImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRVTzTTaf9FVUAkBIP4FeE2P3odm6bLLx1m_Cy7SSrrMuRFNUyj&usqp=CAU";

const FilmDetails = ({ match, history }) => {
  const [width] = useWindowSize();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieDetails(match.params.id));
    dispatch(getSpecificMovies(match.params.id, "recommendations"));
    dispatch(getSpecificMovies(match.params.id, "similar"));
    dispatch(setRecommendedMovies({ results: [] }));
    dispatch(setSimilarMovies({ results: [] }));
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
  let slideAmount;

  if (width < 1000) {
    slideAmount = 3;
  }
  if (width < 700) {
    slideAmount = 2;
  }
  if (width < 500) {
    slideAmount = 1;
  }
  if (width > 1000) {
    slideAmount = 4;
  }

  const recommendedMovieSlides = recommendedMoviesList
    ? recommendedMoviesList.map((movie) => (
        <Slide key={movie.id}>
          <Link to={"/film/" + movie.id}>
            <img src={poster + movie.poster_path} alt={movie.title} />
          </Link>
        </Slide>
      ))
    : [];
  const similarMovieSlides = similarMoviesList
    ? similarMoviesList.map((movie) => (
        <Slide key={movie.id}>
          <Link to={"/film/" + movie.id}>
            <img src={poster + movie.poster_path} alt={movie.title} />
          </Link>
        </Slide>
      ))
    : [];
  console.log(currentFilmDetails);
  return (
    <React.Fragment>
      <div className={classes.wrapper}>
        <div>
          <IconButton
            onClick={() => {
              history.push("/");
              dispatch(setMoviesDetails({}));
            }}
            size="medium"
            color="primary"
          >
            <ArrowBackIcon />
          </IconButton>

          <img
            src={
              !currentFilmDetails.poster_path
                ? noImage
                : poster + currentFilmDetails.poster_path
            }
            alt="film"
          />
          <Fab
            disabled={currentFilmDetails.status_code === 34 ? true : false}
            style={isLiked ? { backgroundColor: "pink" } : null}
            onClick={() => dispatch(favoriteMoviesHandler(currentFilmDetails))}
            aria-label="like"
          >
            <FavoriteIcon />
          </Fab>
        </div>
        <div>
          <h1>
            {currentFilmDetails.status_code === 34
              ? "Sorry, the movied you requested could not be found"
              : currentFilmDetails.title}
          </h1>

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
        <div className={classes.additional}>
          <h2>Films recommended to {currentFilmDetails.title}:</h2>
          <Carousel
            visibleSlides={slideAmount}
            content={recommendedMovieSlides}
            totalSlides={recommendedMovieSlides.length}
          />
        </div>
      ) : (
        <h2 className={classes.additional}>There no recommended films </h2>
      )}

      {total_similar ? (
        <div className={classes.additional}>
          <h2>Films similar to {currentFilmDetails.title}:</h2>
          <Carousel
            visibleSlides={slideAmount}
            content={similarMovieSlides}
            totalSlides={similarMovieSlides.length}
          />
        </div>
      ) : (
        <h2 className={classes.additional}>There no similar films</h2>
      )}
    </React.Fragment>
  );
};

export default FilmDetails;
