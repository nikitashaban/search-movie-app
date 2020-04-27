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
  },
  searchListLastItem: {
    backgroundColor: "rgb(51, 153, 255)",
    marginTop: 10,
    transition: "1s",
    "&:hover": {
      boxShadow: "10px 10px 5px 0px rgba(0, 0, 0, 0.75)",
    },
    "& a": {
      boxSizing: "border-box",
      color: "white",
      display: "block",
      width: "100%",
      height: "100%",
      padding: "10px 0 10px 10px",
      transition: "0.6s",
    },
    "& a:hover": {
      display: "block",
      transition: "0.6s",
      paddingLeft: "25px",
    },
  },
  genreInfo: {
    fontStyle: "oblique",
    margin: 0,
    fontSize: 13,
  },
}));
