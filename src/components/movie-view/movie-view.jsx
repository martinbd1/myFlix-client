// src/components/movie-view/movie-view.jsx

import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Col, Row, Card } from "react-bootstrap";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    // if (!movies) return null;

    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Img variant="top" src={movie.ImagePath} />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text> {movie.Description}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => {
                    onBackClick(null);
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

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
