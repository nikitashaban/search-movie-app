import React from "react";
import {
  CarouselProvider,
  Slider,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useStyles } from "./style";

const Carousel = ({ content, totalSlides, visibleSlides }) => {
  const classes = useStyles();
  return (
    <CarouselProvider
      className={classes.carousel}
      naturalSlideWidth={100}
      naturalSlideHeight={34}
      totalSlides={totalSlides}
      visibleSlides={visibleSlides}
      infinite={true}
      isPlaying={true}
    >
      <Slider>{content}</Slider>
      <ButtonBack className={classes.btnBack}>
        <ArrowBackIosIcon fontSize="large" />
      </ButtonBack>
      <ButtonNext className={classes.btnNext}>
        <ArrowForwardIosIcon fontSize="large" />
      </ButtonNext>
    </CarouselProvider>
  );
};

export default Carousel;
