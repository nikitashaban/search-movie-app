import React, { useCallback, useState } from "react";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { moviesSearchData, setSearchedFilms } from "../../ducks/movies";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import TheatersIcon from "@material-ui/icons/Theaters";
import SideDrawer from "../SideDrawer";
import { useStyles } from "./style";
import NavLinks from "./NavLinks";
import SearchList from "./SearchList";

const SearchAppBar = () => {
  const dispatch = useDispatch();

  const searchDebounceHandler = useCallback(
    debounce((input) => dispatch(moviesSearchData(input)), 500),
    []
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearching, setIsSearching] = useState();
  const classes = useStyles();

  return (
    <React.Fragment>
      <SideDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        content={
          <NavLinks setIsDrawerOpen={setIsDrawerOpen} isSideDrawer={true} />
        }
      />
      <div className={classes.root}>
        <AppBar position="sticky">
          <Toolbar className={classes.toolBar}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={() => setIsDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <TheatersIcon className={classes.filmIcon} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <ClickAwayListener onClickAway={() => setIsSearching(false)}>
                <div>
                  <InputBase
                    placeholder="Enter movie…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    onChange={(event) => {
                      if (event.target.value.trim() === "") {
                        dispatch(
                          setSearchedFilms({
                            results: [],
                          })
                        );
                        setIsSearching(false);
                      } else {
                        setIsSearching(true);
                        searchDebounceHandler(event.target.value);
                      }
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                  {isSearching ? (
                    <SearchList setIsSearching={setIsSearching} />
                  ) : null}
                </div>
              </ClickAwayListener>
            </div>

            <div className={classes.linkWrapper}>
              <NavLinks />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </React.Fragment>
  );
};

export default SearchAppBar;
