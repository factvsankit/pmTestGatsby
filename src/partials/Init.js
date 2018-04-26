import { shape, string } from "prop-types";
import Helmet from "react-helmet";
import React from "react";

import Favicon from "../assets/favicon.ico";

const Init = (props) => (
  <Helmet title={props.wpmeta.title}>
    <meta name="description" content={props.wpmeta.description} />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, user-scalable=no"
    />
    <link rel="icon" type="image/x-icon" href={Favicon} />
  </Helmet>
);

Init.propTypes = {
  wpmeta: shape({
    title: string.isRequired,
    description: string.isRequired
  }).isRequired
};

Init.defaultPros = {};

export default Init;
