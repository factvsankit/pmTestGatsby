import { array, object, oneOfType, string } from "prop-types";
import css from "styled-components";

import { breakpoint, setSpace } from "../utils";

const Container = css.div`
  ${props => (props.space ? setSpace("pvl") : null)}
  margin: 0 auto;
  width: 100%;
  ${breakpoint.tablet} {
    max-width: 740px;
  }
  ${breakpoint.desktop} {
    max-width: 940px;
  }
  ${breakpoint.hdesktop} {
    max-width: 1200px;
  }
  ${props =>
    props.flex
      ? `
    display: flex;
    > * {
      flex-basis: ${100 / props.flex}%;
    }
  `
      : null}
`;

Container.propTypes = {
  children: oneOfType([array, object, string]).isRequired
};

export default Container;
