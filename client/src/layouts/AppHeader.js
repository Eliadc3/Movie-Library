import React from "react";
import { Link } from "react-router-dom";
import styles from "./AppHeader.module.css";
import img from "../img/movie_library.png";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <img className={styles.img} src={img} alt="" />
      Movie Library
      <nav>
        <ul>
          <li>
            <Link to="/movies_page">Search Movies</Link>
          </li>
          <li>
            <Link to="/tv_page">Search TV Series</Link>
          </li>
          <li>
            <Link to="Favorites_Page">Favorites</Link>
          </li>
          <li>
            <Link to="/signup">Create User</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
