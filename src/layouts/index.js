import React from "react";
import { func } from "prop-types";

import "./reset.css";
import "./global.css";
import "../assets/fonts/font-awesome.min.css";
import "../assets/fonts/icomoon/style.css";

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return this.props.children();
  }
}

Layout.propTypes = {
  children: func.isRequired
};
