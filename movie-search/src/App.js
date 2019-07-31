import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import axios from "axios";
import "./App.css";

class Movies extends Component {
  constructor() {
    super();
    this.state = { movies: [], query: "" };
  }
  async getMovieList() {
    const api = "api_key=feb6f0eeaa0a72662967d77079850353";
    const { data: movies } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?${api}&language=en-US&query=${
        this.state.query
      }&page=1&include_adult=false`
    );
    this.setState({ movies: movies.results });
  }

  onChange = e => {
    this.setState({ query: e.target.value });
    this.getMovieList();
    if (Object.keys(this.state.query).length === 0) {
      this.setState({ movies: [] });
}
  };

  render() {
    const poster = `https://image.tmdb.org/t/p/w500/`;
    console.log(this.state);
    return (
      <div className="container">
        <div className="input-container">
          <input
            className="search-field"
            type="search"
            onKeyUp={this.onChange}
            placeholder="Search for a movie..."
          />
          <h3 className="nav-title">Movie Search DB</h3>
        </div>{" "}
        <Container>
          <Row>
            {this.state.movies.map(movie => (
              <div className="banner">
                <img
                  alt="poster thumbnail"
                  className="poster"
                  src={`${poster}${movie.poster_path}`}
                />
                <h1 key={movie.id}>
                  <span>{movie.title}</span>
                </h1>
                <h4>
                  <span>
                    <img
                      alt="rating"
                      className="rating"
                      src="https://cdn2.iconfinder.com/data/icons/universal-signs-symbols/128/star-yellow-512.png"
                    />
                  </span>
                  <span className="banner-vote">{movie.vote_average}/10</span>
                </h4>
                <p>
                  <span className="banner-info">{movie.overview}</span>
                </p>
              </div>
            ))}{" "}
          </Row>
        </Container>
      </div>
    );
  }
}

export { Movies };
