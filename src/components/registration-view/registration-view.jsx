// src/components/regisrtation-view/registration-view.jsx

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Container, Col, Row, Card, CardGroup } from "react-bootstrap";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    console.log(email, birthday);
    /* Send a request to the server for authentication */
    /* then call props.onRegistration(username) */
    props.onRegistration(username);
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Please Register</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter a username"
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      minLength="8"
                      placeholder="Your password must be 8 or more characters"
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="birthday"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      placeholder="Enter your birthday"
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }),
  onRegistration: PropTypes.func.isRequired,
};
