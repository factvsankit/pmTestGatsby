import { array, func } from "prop-types";
import css from "styled-components";
import React from "react";

import { color, setSpace, styleText, time } from "../utils";

import { Container, Carousel, Section, Separator } from "../components";

const CoverEl = css.div`
  background-color: ${color.blackBlk};
  min-height: 100vh;
  position: relative;
  ${Container} {
    position: relative;
    z-index: 5;
  }
`;
const CoverTitle = css.h1`
  ${styleText.t1};
  color: ${color.philGreen};
`;
const PrimaryCoverMenuItem = css.li`
  ${styleText.t1};
  ${setSpace("mbs")};
`;
const SecondaryCoverMenuItem = css.li`
  ${setSpace("mrl")};
  ${setSpace("mvl")};
  ${styleText.t3};
  display: inline-block;
  &:not(:last-child) {
    ${setSpace("mrl")};
    ${setSpace("prl")};
    border-right: 1px solid ${color.whiteLLt};
  }
`;
const CoverLink = css.a`
  color: ${color.white};
  cursor: pointer;
  transition: color ${time.l};
  &:hover {
    color: ${color.whiteD};
  }
`;

const Cover = (props) => (
  <CoverEl>
    <Carousel images={props.carousel} />
    <Section vcenter>
      <Container space>
        <CoverTitle>Phil McMaster</CoverTitle>
        <Separator silent size="l" />
        <nav>
          <ul>
            {props.slugs.map((item) => (
              <PrimaryCoverMenuItem key={item.slug}>
                <CoverLink onClick={(evt) => props.navigateTo(item.slug, evt)}>
                  {item.title}
                </CoverLink>
              </PrimaryCoverMenuItem>
            ))}
            <SecondaryCoverMenuItem>
              <CoverLink onClick={(evt) => props.navigateTo("biography", evt)}>
                Bio
              </CoverLink>
            </SecondaryCoverMenuItem>
            <SecondaryCoverMenuItem>
              <CoverLink onClick={(evt) => props.navigateTo("contact", evt)}>
                Contact
              </CoverLink>
            </SecondaryCoverMenuItem>
          </ul>
        </nav>
      </Container>
    </Section>
  </CoverEl>
);

Cover.propTypes = {
  carousel: array.isRequired,
  navigateTo: func.isRequired,
  slugs: array.isRequired
};

export default Cover;
