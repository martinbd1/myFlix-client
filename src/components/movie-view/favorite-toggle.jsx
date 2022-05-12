// src/components/movie-view/favorite-toggle.jsx

import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { addFav, remFav } from "../../actions/actions";
import StarFill from "../../../img/star-filled.png";
import StarEmpty from "../../../img/star-empty.png";
import { Button } from "react-bootstrap";

class FavoriteToggle extends React.Component {
  constructor() {
    super();
    this.state = {
      FavoriteMovies: [],
      isFavorite: false,
    };

    this.toggleFav = this.toggleFav.bind(this);
  }

  toggleFav() {
    this.setState({
      isFavorite: !this.state.isFavorite,
    });
  }

  addFavorite = () => {
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

  removeFavorite = () => {
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

  render() {
    const id = this.props.movie._id;

    if (isFavorite) {
      return;

      this.setState({ isFavorite: true });

      <img
        onClick={() => {
          this.onRemoveFavorite(), this.toggleState;
        }}
        src={StarFill}></img>;
    } else {
      return;

      this.setState({ isFavorite: flase });

      <img
        onClick={() => {
          this.onAddFavorite(), this.toggleState;
        }}
        src={StarEmpty}></img>;
    }
  }
}

FavoriteToggle.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  //   movieId: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  //   getFav: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { favorites, user } = state;
  return { favorites, user };
};

export default connect(mapStateToProps, { addFav, remFav })(FavoriteToggle);
