import React, { useState } from "react";
import styles from "./TVList.module.css";
import Card from "../ui/Card";
import devJS from "../../config/dev";
import axios from "axios";
import ShowMoreText from "react-show-more-text";
const TVList = (props) => {
  const onClickAddToFavorites = async (tv) => {
    console.log("tv id", tv.id);

    var data = JSON.stringify({
      id: tv.id,
      name: tv.name,
      overview: tv.overview,
      type: "tv",
      poster_path: tv.poster_path,
      vote_average: tv.vote_average,
      first_air_date: tv.first_air_date,
    });

    var config = {
      method: "patch",
      url: `http://localhost:9000/users/${devJS.USER_ID}/favorites/tv`,
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
          {props.TV_series.map((tv_serie) => (
            <li key={tv_serie.id}>
              <Card>
                <img src={devJS.TMDB_IMG + tv_serie.poster_path} />
                <h2>{tv_serie.name}</h2>
                <h4>Rating: {tv_serie.vote_average}</h4>
                <h5>Release Date: {tv_serie.first_air_date}</h5>
                <h3>Overview</h3>
                <ShowMoreText
                  lines={3}
                  more="Show more"
                  less="Show less"
                  expanded={false}
                  width={300}
                >
                  <p> {tv_serie.overview}</p>
                </ShowMoreText>
                <button
                  className={styles.fav_btn}
                  onClick={() => onClickAddToFavorites(tv_serie)}
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

export default TVList;
