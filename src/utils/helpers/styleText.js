import { font } from "../config/fonts";
import { setType } from "../mixins/setType";

export const styleText = {
  t1: `
    ${setType("h")};
    font-family: ${font.pri};
  `,
  t2: `
    ${setType("xl")}
    font-family: ${font.pri};
  `,
  t3: `
    ${setType("l")};
    font-family: ${font.pri};
  `,
  t4: `
    ${setType("m")};
    font-family: ${font.pri};
  `,
  t5: `
    ${setType("s")};
    font-family: ${font.pri};
  `,
  t6: `
    ${setType("xs")};
    font-family: ${font.pri};
  `,
  t7: `
    ${setType("xxs")};
    font-family: ${font.pri};
  `,
  t8: `
    ${setType("x")};
    font-family: ${font.pri};
  `
};

export default styleText;
