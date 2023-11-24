import React, { useEffect } from "react";
import styles from "./Contents_Page.module.css";
import { useState } from "react";
import TVList from "../../components/search/TVList";
import devJS from "../../config/dev";

const tmdb_url = `${devJS.TMDB_URL}/tv/popular?api_key=${devJS.TMDB_API_KEY}&language=en-US`;

const TV_Page = () => {
  const [data, setData] = useState([]);
  const [TVInput, setTVInput] = useState("");

  const [searchTV, setSearchTV] = useState("");
  const [popular, setPopular] = useState(true);

  const [resultsIsOpen, setResultsIsOpen] = useState(false);

  useEffect(() => {
    if (searchTV === "") {
      fetch(tmdb_url)
        .then((res) => res.json())
        .then((data) => {
          setData(data.results);
          setPopular(true);
          setResultsIsOpen(true);
        });
    } else {
      const search_url = `${devJS.TMDB_URL}/search/tv?api_key=${devJS.TMDB_API_KEY}&query=${TVInput}`;
      fetch(search_url)
        .then((res) => res.json())
        .then((data) => {
          setData(data.results);
          setPopular(false);
          setResultsIsOpen(true);
        });
    }
  }, [searchTV]);

  function clickSearchTVHandler() {
    setSearchTV(TVInput);
  }

  return (
    <div className={styles.body}>
      <h1>TV Series</h1>
      <div className={styles.search}>
        <input
          className={styles.searchBox}
          type="text"
          name="query"
          value={TVInput}
          onChange={(event) => setTVInput(event.target.value)}
          placeholder="type a TV series name"
        />
        <button className={styles.searchButton} onClick={clickSearchTVHandler}>
          Search
        </button>
        <div>
          {popular && <h2>Most Popular TV Series:</h2>}
          {data.length > 0 ? (
            <div className="container">
              <div className="grid">
                {resultsIsOpen && <TVList setData={setData} TV_series={data} />}
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

export default TV_Page;
