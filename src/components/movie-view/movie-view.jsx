// src/components/movie-view/movie-view.jsx

import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Button, Container, Col, Row, Card, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import FavoriteToggle from "./favorite-toggle";
import StarFill from "../../../img/star-filled.png";
import StarEmpty from "../../../img/star-empty.png";

import "./movie-view.scss";

export class MovieView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      FavoriteMovies: [],
      isFavorite: false,
    };
  }

  onAddFavorite = (e, movie) => {
    //e.preventDefault();
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const id = this.props.movie._id;
    ///users/:Username/movies/:MovieID
    axios
      .post(
        `https://myflixapp1987.herokuapp.com/users/${user}/movies/${id}`,
        {
          FavoriteMovies: this.state.FavoriteMovies,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        this.setState({ FavoriteMovies: response.data.FavoriteMovies });
        alert("Movie has been added to Favorites");
        this.componentDidMount;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // onRemoveFavorite = (e, movie) => {
  //   //e.preventDefault();
  //   const user = localStorage.getItem("user");
  //   const token = localStorage.getItem("token");
  //   const id = this.props.movie._id;
  //   ///users/:Username/movies/:MovieID
  //   axios
  //     .delete(`https://myflixapp1987.herokuapp.com/users/${user}/movies/${id}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       alert("Movie has been removed form Favorites");
  //       this.componentDidMount;
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  // checkFavorite = () => {
  //   const id = this.props.movie._id;
  //   if (favorites.includes(id) !== 0) {
  //     this.setState({ isFavorite: true });
  //     <img
  //       onClick={() => {
  //         this.onRemoveFavorite();
  //       }}
  //       src={StarFill}></img>;
  //   } else {
  //     this.setState({ isFavorite: false });
  //     <img
  //       onClick={() => {
  //         this.onAddFavorite();
  //       }}
  //       src={StarEmpty}></img>;
  //   }
  // };

  render() {
    const { movie, user, getFav, onBackClick } = this.props;
    const { isFavorite } = this.state;

    return (
      <Row>
        <Col className="col-8">
          <Card className="movie-view-card">
            <Card.Body>
              <Card.Title className="title-row">
                <h1>{movie.Title} </h1>
                {/* <FavoriteToggle isFavorite={isFavorite} movie={movie} user={user} /> */}
              </Card.Title>

              <Card.Text>{movie.Description}</Card.Text>
              <div className="director-row">
                <p>
                  <h5>
                    <br></br>
                    <b>Director: </b>
                    <Link to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}</Link>
                  </h5>
                </p>
              </div>
              <div className="genre-row">
                <p>
                  <h5>
                    <b>Genre: </b>
                    <Link to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}</Link>
                  </h5>
                </p>
              </div>
              <div>
                <Button
                  className="movie-button"
                  variant="warning"
                  onClick={() => {
                    this.onAddFavorite();
                  }}>
                  Add to favorites
                </Button>
                <Button
                  className="movie-button"
                  variant="primary"
                  onClick={() => {
                    onBackClick();
                  }}>
                  Back
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="movie-view-card">
            <Card.Img variant="top" src={movie.ImagePath} crossOrigin="anonymous" />
          </Card>
        </Col>
      </Row>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
      }).isRequired,
      Director: PropTypes.shape({
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
        Death: PropTypes.string,
        Name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

let mapStateToProps = (state) => {
  const { favorites } = state;
  return { favorites };
};

export default connect(mapStateToProps)(MovieView);
