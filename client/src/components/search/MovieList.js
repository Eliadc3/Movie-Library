import React, { useState } from "react";
import styles from "./TVList.module.css";
import Card from "../ui/Card";
import devJS from "../../config/dev";
import axios from "axios";
import ShowMoreText from "react-show-more-text";
const MovieList = (props) => {
  const onClickAddToFavorites = async (movie) => {
    console.log("movie id", movie.id);

    var data = JSON.stringify({
      id: movie.id,
      name: movie.title,
      overview: movie.overview,
      type: "movie",
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
    });

    var config = {
      method: "patch",
      url: `http://localhost:9000/users/${devJS.USER_ID}/favorites/movie`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        alert("Added to favorites successfully");
      })
      .catch(function (error) {
        alert(error.response.data);
      });
  };

  return (
    <div className={styles.container}>
      <ul>
        <div className="grid">
          {props.Movies.map((movie) => (
            <li key={movie.id}>
              <Card>
                <img src={devJS.TMDB_IMG + movie.poster_path} />
                <h2>{movie.title}</h2>
                <h4>Rating: {movie.vote_average}</h4>
                <h5>Release Date: {movie.release_date}</h5>
                <h3>Overview</h3>
                <ShowMoreText
                  lines={3}
                  more="Show more"
                  less="Show less"
                  expanded={false}
                  width={300}
                >
                  <p> {movie.overview}</p>
                </ShowMoreText>
                <button
                  className={styles.fav_btn}
                  onClick={() => onClickAddToFavorites(movie)}
                >
                  Add to Favorites
                </button>
              </Card>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default MovieList;
