import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import MediaCard from "../../components/MediaCard";
import { moviesSearchData } from "../../ducks/movies";

const poster = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/";

const Search = () => {
  const dispatch = useDispatch();
  const { searchedMoviesList, total_results } = useSelector(
    (state) => state.movies.searchedMovies
  );

  const searchInput = useSelector((state) => state.movies.searchInput);

  useEffect(() => {
    dispatch(moviesSearchData(searchInput));
  }, [dispatch, searchInput]);

  return (
    <InfiniteScroll
      dataLength={searchedMoviesList.length}
      next={() => dispatch(moviesSearchData(searchInput))}
      hasMore={total_results ? searchedMoviesList.length < total_results : true}
      loader={<h4>Loading...</h4>}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        marginTop: 30,
      }}
    >
      {searchedMoviesList.map((film) => (
        <MediaCard
          key={film.id}
          id={film.id}
          title={film.title}
          overview={film.overview}
          poster_path={poster + film.poster_path}
        />
      ))}
    </InfiniteScroll>
  );
};
export default Search;
