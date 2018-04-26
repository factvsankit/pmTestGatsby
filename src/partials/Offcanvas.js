import css, { keyframes } from "styled-components";
import React from "react";
import { array, bool, func } from "prop-types";

import { breakpoint, color, setSpace, styleText, time } from "../utils";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const OffCanvasEl = css.div`
  background: ${color.philGreen};
  bottom: 0;
  box-shadow: 0 1px 10px ${color.blackHL};
  position: fixed;
  right: 0;
  top: 0;
  transform: translateX(101%);
  transition: width ${time.l}, transform ${time.l};
  width: 100%;
  z-index: 5;
  ${(props) =>
    props.isActive
      ? `
    transform: translateX(0);
    `
      : null}
  ${breakpoint.tablet} {
    width: 320px;
  }
  ${breakpoint.desktop} {
    display: none;
  }
`;

const Overlay = css.div`
  animation: ${fadeIn} ${time.l} linear;
  background: ${color.blackM};
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  transform: translateZ(0);
  will-change: opacity;
  z-index: 3;
`;

const Menu = css.nav`
`;

const MenuList = css.ul`
  ${setSpace("mtl")};
`;

const MenuToggle = css.span`
  background: ${color.blackLt};
  color: ${color.whiteHD};
  cursor: pointer;
  display: inline-block;
  font-size: 30px;
  height: 40px;
  line-height: 42px;
  text-align: center;
  transition: background ${time.l};
  width: 40px;
  &:hover {
    background: ${color.blackHL};
  }
`;

const MenuItem = css.li`
  ${styleText.t7};
  &:not(:last-child) {
    border-bottom: 1px solid ${color.blackHL};
  }
`;

const MenuLink = css.a`
  ${setSpace("pam")};
  color: ${color.white};
  cursor: pointer;
  display: block;
  text-transform: uppercase;
`;

const Offcanvas = (props) => [
  <OffCanvasEl isActive={props.isActive} key="offcanvas">
    <Menu>
      <MenuToggle onClick={props.toggleOffcanvas}>
        <i className="icon-cross" />
      </MenuToggle>
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
    </Menu>
  </OffCanvasEl>,
  props.isActive ? (
    <Overlay onClick={props.toggleOffcanvas} key="overlay" />
  ) : null
];

Offcanvas.propTypes = {
  isActive: bool.isRequired,
  navigateTo: func.isRequired,
  slugs: array.isRequired,
  toggleOffcanvas: func.isRequired
};

export default Offcanvas;
