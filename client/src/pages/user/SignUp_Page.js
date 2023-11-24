import React, { useState } from "react";
import styles from "./SignUp_Page.module.css";
import axios from "axios";

const SignUp_Page = () => {
  const [username, setUsername] = useState("");

  const handleInputChange = (event) => {
    const { id, value } = event.target;

    if (id === "username") {
      setUsername(value);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:9000/users/signup",
        JSON.stringify({
          username: username,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      alert("User created successfully.");
      console.log("username", username);
    } catch (err) {
      alert("That user is already exists!");
      console.error(err);
    }
  };

  return (
    <div className={styles.loginForm}>
      <h2>Create User</h2>
      <div className="form-body">
        <div className="username">
          <input
            type="text"
            title="username"
            id="username"
            placeholder="username"
            value={username}
            onChange={(event) => handleInputChange(event)}
          />
        </div>
      </div>
      <button type="submit" className={styles.btn} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default SignUp_Page;
