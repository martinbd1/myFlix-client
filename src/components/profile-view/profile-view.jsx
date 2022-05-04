// src/components/profile-view/profile-view.jsx

import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Form, Button, Container, Col, Row, Card, FormControl, FormGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./profile-view.scss";

export class ProfileView extends React.Component {
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
    const token = localStorage.getItem("token");
    this.getUser(token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

  getUser(token) {
    const u = localStorage.getItem("user");
    //const token = localStorage.getItem("token");

    axios
      .get(`https://myflixapp1987.herokuapp.com/users/${u}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
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

  editUser = (e) => {
    e.preventDefault();
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .put(
        `https://myflixapp1987.herokuapp.com/users/${user}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem("user", this.state.Username);
        alert("Profile has been updated");
        window.open("/profile", "_self");
      });
  };

  onRemoveFavorite = (e) => {
    e.preventDefault();
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
        alert("Movie has been removed form Favorites");
        this.componentDidMount;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onDeleteUser() {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(`https://myflixapp1987.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert("User has been deleted");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(value) {
    this.setState({
      Username: value,
    });
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
  }

  setBirthday(value) {
    this.setState({
      Birthday: value,
    });
  }

  render() {
    const { movies, onBackClick } = this.props;
    const { Username, Password, Email, Birthday, FavoriteMovies } = this.state;

    if (!Username) {
      return null;
    }

    return (
      <Container>
        <Row>
          <Card>
            <Card.Body>
              <Card.Title>Profile</Card.Title>
              <Form
                className="update-form"
                onSubmit={(e) =>
                  this.editUser(e, this.Username, this.Password, this.Email, this.Birthday)
                }>
                <Form.Group>
                  <Form.Label>Username:</Form.Label>
                  <FormControl
                    type="text"
                    name="Username"
                    placeholder="New Username"
                    value={Username}
                    onChange={(e) => this.setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password:</Form.Label>
                  <FormControl
                    type="password"
                    name="Password"
                    placeholder="New Password"
                    value={Password}
                    onChange={(e) => this.setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <FormControl
                    type="email"
                    name="email"
                    placeholder="Email"
                    valuealue={Email}
                    onChange={(e) => this.setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Birthday:</Form.Label>
                  <FormControl
                    type="date"
                    name="Birthday"
                    value={Birthday}
                    onChange={(e) => this.setBirthday(e.target.value)}
                    required
                  />
                </Form.Group>

                <div>
                  <Button variant="primary" type="submit" onClick={this.editUser}>
                    Update Profile
                  </Button>
                  <Button variant="primary" type="submit" onClick={() => this.onDeleteUser()}>
                    Delete Profile
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Row>

        <Row>
          <Col>
            <Card>
              <Card.Body>
                {FavoriteMovies.length === 0 && (
                  <div className="text-center">No favorite movies!</div>
                )}
                <Row className="favorite-movies-container">
                  {FavoriteMovies.length > 0 &&
                    movies.map((movie) => {
                      if (movie._id === FavoriteMovies.find((fav) => fav === movie._id)) {
                        return (
                          <Card className="favorite-movie-image" key={movie._id}>
                            <Card.Img
                              style={{ width: "18rem" }}
                              variant="top"
                              src={movie.ImagePath}
                              crossOrigin="anonymous"
                            />
                            <Card.Body>
                              <Card.Title className="movie-title">{movie.Title}</Card.Title>
                              <Button
                                value={movie._id}
                                onClick={(e) => this.onRemoveFavorite(e, movie)}>
                                Remove from Favorites
                              </Button>
                            </Card.Body>
                          </Card>
                        );
                      }
                    })}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

// ProfileView.propTypes = {
//   movies: PropTypes.arrayOf(
//     PropTypes.shape({
//       Title: PropTypes.string.isRequired,
//       Description: PropTypes.string.isRequired,
//       ImagePath: PropTypes.string.isRequired,
//       Genre: PropTypes.shape({
//         Name: PropTypes.string.isRequired,
//         Description: PropTypes.string.isRequired,
//       }).isRequired,
//       Director: PropTypes.shape({
//         Name: PropTypes.string.isRequired,
//         Bio: PropTypes.string.isRequired,
//         Birth: PropTypes.string.isRequired,
//         Death: PropTypes.string.isRequired,
//       }).isRequired,
//     })
//   ).isRequired,
// };
