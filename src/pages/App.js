import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchGenresHandler } from "../ducks/movies";
import FilmDetails from "../components/FilmDetails/";
import SearchAppBar from "../components/SearchAppBar";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Favorites from "./Favorites";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGenresHandler());
  }, [dispatch]);
  return (
    <div>
      <SearchAppBar />
      <Switch>
        <Route path="/favorites" component={Favorites} />
        <Route path="/film/:id" component={FilmDetails} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default App;
