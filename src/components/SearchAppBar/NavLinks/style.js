import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  navigationItemActive: {
    display: "block",
    minHeight: "64px",
    width: "auto",
    boxSizing: "border-box",
    backgroundColor: theme.palette.primary.light,
    color: "white",
  },
  navigationItem: {
    display: "flex",
    padding: "0 15px",
    alignItems: "center",
    color: "white",
    minHeight: "64px",
    width: "auto",
    transition: "0.8s",
    boxSizing: "border-box",
    "&:hover": {
      transition: "0.3s",
      backgroundColor: theme.palette.primary.light,
    },
  },
}));
