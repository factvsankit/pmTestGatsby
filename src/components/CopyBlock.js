import { array, object, oneOfType, string } from "prop-types";
import css from "styled-components";

import { setSpace, styleText } from "../utils";

const CopyBlock = css.div`
  & > h1 {
    ${styleText.t1};
  }
  & > h2 {
    ${styleText.t6};
  }
  & > h3 {
    ${styleText.t6};
  }
  & > p { 
    ${styleText.t6};
    display:block;
    ${setSpace("mbm")};
  }
  & > ul {
  }
  & > ul li {
    &:before {
      ${setSpace("mrx")};
      content: "/";
    }
  }
`;

CopyBlock.propTypes = {
  children: oneOfType([array, object, string]).isRequired
};

export default CopyBlock;
