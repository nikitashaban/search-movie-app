import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useStyles } from "./style";

const Favorites = () => {
  const classes = useStyles();
  const favorites = useSelector((state) => state.movies.favorites);
  const favoritesList = favorites.map(({ id, title }) => (
    <li>
      <Link to={`/film/${id}`}>{title}</Link>
    </li>
  ));

  return (
    <div className={classes.favorites}>
      <h2>Movies which you liked: </h2>
      <ul>{favorites ? favoritesList : <li>Your favourite film</li>}</ul>
    </div>
  );
};

export default Favorites;
