import css from "styled-components";
import React from "react";
import { array, func, bool } from "prop-types";

import {
  breakpoint,
  color,
  setSpace,
  setType,
  styleText,
  time
} from "../utils";

import Container from "../components/Container";

const TopbarEl = css.div`
  align-items: center;
  background: ${color.whiteBlk};
  box-shadow: 0 1px 10px ${color.blackHL};
  display: flex;
  flex-direction: row;
  height: 80px;
  transition: position ${time.l}, top ${time.l};
  width: 100%;
  ${(props) =>
    props.sticky
      ? `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  `
      : ``}
`;

const Menu = css.nav`
  ${setSpace("phm")};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Brandmark = css.h1`
`;

const BrandmarkLink = css.a`
  ${styleText.t3};
  color: ${color.philGreen};
  cursor: pointer;
`;

const MenuList = css.ul`
  display: none;
  ${breakpoint.desktop} {
    display: block;
    text-align: right;
  }
`;

const MenuToggle = css.span`
  ${setType("l")};
  cursor: pointer;
  display: inline-block;
  ${breakpoint.desktop} {
    display: none;
  }
`;

const MenuItem = css.li`
  ${setSpace("mlm")};
  display: inline-block;
  &:first-child {
    ${setSpace("mln")};
  }
`;

const MenuLink = css.a`
  color: ${color.black};
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  transition: opacity ${time.l};
  &:hover {
    opacity: .7;
  }
`;

const Topbar = (props) => [
  <TopbarEl {...props} key="nav">
    <Container>
      <Menu>
        <Brandmark>
          <BrandmarkLink onClick={() => props.navigateTo("cover")}>
            Phil McMaster
          </BrandmarkLink>
        </Brandmark>
        <MenuList>
          <MenuItem>
            <MenuLink onClick={(evt) => props.navigateTo("biography", evt)}>
              Bio
            </MenuLink>
          </MenuItem>
          {props.slugs.map((item) => (
            <MenuItem key={item.slug}>
              <MenuLink onClick={(evt) => props.navigateTo(item.slug, evt)}>
                {item.title}
              </MenuLink>
            </MenuItem>
          ))}
          <MenuItem>
            <MenuLink onClick={(evt) => props.navigateTo("contact", evt)}>
              Contact
            </MenuLink>
          </MenuItem>
        </MenuList>
        <MenuToggle onClick={(evt) => props.toggleOffcanvas(evt)}>
          <i className="icon-menu" />
        </MenuToggle>
      </Menu>
    </Container>
  </TopbarEl>,
  props.sticky ? <div style={{ height: "80px" }} key="push" /> : null
];

Topbar.propTypes = {
  navigateTo: func.isRequired,
  slugs: array.isRequired,
  sticky: bool.isRequired,
  toggleOffcanvas: func.isRequired
};

export default Topbar;
