import css from "styled-components";
import { array, number, object, oneOfType, string } from "prop-types";

import { setSpace } from "../utils";

const Section = css.section`
  ${setSpace("phm")};
  min-height: 100vh;
  width: 100%;
  ${(props) =>
    props.valign === "center"
      ? `
    display: flex;
    flex-direction: column;
    justify-content: center;
  `
      : ``}
  ${(props) =>
    props.valign === "bottom"
      ? `
    ${setSpace("pbh")};
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  `
      : ``}
`;

Section.propTypes = {
  children: oneOfType([array, object, string]).isRequired,
  height: number,
  valign: string
};

Section.defaultProps = {
  valign: null,
  height: null
};

export default Section;
