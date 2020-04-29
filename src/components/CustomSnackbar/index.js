import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../ducks/movies";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomSnackbar() {
  const dispatch = useDispatch();
  const snackbar = useSelector(({ movies }) => movies.snackbar);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (snackbar.type) {
      setOpen({ type: snackbar.type, message: snackbar.message });
    }
  }, [snackbar]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setSnackbar(false));
    setOpen(false);
  };
  let snackType;
  if (snackbar.type === "error") {
    snackType = "error";
  } else if (snackbar.type === "warning") {
    snackType = "warning";
  } else if (snackbar.type === "info") {
    snackType = "info";
  } else if (snackbar.type === "success") {
    snackType = "success";
  }
  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackType}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
