// src/components/main-view/main-view.jsx

import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";

import "./main-view.scss";

import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavbarView } from "../navbar-view/navbar-view";

import { setMovies, setUser, setFav, setDirect, setGenre } from "../../actions/actions";

import MoviesList from "../movies-list/movies-list";

class MainView extends React.Component {
  constructor() {
    super();
  }

  getMovies(token) {
    axios
      .get("https://myflixapp1987.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getFav(token) {
    const user = localStorage.getItem("user");

    axios
      .get(`https://myflixapp1987.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.props.setFav(response.data.FavoriteMovies);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem("user"));
      this.getMovies(accessToken);
      this.getFav(accessToken);
    }
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser(authData.user.Username);

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);

    this.getMovies(authData.token);
    this.getFav(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.props.setUser(null);
  }

  render() {
    const { movies, user, favorites } = this.props;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    return (
      <Router>
        <NavbarView user={user} />

        <Container>
          <Row className="main-view justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Col md={6}>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return <MoviesList movies={movies} />;
              }}
            />

            <Route
              exact
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col md={8}>
                    <RegistrationView />
                  </Col>
                );
              }}
            />

            <Route
              exact
              path="/movies/:movieId"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col md={6}>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col>
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.movieId)}
                      onBackClick={() => history.goBack()}
                      user={user}
                      history={history}
                      movies={movies}
                      getFav={this.getFav}
                    />
                  </Col>
                );
              }}
            />

            <Route
              exact
              path="/directors/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col md={6}>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col>
                    <DirectorView
                      director={movies.find((m) => m.Director.Name === match.params.name).Director}
                      movies={movies.filter((m) => m.Director.Name === match.params.name)}
                      history={history}
                      getFav={this.getFav}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              exact
              path="/genres/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col md={6}>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col>
                    <GenreView
                      genre={movies.find((m) => m.Genre.Name === match.params.name).Genre}
                      movies={movies.filter((m) => m.Genre.Name === match.params.name)}
                      history={history}
                      getFav={this.getFav}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              exact
              path="/users/:username"
              render={({ history }) => {
                if (!user)
                  return (
                    <Col md={6}>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col>
                    <ProfileView
                      user={user}
                      history={history}
                      movies={movies}
                      getFav={this.getFav}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              exact
              path="/profile"
              render={({ history }) => {
                if (!user)
                  return (
                    <Col md={6}>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col>
                    <ProfileView
                      user={user}
                      history={history}
                      movies={movies}
                      getFav={this.getFav}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              exact
              path="/login"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col md={6}>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
    favorites: state.favorites,
    directors: state.directors,
    genres: state.genres,
  };
};

export default connect(mapStateToProps, { setMovies, setUser, setFav, setDirect, setGenre })(
  MainView
);
