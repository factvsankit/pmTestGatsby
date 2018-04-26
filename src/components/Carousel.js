import { array } from 'prop-types';
import css from 'styled-components';
import Img from 'gatsby-image';
import React, { Component } from 'react';
import Slider from 'react-slick';

import './slick.css';

const CarouselEl = css.div`
  bottom: 0;
  height: 100%;
  left: 0;
  min-height: 100%;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  & .slick-slider,
  & .slick-list,
  & .slick-track,
  & .gatsby-image-outer-wrapper,
  & .gatsby-image-wrapper,
  & .gatsby-image-wrapper img {
    height: 100% !important;
    min-height: 100% !important;
    position: relative;
  }
  & .slick-slide > div,
  & .slick-slide > div > div {
    height: 100%;
    min-height: 100% !important;
  }
`;

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const settings = {
      accessibility: false,
      adaptiveHeight: false,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 8000,
      // centerMode: true,
      // centerPadding: 0,
      dots: false,
      draggable: false,
      fade: true,
      infinite: true,
      lazyLoad: false,
      pauseOnHover: false,
      slidesToScroll: 1,
      slidesToShow: 1,
      speed: 1500,
      swipe: false,
      touchMove: false
    };
    return (
      <CarouselEl>
        <Slider {...settings}>
          {this.props.images.map((image, i) => (
            <div key={i}>
              <Img sizes={image.localFile.childImageSharp.sizes} />
            </div>
          ))}
        </Slider>
      </CarouselEl>
    );
  }
}

Carousel.propTypes = {
  images: array.isRequired
};
