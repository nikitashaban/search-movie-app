import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  favorites: {
    paddingLeft: 15,
    color: "rgb(63, 81, 181)",
    "& a": {
      textDecoration: "none",
      color: "rgb(63, 81, 181)",
      transition: "0.8s",
    },
    "& a:hover": {
      color: "rgb(0, 0, 153)",
      paddingLeft: 10,
      transition: "0.8s",
    },
  },
}));
