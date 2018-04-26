import css from "styled-components";
import React from "react";
import Slider from "react-slick";
import { arrayOf, bool, func, object, shape, string } from "prop-types";

import { breakpoint, color, setSpace, styleText, time } from "../utils";

import Container from "../components/Container";

const SlideshowEl = css.div`
  background: ${color.white};
  bottom: 0;
  color: ${color.black};
  display: block;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  z-index: 5;
  .slick-loading .slick-slide,
  .slick-loading .slick-track {
    visibility: hidden;
  }
  .slick-slider {
    box-sizing: border-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -ms-touch-action: pan-y;
    touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;
  }
  .slick-list {
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  .slick-list:focus {
    outline: 0;
  }
  .slick-list.dragging {
    cursor: pointer;
    cursor: hand;
  }
  .slick-slider .slick-list,
  .slick-slider .slick-track {
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  .slick-track {
    top: 0;
    left: 0;
  }
  .slick-track:after,
  .slick-track:before {
    display: table;
    content: "";
  }
  .slick-track:after {
    clear: both;
  }
  .slick-slide {
    display: none;
    float: left;
    height: 100%;
    min-height: 1px;
  }
  .slick-slide > div {
    height: 100vh;
    width: 100vw;
  }
  .slick-initialized .slick-slide {
    display: flex;
  }
  .slick-vertical .slick-slide {
    display: block;
    height: auto;
    border: 1px solid transparent;
  }
  .slick-arrow.slick-hidden {
    display: none;
  }

  .slick-slider,
  .slick-list,
  .slick-track,
  .slick-slide {
    height: 100%;
    min-height: 100%;
    position: relative;
    display: block;
  }
`;

const SlideshowButton = `
  background-color: ${color.white};
  border-radius: 100%;
  color: ${color.philGreen};
  cursor: pointer;
  display: inline-block;
  position: fixed;
  text-align: center;
  transition: opacity ${time.l};
  z-index: 5;
  font-size: 22px;
  height: 32px;
  line-height: 34px;
  width: 32px;
  ${breakpoint.tablet} {
    font-size: 26px;
    height: 40px;
    line-height: 42px;
    width: 40px;
  }
  &:hover {
    opacity: .8;
  }
`;
const SlideshowPrevButton = css.a`
  ${SlideshowButton};
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
`;
const SlideshowNextButton = css.a`
  ${SlideshowButton};
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
`;
const SlideshowCloseButton = css.a`
  ${SlideshowButton};
  right: 15px;
  top: 15px;
`;

const Slide = css.div`
  align-content: flex-end;
  align-items: flex-end;
  background-color: ${color.black};
  background-position: center center;
  background-size: cover;
  background-image: url(${(props) => props.image});
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  justify-content: flex-end;
`;
const SlideText = css.div`
  background: ${color.whiteBlk};
  position: absolute;
  bottom:0;
  left:0;
  right:0;
  ${setSpace("phm")};
  width: 100%;
`;
const SlideTitle = css.h2`
  ${breakpoint.onlyphone} {
    ${setSpace("phm")};
    ${setSpace("pvs")};
    ${styleText.t7};
    background: ${color.black};
    color: ${color.white};
    left: 0;
    position: fixed;
    top: 10px;
  }
  ${styleText.t6};
  ${setSpace("mbs")};
  color: ${color.philGreen};
`;
const SlideSubtitle = css.p`
  ${styleText.t6};
  ${setSpace("mbs")};
`;
const SlidePara = css.p`
  ${styleText.t7};
`;

const Slideshow = (props) => {
  const { gallery } = props;
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    draggable: false,
    lazyLoad: false,
    slidesToScroll: 1,
    slidesToShow: 1,
    speed: 750,
    nextArrow: (
      <SlideshowNextButton>
        <i className="icon-arrow-right" />
      </SlideshowNextButton>
    ),
    prevArrow: (
      <SlideshowPrevButton>
        <i className="icon-arrow-left" />
      </SlideshowPrevButton>
    )
  };
  if (props.isActive) {
    return (
      <SlideshowEl className="SLIDESOWELL">
        <Slider {...settings}>
          {gallery.slides.map((slide) => {
            const { caption } = slide;
            const parseCaption = caption
              .replace(/<p>/g, "")
              .replace(/<\/p>/g, "");
            return (
              <Slide image={slide.source_url} key={slide.source_url}>
                <SlideText>
                  <Container space>
                    <SlideTitle>{slide.title}</SlideTitle>
                    <SlideSubtitle>{parseCaption}</SlideSubtitle>
                    <SlidePara>{slide.text}</SlidePara>
                  </Container>
                </SlideText>
              </Slide>
            );
          })}
        </Slider>
        <SlideshowCloseButton onClick={() => props.toggleSlideshow()}>
          <i className="icon-cross" />
        </SlideshowCloseButton>
      </SlideshowEl>
    );
  }
  return null;
};

Slideshow.propTypes = {
  isActive: bool,
  gallery: shape({
    title: string,
    slides: arrayOf(object)
  }),
  toggleSlideshow: func.isRequired
};

Slideshow.defaultProps = {
  gallery: null,
  isActive: false
};

export default Slideshow;
