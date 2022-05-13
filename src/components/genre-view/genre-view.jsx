// src/components/genre-view/genre-view.jsx

import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Col, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { genre, genres, movies, movie, onBackClick } = this.props;

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

        <Row>
          <Col>
            <Card className="genre-movie-card">
              <Card.Body>
                <Row className="genre-movies-container">
                  {/* genre={movies.find((m) => m.Genre.Name === match.params.name).Genre}  
                      movies={movies.filter((m) => m.Genre.Name === match.params.name)}
                  
                  */}

                  {/*
                    movies.map((movie) => {
                      if (movie._id === FavoriteMovies.find((fav) => fav === movie._id)) {
                        return ( 
                          */}

                  {/* {movies.map((movie) => {
                    if (movie._id === movies.find((m) => m.genre.name === match.params.name)) {
                      return (
                        <Card className="genre-movie-image" key={movie._id}>
                          <Link to={`/movies/${movie._id}`}>
                            <Card.Img
                              style={{ width: "18rem" }}
                              variant="top"
                              src={movie.ImagePath}
                              crossOrigin="anonymous"
                            /> */}
                  {/* </Link> */}
                  {/* <Card.Body>
                            <Card.Title className="movie-title">{movie.Title}</Card.Title>
                          </Card.Body>
                        </Card>
                      );
                    }
                  })} */}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

// GenreView.propTypes = {
//   movies: PropTypes.array.isRequired,
//   // genres: PropTypes.array.isRequired,
//   genre: PropTypes.shape({
//     Name: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//   }).isRequired,
//   onBackClick: PropTypes.func.isRequired,
// };

// const mapStateToProps = (state) => {
//   const { genres } = state;
//   return { genres };
// };

// export default connect(mapStateToProps)(GenreView);
