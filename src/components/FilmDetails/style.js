import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: "0 auto",
    display: "flex",
    maxWidth: 1100,
    justifyContent: "space-between",
    "& h1": {
      marginTop: 50,
    },
    "& h4": {
      color: "grey",
    },
    "& ul": {
      listStyle: "none",
      "& li": {
        color: "rgb(63, 81, 181)",
      },
    },
    "& div:first-child": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      "& img": {
        paddingBottom: 10,
      },
    },
    "& div:nth-child(2)": {
      paddingLeft: 15,
    },
  },
  recommended: {
    margin: "0 auto",
    maxWidth: 1100,
    marginTop: 30,
  },
}));
