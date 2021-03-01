import React, { Component } from "react";
import { ROUTES } from "./common/Constants";
class NotFound extends Component {
  state = {};
  componentDidMount() {
    window.location = "/" + ROUTES.RICERCA_CLIENTI;
  }

  render() {
    return <h3>404 Not Found resource</h3>;
  }
}

export default NotFound;
