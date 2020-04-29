import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  carousel: {
    position: "relative",

    margin: "0 auto",
    "& ul": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "& div:first-child": {
      margin: "0 auto",
      minHeight: 270,
      maxWidth: 1000,
    },
    "& li>div": {
      display: "flex",
      justifyContent: "center",
    },
  },
  btnBack: {
    position: "absolute",
    borderRadius: "50%",
    border: "none",
    padding: 4,
    backgroundColor: "rgba(255,255,255,0)",
    top: "40%",
    left: 0,
    "& svg": {
      color: theme.palette.primary.dark,
      paddingLeft: 3,
    },
    "&:focus": {
      outline: "none",
    },
  },
  btnNext: {
    position: "absolute",
    borderRadius: "50%",
    padding: 4,
    backgroundColor: "rgba(255,255,255,0)",
    border: "none",
    top: "40%",
    right: 0,
    "& svg": {
      color: theme.palette.primary.dark,
    },
    "&:focus": {
      outline: "none",
    },
  },
}));
