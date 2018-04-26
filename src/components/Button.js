import css from "styled-components";

import { color, setSpace, styleText, time } from "../utils";

const Button = css.button`
  ${setSpace("phl")};
  ${setSpace("pvs")};
  ${styleText.t6};
  background: ${color.philGreen};
  border: none;
  color: ${color.white};
  cursor: pointer;
  transition: background ${time.m};
  &:hover {
    background: ${color.philGreenLight}
  }
`;

export default Button;
