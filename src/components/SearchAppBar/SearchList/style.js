import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  searchListWrapper: {
    position: "absolute",
    zIndex: 1000,
    backgroundColor: "rgb(63, 81, 181)",
    color: "white",
    width: "100%",
    top: 40,
    left: 0,
    opacity: 0.9,
  },

  searchList: {
    listStyleType: "none",
    textAlign: "left",
    padding: 0,
    margin: 0,
  },
  searchListItem: {
    padding: "5px 0",
    paddingLeft: 10,
  },
  searchListItemLink: {
    display: "block",
    color: "white",
    textDecoration: "none",
    padding: 0,
    transition: "1s",
    "&:hover": {
      paddingLeft: 30,
      transition: "1s",
    },
  },
  genreInfo: {
    fontStyle: "oblique",
    margin: 0,
    fontSize: 13,
  },
}));
