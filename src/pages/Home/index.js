import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import MediaCard from "../../components/MediaCard";
import { useSelector, useDispatch } from "react-redux";
import { moviesFetchData } from "../../ducks/movies";

const poster = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/";

const Home = () => {
  const dispatch = useDispatch();

  const { topRateMoviesList, total_results } = useSelector(
    (state) => state.movies.topRateMovies
  );

  useEffect(() => {
    dispatch(moviesFetchData());
  }, [dispatch]);
  return (
    <InfiniteScroll
      dataLength={topRateMoviesList.length}
      next={() => dispatch(moviesFetchData())}
      hasMore={total_results ? topRateMoviesList.length < total_results : true}
      loader={<h4>Loading...</h4>}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        marginTop: 30,
      }}
    >
      {topRateMoviesList.map((film) => (
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

export default Home;
