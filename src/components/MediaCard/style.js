import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  card: {
    minWidth: 200,
    width: 300,
    marginBottom: 20,
    zIndex: 0,
  },
  cardSlide: {
    width: 200,
    minHeight: 330,
    height: 330,
    "& h2": {
      fontSize: 12,
    },
  },
  media: {
    height: 350,
    zIndex: 0,
  },
  mediaSlide: {
    height: 280,
    zIndex: 0,
  },
  btnLink: {
    color: "white",
    zIndex: 0,
  },
});
