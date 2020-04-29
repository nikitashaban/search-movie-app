import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useStyles } from "./style";

const Favorites = () => {
  const classes = useStyles();
  const favorites = useSelector(({ movies }) => movies.favorites);

  return (
    <div className={classes.favorites}>
      {favorites.length === 0 ? (
        <h2>You have not liked any movie yet </h2>
      ) : (
        <h2>Movies which you liked: </h2>
      )}

      <ul>
        {favorites.map(({ id, title }) => (
          <li key={id}>
            <Link to={`/film/${id}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
