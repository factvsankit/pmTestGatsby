import css from "styled-components";
import React from "react";
import Link from "gatsby-link";

import { breakpoint, color, setSpace, styleText, time } from "../utils";

import Section from "../components/Section";
import Container from "../components/Container";
import CopyBlock from "../components/CopyBlock";

import ProfileImage from "../assets/images/phil-pp.jpg";

const BioEl = css.div`
  ${(props) =>
    props.pushed
      ? `
    margin-top: 80px;
    `
      : ``}
`;

const BioDpAndIntro = css.div`

  ${breakpoint.tablet} {
    display: flex;
  }

`;

const BioDp = css.div`

  ${breakpoint.tablet} {
    flex-basis: ${100 / 4}%;
    flex:10;
  }

  & > img{
    max-width: 100%;
  }

`;

const BioIntro = css.div`

  ${breakpoint.tablet} {
    flex-basis: ${100 / 4 * 3 - 3}%;
    ${setSpace("mlm")};
  }

`;

const BioIntroTitle = css.h2`
  ${setSpace("mbm")};
  ${styleText.t4};
  color: ${color.philGreen};
  line-height:1;
`;

const BioIntroSubTitle = css.span`

  ${styleText.t8};
  display: inline;

`;

const Action = css.a`
  ${styleText.t7};
  border-bottom: 1px solid ${color.philGreen};
  color: ${color.philGreen};
  cursor: pointer;
  font-weight: bold;
  transition: color ${time.m}, border-color ${time.m};
  &:hover {
    color: ${color.philGreenDark};
    border-color: ${color.philGreenDark};
  }
`;

const AreaOfExpertise = css.div`

  ${styleText.t7};
  ${setSpace("mbl")};
  ${setSpace("mtl")}

  & > span{
    color: ${color.philGreen};
  }

  & > span,
  & > ul{
    display: inline-block;
  }
  & > ul{
    li{
      display: inline-block;
      padding: 0 13px;
      a{
        transition: opacity ${time.l};
        &:hover{
          opacity: 0.7;
        }
      }
    }
  }

`;

const AeoListing = css.div`

  & > ul {
    ${breakpoint.tablet} {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      & > li{
        flex-basis: ${100 / 3}%;
      }
    }
    & > li{
      ${setSpace("mbs")};
      a{
        transition: opacity ${time.l};
        &:hover{
          opacity: 0.7;
        }
      }
    }
  }

`;

const Bio = () => (
  <BioEl>
    <Section valign="bottom">
      <Container space>
        <BioDpAndIntro>
          <BioDp>
            <img src={ProfileImage} alt="" />
          </BioDp>
          <BioIntro>
            <BioIntroTitle>
              Phil McMaster{" "}
              <BioIntroSubTitle>RIBA, RAIA, AILA</BioIntroSubTitle>
            </BioIntroTitle>
            <CopyBlock>
              <p>
                Phil McMaster is an Australian consultant based in Yangon,
                Rangoon. This bodycopy should be short, succinct, and
                communicate Phil’s breadth of expertise and international
                working history.
              </p>
              <p>
                It also outlines his ability and availability to work on
                exciting new projects internationally, because he is a citizen
                of the world.
              </p>
              <Action>Request full CV</Action>
            </CopyBlock>
          </BioIntro>
        </BioDpAndIntro>

        <AreaOfExpertise>
          <span>Areas of Expertise:</span>
          <ul>
            <li>
              <Link to="/">Urban Heritage</Link>
            </li>
            <li>
              <Link to="/">Urban Infrastructure</Link>
            </li>
            <li>
              <Link to="/">Masterplanning</Link>
            </li>
            <li>
              <Link to="/">Architecture and Landscape Architecture</Link>
            </li>
          </ul>
        </AreaOfExpertise>

        <AeoListing>
          <ul>
            <li>
              <Link to="/">/ Kingdom of Nepal</Link>
            </li>
            <li>
              <Link to="/">/ Bhutanese Ministry of Transport</Link>
            </li>
            <li>
              <Link to="/">/ International Bank</Link>
            </li>
            <li>
              <Link to="/">/ Big impressive Client Here</Link>
            </li>
            <li>
              <Link to="/">/ Kingdom of Nepal</Link>
            </li>
            <li>
              <Link to="/">/ Bhutanese Ministry of Transport</Link>
            </li>
            <li>
              <Link to="/">/ International Bank</Link>
            </li>
            <li>
              <Link to="/">/ Big impressive Client Here</Link>
            </li>
            <li>
              <Link to="/">/ Kingdom of Nepal</Link>
            </li>
            <li>
              <Link to="/">/ Bhutanese Ministry of Transport</Link>
            </li>
            <li>
              <Link to="/">/ International Bank</Link>
            </li>
            <li>
              <Link to="/">/ Big impressive Client Here</Link>
            </li>
          </ul>
        </AeoListing>
      </Container>
    </Section>
  </BioEl>
);

export default Bio;
