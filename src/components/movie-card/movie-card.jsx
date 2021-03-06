// src/components/movie-card/movie-card.jsx

import React from "react";
import PropTypes from "prop-types";
import { Button, Container, CardGroup, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Container className="movie-card">
        <CardGroup>
          <Link to={`/movies/${movie._id}`}>
            <Card>
              <Link to={`/movies/${movie._id}`}>
                <Card.Img variant="top" src={movie.ImagePath} crossOrigin="anonymous" />
              </Link>
              <Card.Body>
                <Card.Title className="movie-card-title">{movie.Title}</Card.Title>
                {/* <Card.Text>{movie.Description}</Card.Text> */}
              </Card.Body>
            </Card>
          </Link>
        </CardGroup>
      </Container>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
