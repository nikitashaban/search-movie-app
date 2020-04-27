import React from "react";
import { NavLink } from "react-router-dom";
import { useStyles } from "./style";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";

const NavLinks = ({ setIsDrawerOpen, isSideDrawer = false }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <NavLink
        onClick={() => (isSideDrawer ? setIsDrawerOpen(false) : {})}
        className={classes.navigationItem}
        activeClassName={classes.navigationItemActive}
        to="/home"
      >
        <HomeIcon /> &nbsp; Home
      </NavLink>
      <NavLink
        onClick={() => (isSideDrawer ? setIsDrawerOpen(false) : {})}
        className={classes.navigationItem}
        activeClassName={classes.navigationItemActive}
        to="/favorites"
      >
        <FavoriteIcon /> &nbsp; Favorites
      </NavLink>
    </React.Fragment>
  );
};

export default NavLinks;
