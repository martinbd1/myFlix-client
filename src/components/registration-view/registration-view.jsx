// src/components/registration-view/registration-view.jsx

import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Form, Button, Container, Col, Row, Card, CardGroup } from "react-bootstrap";

import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  //vallidate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 3) {
      setUsernameErr("Username must be 3 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password is Required");
      isReq = false;
    } else if (password.length < 8) {
      setPasswordErr("Password must be 8 characters long");
      isReq = false;
    }
    if (!email) {
      setEmaildErr("Email Required");
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setEmailErr("Please enter a valid email");
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication */
      axios
        .post("https://myflixapp1987.herokuapp.com/users", {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert("Regisrtation successful, please login!");
          window.open("/", "_self"); //the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch((response) => {
          console.error(response);
          alert("unable to register");
        });
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <h1>Register for myFlix</h1>
        </Card.Title>
        <Form>
          <Form.Group controlId="formUsername" className="reg-form-inputs">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter a username"
              required
            />
            {usernameErr && <p>{usernameErr}</p>}
          </Form.Group>

          <Form.Group controlId="formPassword" className="reg-form-inputs">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength="8"
              placeholder="Your password must be 8 or more characters"
              required
            />
            {passwordErr && <p>{passwordErr}</p>}
          </Form.Group>

          <Form.Group controlId="Email" className="reg-form-inputs">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            {emailErr && <p>{emailErr}</p>}
          </Form.Group>

          <Form.Group controlId="updateBirthday" className="reg-form-inputs">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              placeholder="Enter your birthday"
              required
            />
          </Form.Group>

          <stack>
            <Button
              className="register-button"
              variant="btn btn-primary"
              type="submit"
              onClick={handleSubmit}>
              Register
            </Button>

            <div>
              <p>
                Already registered? <a href={`/`}>Log in here!</a>
              </p>
            </div>
          </stack>
        </Form>
      </Card.Body>
    </Card>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.instanceOf(Date).isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};

export default RegistrationView;
