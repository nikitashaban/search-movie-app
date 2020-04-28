import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useStyles } from "./style";

const SearchList = ({ setIsSearching }) => {
  const classes = useStyles();
  const { searchedMoviesList, total_results } = useSelector(
    ({ movies }) => movies.searchedMovies
  );
  const { genres, isLoading } = useSelector(({ movies }) => movies);
  const getGenres = useCallback(
    (genre_ids) => {
      const arr = [];
      genre_ids.forEach((gnrId) =>
        arr.push(genres.find((gnr) => gnr.id === gnrId).name)
      );
      return arr.join(", ");
    },
    [genres]
  );
  return (
    <div className={classes.searchListWrapper}>
      <ul className={classes.searchList}>
        {isLoading ? (
          <li className={classes.searchListItem}>Loading...</li>
        ) : total_results === 0 ? (
          <li className={classes.searchListItem}>
            There are no movies that matched your query
          </li>
        ) : (
          searchedMoviesList.slice(0, 10).map(({ id, title, genre_ids }) => (
            <li className={classes.searchListItem} key={id}>
              <Link
                className={classes.searchListItemLink}
                onClick={() => setIsSearching(false)}
                to={"/film/" + id}
              >
                <p>{title}</p>
                <p className={classes.genreInfo}>{getGenres(genre_ids)}</p>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SearchList;
