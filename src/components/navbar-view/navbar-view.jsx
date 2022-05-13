// src/components/navbar-view/navbar-view.jsx

import React from "react";
import { Button, Container, Navbar, Nav, Link } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../../img/movie-film-grd1.png";

import "./navbar-view.scss";

export function NavbarView({ user }) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar className="main-nav mx-auto" sticky="top" expand="lg">
      <Navbar.Brand className="navbar-logo" href="/">
        <img src={Logo} width="40" height="auto" className="img-responsive" alt="logo" /> myFlix
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          {isAuth() && <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>}
          {isAuth() && (
            <Button
              variant="link"
              onClick={() => {
                onLoggedOut();
              }}>
              Logout
            </Button>
          )}
          {!isAuth() && <Nav.Link href="/">Log in</Nav.Link>}
          {!isAuth() && <Nav.Link href="/register">Sign-Up</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
