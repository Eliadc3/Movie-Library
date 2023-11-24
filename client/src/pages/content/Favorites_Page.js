import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./Favorites_Page.module.css";
import devJS from "../../config/dev.js";
import Card from "../../components/ui/Card";
import ShowMoreText from "react-show-more-text";

const Favorites_Page = () => {
  const [data, setData] = useState();
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    const favorites = async () => {
      const favorites_url = `http://localhost:9000/users/${devJS.USER_ID}/favorites`;

      await axios.get(favorites_url).then((response) => {
        setData(response.data);
      });
    };
    favorites();
  }, [data]);

  const onClickRemoveTVFromFavorites = async (tv) => {
    console.log("tv", tv);
    await axios.delete(
      `http://localhost:9000/users/${devJS.USER_ID}/favorites/${tv}`
    );
  };
  const onClickRemoveMovieFromFavorites = async (movie) => {
    console.log("movie", movie);
    await axios.delete(
      `http://localhost:9000/users/${devJS.USER_ID}/favorites/${movie}`
    );
  };
  return (
    <div className={styles.container}>
      <h1>Favorites</h1>

      <div className={styles.search}>
        <input
          className={styles.searchBox}
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          placeholder="Sreach by name"
        />
        <div className="FavoritesTv">
          <Card>
            <h2>TV Series</h2>
            <ul>
              <div className="grid">
                {data &&
                  data.allTvFavorites
                    .filter((e) =>
                      e.name
                        .toLowerCase()
                        .includes(inputSearch.toLocaleLowerCase())
                    )
                    .map((tv_serie) => (
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
                            onClick={() =>
                              onClickRemoveTVFromFavorites(tv_serie._id)
                            }
                          >
                            Remove from favorites
                          </button>
                        </Card>
                      </li>
                    ))}
              </div>
            </ul>
          </Card>
        </div>
        <div className="FavoritesMovies">
          <Card>
            <h2>Movies</h2>
            <ul>
              <div className="grid">
                {data &&
                  data.allMovieFavorites
                    .filter((e) =>
                      e.name
                        .toLowerCase()
                        .includes(inputSearch.toLocaleLowerCase())
                    )
                    .map((movie) => (
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
                            onClick={() =>
                              onClickRemoveMovieFromFavorites(movie._id)
                            }
                          >
                            Remove from favorites
                          </button>
                        </Card>
                      </li>
                    ))}
              </div>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Favorites_Page;
