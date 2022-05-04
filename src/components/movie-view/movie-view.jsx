// src/components/movie-view/movie-view.jsx

import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Button, Container, Col, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-view.scss";

export class MovieView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser(token) {
    const user = localStorage.getItem("user");

    axios
      .get(`https://myflixapp1987.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onAddFavorite = () => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const id = this.props.movie._id;
    ///users/:Username/movies/:MovieID
    axios
      .post(`https://myflixapp1987.herokuapp.com/users/${user}/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        this.componentDidMount;
        alert("Movie has been added to Favorites");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onRemoveFavorite = () => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const id = this.props.movie._id;
    ///users/:Username/movies/:MovieID
    axios
      .delete(`https://myflixapp1987.herokuapp.com/users/${user}/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        this.componentDidMount;
        alert("Movie has been removed form Favorites");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { user, movie, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Img variant="top" src={movie.ImagePath} crossOrigin="anonymous" />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>

                <Card.Text> {movie.Description}</Card.Text>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant="link">Director</Button>
                </Link>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button variant="link">Genre</Button>
                </Link>
                <Button
                  variant="warning"
                  onClick={() => {
                    this.onAddFavorite();
                  }}>
                  Add to favorites
                </Button>
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

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};
