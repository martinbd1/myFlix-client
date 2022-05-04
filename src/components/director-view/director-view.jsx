// src/components/director-view/director-view.jsx

import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Col, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const { director, movie, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{director.Name}</Card.Title>
                <Card.Text>{director.Bio}</Card.Text>
                <Card.Text>Birthyear: {director.Birth}</Card.Text>
                <Card.Text>Deathyear: {director.Death}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => {
                    onBackClick();
                  }}>
                  Back
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string.isRequired,
  }).isRequired,
};
