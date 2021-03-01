import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "./common/Constants";
import { Nav, Navbar } from "react-bootstrap";
import "../custom.css";
class NavbarDetailed extends Component {
  state = {};

  render() {
    return (
      <Navbar bg="light" variant="light">
        <Navbar.Brand className="ml-2 mb-1">
          {this.props.username
            ? this.props.username
            : localStorage.getItem("USERNAME")}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-4">
            <NavLink
              className={`nav-link  navButton `}
              id={"ricerca"}
              to={window.defConfigurations.url_prefix + ROUTES.RICERCA_CLIENTI}
            >
              Ricerca Cliente
            </NavLink>
          </Nav>
          <Nav className="mr-auto">
            <NavLink
              className={`nav-link  navButton `}
              to={window.defConfigurations.url_prefix + ROUTES.NOT_FOUND}
            >
              Report
            </NavLink>
          </Nav>
          <Nav className="ml-auto">
            <NavLink
              className={`nav-link  navButton `}
              id={"logout"}
              to={window.defConfigurations.url_prefix + ROUTES.LOGOUT}
            >
              LogOut
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavbarDetailed;
