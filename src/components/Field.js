import React from "react";
import { string } from "prop-types";
import css from "styled-components";

import { color, setSpace, styleText, time } from "../utils";

export const fieldStyles = `
  ${setSpace("pvs")};
  ${styleText.t7};
  background: ${color.white};
  border-color: ${color.blackHL};
  border-style: solid;
  border-width: 0 0 1px 0;
  color: ${color.black};
  display: block;
  transition: border ${time.m};
  width: 100%;
  &:focus {
    outline: none;
    border-color: ${color.philGreen};
  }
  &::placeholder {
    color: ${color.black};
  }
`;

const Input = css.input`
  ${fieldStyles};
`;

const Textarea = css.textarea`
  ${fieldStyles};
  height: 100px;
`;

const Field = (props) =>
  props.type === "textarea" ? (
    <Textarea {...props} type="" />
  ) : (
    <Input {...props} />
  );

Field.propTypes = {
  type: string
};

Field.defaultProps = {
  type: "text"
};

export default Field;
