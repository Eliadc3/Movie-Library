import React, { useEffect } from "react";
import styles from "./Contents_Page.module.css";
import { useState } from "react";
import MovieList from "../../components/search/MovieList";
import devJS from "../../config/dev";

const tmdb_url = `${devJS.TMDB_URL}/movie/popular?api_key=${devJS.TMDB_API_KEY}&language=en-US`;

const Movies_Page = () => {
  const [data, setData] = useState([]);
  const [movieInput, setMovieInput] = useState("");

  const [searchMovie, setSearchMovie] = useState("");
  const [popular, setPopular] = useState(true);
  const [resultsIsOpen, setResultsIsOpen] = useState(false);

  useEffect(() => {
    if (searchMovie === "") {
      fetch(tmdb_url)
        .then((res) => res.json())
        .then((data) => {
          setData(data.results);
          setPopular(true);
          setResultsIsOpen(true);
        });
    } else {
      const search_url = `${devJS.TMDB_URL}/search/movie?api_key=${devJS.TMDB_API_KEY}&query=${movieInput}`;
      fetch(search_url)
        .then((res) => res.json())
        .then((data) => {
          setData(data.results);
          setPopular(false);
          setResultsIsOpen(true);
        });
    }
  }, [searchMovie]);

  function clickSearchMovieHandler() {
    setSearchMovie(movieInput);
  }

  return (
    <div className={styles.body}>
      <h1>Movies</h1>
      <div className={styles.search}>
        <input
          className={styles.searchBox}
          type="text"
          name="query"
          value={movieInput}
          onChange={(event) => setMovieInput(event.target.value)}
          placeholder="type a Movie name"
        />
        <button
          className={styles.searchButton}
          onClick={clickSearchMovieHandler}
        >
          Search
        </button>
        <div>
          {popular && <h2>Most Popular Movies:</h2>}
          {data.length > 0 ? (
            <div className="container">
              <div className="grid">
                {resultsIsOpen && (
                  <MovieList
                    setData={setData}
                    Movies={data}
                    // onClickSelect={clickSelectMovieHandler}
                  />
                )}
              </div>
            </div>
          ) : (
            <h2>Not Found</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movies_Page;
