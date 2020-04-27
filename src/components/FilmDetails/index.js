import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moviesDetailsData, favoriteMoviesHandler } from "../../ducks/movies";
import Fab from "@material-ui/core/Fab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useStyles } from "./style";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
const poster = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/";

const FilmDetails = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const favoriteList = useSelector((state) => state.movies.favorites);
  const currentFilmDetails = useSelector((state) => state.movies.filmDetails);

  const isLiked = favoriteList.find((el) => el.id === currentFilmDetails.id);
  console.log(favoriteList);
  useEffect(() => {
    dispatch(moviesDetailsData(match.params.id));
  }, [dispatch, match.params.id]);
  return (
    <div className={classes.wrapper}>
      <div>
        <img src={poster + currentFilmDetails.poster_path} alt="film" />
        <Fab
          style={isLiked ? { backgroundColor: "pink" } : null}
          onClick={() => dispatch(favoriteMoviesHandler(currentFilmDetails))}
          aria-label="like"
        >
          <FavoriteIcon />
        </Fab>
        <IconButton size="large" color="primary">
          <ArrowBackIcon />
        </IconButton>
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
  );
};

export default FilmDetails;
