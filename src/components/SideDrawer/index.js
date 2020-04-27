import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

export const useStyles = makeStyles((theme) => ({
  sideDrawers: {
    backgroundColor: theme.palette.primary.main,
    height: "100vh",
    width: 200,
  },
}));

const SideDrawer = ({ isDrawerOpen, setIsDrawerOpen, content }) => {
  const classes = useStyles();

  return (
    <SwipeableDrawer
      anchor={"left"}
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      onOpen={() => setIsDrawerOpen(true)}
    >
      <div className={classes.sideDrawers}>{content}</div>
    </SwipeableDrawer>
  );
};
export default SideDrawer;
