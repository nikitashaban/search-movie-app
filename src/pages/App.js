import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchGenresHandler } from "../ducks/movies";
import FilmDetails from "../components/FilmDetails/";
import SearchAppBar from "../components/SearchAppBar";
import { Route } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";
import Favorites from "./Favorites";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGenresHandler());
  }, [dispatch]);
  return (
    <div>
      <SearchAppBar />
      <Route path="/home" component={Home} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/film/:id" component={FilmDetails} />
      <Route path="/search" component={Search} />
    </div>
  );
};

export default App;
