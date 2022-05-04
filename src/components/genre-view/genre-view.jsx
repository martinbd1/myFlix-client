// src/components/genre-view/genre-view.jsx

import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Col, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { genre, movie, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{genre.Name}</Card.Title>
                <Card.Text>{genre.Description}</Card.Text>
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

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};
