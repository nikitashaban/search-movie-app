import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link, withRouter } from "react-router-dom";
import { useStyles } from "./style";

const MediaCard = ({
  id,
  poster_path,
  title,
  overview,
  history,
  slide = false,
}) => {
  const classes = useStyles();
  return (
    <Card className={slide ? classes.cardSlide : classes.card}>
      <CardActionArea>
        <CardMedia
          onClick={() => history.replace("/film/" + id)}
          className={slide ? classes.mediaSlide : classes.media}
          image={poster_path}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {overview}
          </Typography>
        </CardContent>
      </CardActionArea>
      {slide ? null : (
        <CardActions>
          <Button variant="contained" color="primary">
            <Link className={classes.btnLink} to={"/film/" + id}>
              Learn More
            </Link>
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default withRouter(MediaCard);
