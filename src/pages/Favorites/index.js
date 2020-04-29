import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useStyles } from "./style";

const Favorites = () => {
  const classes = useStyles();
  const savedFavoriteList = localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [];
  const { favorites } = useSelector(({ movies }) => movies.favorites);
  let favoritesList = [];
  if (savedFavoriteList) {
    favoritesList = savedFavoriteList;
  } else {
    favoritesList = favorites;
  }

  return (
    <div className={classes.favorites}>
      <h2>Movies which you liked: </h2>
      <ul>
        {favoritesList.map(({ id, title }) => (
          <li key={id}>
            <Link to={`/film/${id}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
