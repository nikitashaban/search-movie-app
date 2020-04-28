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
      minHeight: 270,
    },
  },
  btnBack: {
    position: "absolute",
    borderRadius: "50%",
    border: "none",
    padding: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
    top: "50%",
    left: 0,
    "& svg": {
      color: theme.palette.primary.dark,
      paddingLeft: 7,
    },
  },
  btnNext: {
    position: "absolute",
    borderRadius: "50%",
    padding: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
    border: "none",
    top: "50%",
    right: 0,
    "& svg": {
      color: theme.palette.primary.dark,
    },
  },
}));
